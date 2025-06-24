// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title IdentityRegistry
 * @dev Manages decentralized identifiers (DIDs) for users and enterprises
 */
contract IdentityRegistry is Ownable, ReentrancyGuard {
    using Strings for uint256;

    // Events
    event DIDCreated(address indexed did, address indexed owner, string didDocument, DIDType didType);
    event DIDUpdated(address indexed did, string newDocument);
    event DIDDeactivated(address indexed did);
    event AttestationCreated(address indexed did, address indexed attester, string schema, bytes data);

    // Structs
    struct DID {
        address owner;
        string didDocument;
        uint256 createdAt;
        bool isActive;
        DIDType didType;
    }

    enum DIDType { USER, ENTERPRISE }

    // State variables
    mapping(address => DID) public userDIDs;
    mapping(address => DID) public enterpriseDIDs;
    mapping(address => bool) public isUserDID;
    mapping(address => bool) public isEnterpriseDID;
    
    // Attestation mappings
    mapping(address => mapping(address => mapping(string => bytes))) public attestations;
    mapping(address => address[]) public didAttesters;
    mapping(address => string[]) public didSchemas;

    // Modifiers
    modifier onlyDIDOwner(address did) {
        require(
            (isUserDID[did] && userDIDs[did].owner == msg.sender) ||
            (isEnterpriseDID[did] && enterpriseDIDs[did].owner == msg.sender),
            "IdentityRegistry: caller is not the DID owner"
        );
        _;
    }

    modifier onlyActiveDID(address did) {
        require(
            (isUserDID[did] && userDIDs[did].isActive) ||
            (isEnterpriseDID[did] && enterpriseDIDs[did].isActive),
            "IdentityRegistry: DID is not active"
        );
        _;
    }

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Creates a new user DID
     * @param didDocument The DID document in JSON format
     */
    function createUserDID(string memory didDocument) external nonReentrant {
        require(bytes(didDocument).length > 0, "IdentityRegistry: DID document cannot be empty");
        require(!isUserDID[msg.sender], "IdentityRegistry: User DID already exists");
        require(!isEnterpriseDID[msg.sender], "IdentityRegistry: Address already has enterprise DID");

        userDIDs[msg.sender] = DID({
            owner: msg.sender,
            didDocument: didDocument,
            createdAt: block.timestamp,
            isActive: true,
            didType: DIDType.USER
        });

        isUserDID[msg.sender] = true;

        emit DIDCreated(msg.sender, msg.sender, didDocument, DIDType.USER);
    }

    /**
     * @dev Creates a new enterprise DID
     * @param didDocument The DID document in JSON format
     */
    function createEnterpriseDID(string memory didDocument) external nonReentrant {
        require(bytes(didDocument).length > 0, "IdentityRegistry: DID document cannot be empty");
        require(!isEnterpriseDID[msg.sender], "IdentityRegistry: Enterprise DID already exists");
        require(!isUserDID[msg.sender], "IdentityRegistry: Address already has user DID");

        enterpriseDIDs[msg.sender] = DID({
            owner: msg.sender,
            didDocument: didDocument,
            createdAt: block.timestamp,
            isActive: true,
            didType: DIDType.ENTERPRISE
        });

        isEnterpriseDID[msg.sender] = true;

        emit DIDCreated(msg.sender, msg.sender, didDocument, DIDType.ENTERPRISE);
    }

    /**
     * @dev Updates the DID document for an existing DID
     * @param did The DID address
     * @param newDocument The new DID document
     */
    function updateDIDDocument(address did, string memory newDocument) 
        external 
        onlyDIDOwner(did) 
        onlyActiveDID(did) 
        nonReentrant 
    {
        require(bytes(newDocument).length > 0, "IdentityRegistry: DID document cannot be empty");

        if (isUserDID[did]) {
            userDIDs[did].didDocument = newDocument;
        } else {
            enterpriseDIDs[did].didDocument = newDocument;
        }

        emit DIDUpdated(did, newDocument);
    }

    /**
     * @dev Deactivates a DID
     * @param did The DID address to deactivate
     */
    function deactivateDID(address did) external onlyDIDOwner(did) onlyActiveDID(did) nonReentrant {
        if (isUserDID[did]) {
            userDIDs[did].isActive = false;
        } else {
            enterpriseDIDs[did].isActive = false;
        }

        emit DIDDeactivated(did);
    }

    /**
     * @dev Creates an attestation for a DID
     * @param did The DID to attest to
     * @param schema The attestation schema identifier
     * @param data The attestation data
     */
    function createAttestation(address did, string memory schema, bytes memory data) 
        external 
        onlyActiveDID(did) 
        nonReentrant 
    {
        require(bytes(schema).length > 0, "IdentityRegistry: Schema cannot be empty");
        require(data.length > 0, "IdentityRegistry: Attestation data cannot be empty");

        attestations[did][msg.sender][schema] = data;
        
        // Add to attester list if not already present
        bool attesterExists = false;
        for (uint i = 0; i < didAttesters[did].length; i++) {
            if (didAttesters[did][i] == msg.sender) {
                attesterExists = true;
                break;
            }
        }
        if (!attesterExists) {
            didAttesters[did].push(msg.sender);
        }

        // Add to schema list if not already present
        bool schemaExists = false;
        for (uint i = 0; i < didSchemas[did].length; i++) {
            if (keccak256(bytes(didSchemas[did][i])) == keccak256(bytes(schema))) {
                schemaExists = true;
                break;
            }
        }
        if (!schemaExists) {
            didSchemas[did].push(schema);
        }

        emit AttestationCreated(did, msg.sender, schema, data);
    }

    /**
     * @dev Gets a DID by address
     * @param did The DID address
     * @return The DID struct
     */
    function getDID(address did) external view returns (DID memory) {
        if (isUserDID[did]) {
            return userDIDs[did];
        } else if (isEnterpriseDID[did]) {
            return enterpriseDIDs[did];
        } else {
            revert("IdentityRegistry: DID not found");
        }
    }

    /**
     * @dev Gets an attestation for a DID
     * @param did The DID address
     * @param attester The attester address
     * @param schema The attestation schema
     * @return The attestation data
     */
    function getAttestation(address did, address attester, string memory schema) 
        external 
        view 
        returns (bytes memory) 
    {
        return attestations[did][attester][schema];
    }

    /**
     * @dev Gets all attesters for a DID
     * @param did The DID address
     * @return Array of attester addresses
     */
    function getAttesters(address did) external view returns (address[] memory) {
        return didAttesters[did];
    }

    /**
     * @dev Gets all schemas for a DID
     * @param did The DID address
     * @return Array of schema strings
     */
    function getSchemas(address did) external view returns (string[] memory) {
        return didSchemas[did];
    }

    /**
     * @dev Checks if an address has a user DID
     * @param did The address to check
     * @return True if the address has a user DID
     */
    function hasUserDID(address did) external view returns (bool) {
        return isUserDID[did] && userDIDs[did].isActive;
    }

    /**
     * @dev Checks if an address has an enterprise DID
     * @param did The address to check
     * @return True if the address has an enterprise DID
     */
    function hasEnterpriseDID(address did) external view returns (bool) {
        return isEnterpriseDID[did] && enterpriseDIDs[did].isActive;
    }
} 