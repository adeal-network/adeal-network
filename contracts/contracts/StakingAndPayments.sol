// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./IdentityRegistry.sol";

/**
 * @title StakingAndPayments
 * @dev Manages advertiser staking, campaign payments, and user rewards
 */
contract StakingAndPayments is Ownable, ReentrancyGuard, Pausable {
    // Events
    event TokensStaked(address indexed advertiser, uint256 amount, uint256 totalStaked);
    event TokensUnstaked(address indexed advertiser, uint256 amount, uint256 remainingStaked);
    event CampaignCreated(address indexed advertiser, uint256 campaignId, uint256 cost);
    event CampaignPaid(address indexed advertiser, uint256 campaignId, uint256 amount);
    event RewardDistributed(address indexed user, uint256 amount, string reason);
    event RewardsWithdrawn(address indexed user, uint256 amount);
    event Slashing(address indexed advertiser, uint256 amount, string reason);

    // Structs
    struct Stake {
        uint256 amount;
        uint256 stakedAt;
        bool isActive;
        uint256 lastUpdated;
    }

    struct Campaign {
        address advertiser;
        uint256 cost;
        uint256 createdAt;
        bool isActive;
        uint256 impressions;
        uint256 clicks;
        uint256 totalSpent;
    }

    struct UserReward {
        uint256 amount;
        uint256 lastUpdated;
        uint256 totalEarned;
    }

    // State variables
    IERC20 public immutable utilityToken;
    IdentityRegistry public immutable identityRegistry;
    
    mapping(address => Stake) public advertiserStakes;
    mapping(address => UserReward) public userRewards;
    mapping(uint256 => Campaign) public campaigns;
    
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;
    uint256 public campaignCounter;
    
    uint256 public constant MINIMUM_STAKE = 1000 * 10**18; // 1000 tokens
    uint256 public constant MINIMUM_CAMPAIGN_COST = 100 * 10**18; // 100 tokens
    uint256 public constant REWARD_MULTIPLIER = 100; // Base reward multiplier
    
    // Modifiers
    modifier onlyEnterpriseDID() {
        require(
            identityRegistry.hasEnterpriseDID(msg.sender),
            "StakingAndPayments: caller must have enterprise DID"
        );
        _;
    }

    modifier onlyUserDID() {
        require(
            identityRegistry.hasUserDID(msg.sender),
            "StakingAndPayments: caller must have user DID"
        );
        _;
    }

    modifier onlyCampaignOwner(uint256 campaignId) {
        require(
            campaigns[campaignId].advertiser == msg.sender,
            "StakingAndPayments: caller is not campaign owner"
        );
        _;
    }

    modifier onlyActiveCampaign(uint256 campaignId) {
        require(
            campaigns[campaignId].isActive,
            "StakingAndPayments: campaign is not active"
        );
        _;
    }

    constructor(address _utilityToken, address _identityRegistry) Ownable(msg.sender) {
        utilityToken = IERC20(_utilityToken);
        identityRegistry = IdentityRegistry(_identityRegistry);
    }

    /**
     * @dev Stake tokens as an advertiser
     * @param amount Amount of tokens to stake
     */
    function stakeTokens(uint256 amount) external onlyEnterpriseDID nonReentrant whenNotPaused {
        require(amount >= MINIMUM_STAKE, "StakingAndPayments: stake below minimum");
        require(utilityToken.transferFrom(msg.sender, address(this), amount), "StakingAndPayments: transfer failed");

        if (advertiserStakes[msg.sender].isActive) {
            advertiserStakes[msg.sender].amount += amount;
        } else {
            advertiserStakes[msg.sender] = Stake({
                amount: amount,
                stakedAt: block.timestamp,
                isActive: true,
                lastUpdated: block.timestamp
            });
        }

        totalStaked += amount;
        emit TokensStaked(msg.sender, amount, advertiserStakes[msg.sender].amount);
    }

    /**
     * @dev Unstake tokens (with cooldown period)
     * @param amount Amount of tokens to unstake
     */
    function unstakeTokens(uint256 amount) external onlyEnterpriseDID nonReentrant whenNotPaused {
        require(advertiserStakes[msg.sender].isActive, "StakingAndPayments: no active stake");
        require(amount <= advertiserStakes[msg.sender].amount, "StakingAndPayments: insufficient stake");
        
        // Check if advertiser has active campaigns
        require(!hasActiveCampaigns(msg.sender), "StakingAndPayments: active campaigns exist");

        advertiserStakes[msg.sender].amount -= amount;
        totalStaked -= amount;

        if (advertiserStakes[msg.sender].amount == 0) {
            advertiserStakes[msg.sender].isActive = false;
        }

        require(utilityToken.transfer(msg.sender, amount), "StakingAndPayments: transfer failed");
        emit TokensUnstaked(msg.sender, amount, advertiserStakes[msg.sender].amount);
    }

    /**
     * @dev Create a new campaign
     * @param cost Cost of the campaign in tokens
     * @return campaignId The ID of the created campaign
     */
    function createCampaign(uint256 cost) external onlyEnterpriseDID nonReentrant whenNotPaused returns (uint256) {
        require(cost >= MINIMUM_CAMPAIGN_COST, "StakingAndPayments: cost below minimum");
        require(advertiserStakes[msg.sender].isActive, "StakingAndPayments: no active stake");
        require(advertiserStakes[msg.sender].amount >= cost, "StakingAndPayments: insufficient stake");

        campaignCounter++;
        uint256 campaignId = campaignCounter;

        campaigns[campaignId] = Campaign({
            advertiser: msg.sender,
            cost: cost,
            createdAt: block.timestamp,
            isActive: true,
            impressions: 0,
            clicks: 0,
            totalSpent: 0
        });

        emit CampaignCreated(msg.sender, campaignId, cost);
        return campaignId;
    }

    /**
     * @dev Pay for campaign impressions/clicks
     * @param campaignId The campaign ID
     * @param impressions Number of impressions
     * @param clicks Number of clicks
     * @param cost Cost for this interaction
     */
    function payForCampaign(
        uint256 campaignId,
        uint256 impressions,
        uint256 clicks,
        uint256 cost
    ) external onlyOwner onlyActiveCampaign(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.totalSpent + cost <= campaign.cost, "StakingAndPayments: campaign budget exceeded");

        campaign.impressions += impressions;
        campaign.clicks += clicks;
        campaign.totalSpent += cost;

        // Deduct from advertiser's stake
        advertiserStakes[campaign.advertiser].amount -= cost;
        totalStaked -= cost;

        emit CampaignPaid(campaign.advertiser, campaignId, cost);
    }

    /**
     * @dev Distribute rewards to users
     * @param user The user address
     * @param amount Amount of tokens to reward
     * @param reason Reason for the reward
     */
    function distributeReward(address user, uint256 amount, string memory reason) 
        external 
        onlyOwner 
        onlyUserDID 
        nonReentrant 
    {
        require(amount > 0, "StakingAndPayments: reward amount must be positive");

        if (userRewards[user].amount == 0) {
            userRewards[user] = UserReward({
                amount: amount,
                lastUpdated: block.timestamp,
                totalEarned: amount
            });
        } else {
            userRewards[user].amount += amount;
            userRewards[user].totalEarned += amount;
            userRewards[user].lastUpdated = block.timestamp;
        }

        totalRewardsDistributed += amount;
        emit RewardDistributed(user, amount, reason);
    }

    /**
     * @dev Withdraw accumulated rewards
     */
    function withdrawRewards() external onlyUserDID nonReentrant whenNotPaused {
        uint256 amount = userRewards[msg.sender].amount;
        require(amount > 0, "StakingAndPayments: no rewards to withdraw");

        userRewards[msg.sender].amount = 0;
        userRewards[msg.sender].lastUpdated = block.timestamp;

        require(utilityToken.transfer(msg.sender, amount), "StakingAndPayments: transfer failed");
        emit RewardsWithdrawn(msg.sender, amount);
    }

    /**
     * @dev Slash an advertiser's stake for malicious behavior
     * @param advertiser The advertiser address
     * @param amount Amount to slash
     * @param reason Reason for slashing
     */
    function slashStake(address advertiser, uint256 amount, string memory reason) 
        external 
        onlyOwner 
        nonReentrant 
    {
        require(advertiserStakes[advertiser].isActive, "StakingAndPayments: no active stake to slash");
        require(amount <= advertiserStakes[advertiser].amount, "StakingAndPayments: slash amount exceeds stake");

        advertiserStakes[advertiser].amount -= amount;
        totalStaked -= amount;

        if (advertiserStakes[advertiser].amount == 0) {
            advertiserStakes[advertiser].isActive = false;
        }

        emit Slashing(advertiser, amount, reason);
    }

    /**
     * @dev Pause the contract
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Get stake information for an advertiser
     * @param advertiser The advertiser address
     * @return The stake struct
     */
    function getStake(address advertiser) external view returns (Stake memory) {
        return advertiserStakes[advertiser];
    }

    /**
     * @dev Get campaign information
     * @param campaignId The campaign ID
     * @return The campaign struct
     */
    function getCampaign(uint256 campaignId) external view returns (Campaign memory) {
        return campaigns[campaignId];
    }

    /**
     * @dev Get user reward information
     * @param user The user address
     * @return The user reward struct
     */
    function getUserReward(address user) external view returns (UserReward memory) {
        return userRewards[user];
    }

    /**
     * @dev Check if advertiser has active campaigns
     * @param advertiser The advertiser address
     * @return True if advertiser has active campaigns
     */
    function hasActiveCampaigns(address advertiser) public view returns (bool) {
        for (uint256 i = 1; i <= campaignCounter; i++) {
            if (campaigns[i].advertiser == advertiser && campaigns[i].isActive) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Get campaigns for an advertiser
     * @param advertiser The advertiser address
     * @return Array of campaign IDs
     */
    function getAdvertiserCampaigns(address advertiser) external view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= campaignCounter; i++) {
            if (campaigns[i].advertiser == advertiser) {
                count++;
            }
        }

        uint256[] memory campaignIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= campaignCounter; i++) {
            if (campaigns[i].advertiser == advertiser) {
                campaignIds[index] = i;
                index++;
            }
        }

        return campaignIds;
    }
} 