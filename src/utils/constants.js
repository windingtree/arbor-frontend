// Export main variables
export const appName = `Winding Tree Marketplace`;
export const LIF_DEPOSIT_AMOUNT = Number(process.env.REACT_APP_LIF_DEPOSIT_AMOUNT);
export const API_URI = process.env.REACT_APP_API_URI;
export const ORGID_PROXY_ADDRESS = process.env.REACT_APP_ORGID_PROXY_ADDRESS;
export const LIF_TOKEN_PROXY_ADDRESS = process.env.REACT_APP_LIF_TOKEN_PROXY_ADDRESS;
export const CHAIN_ID = process.env.REACT_APP_ETHEREUM_CHAIN_ID;
export const MAINTENANCE = process.env.REACT_APP_MAINTENANCE ? JSON.parse(process.env.REACT_APP_MAINTENANCE): undefined;
export const SIMARD_URL = process.env.REACT_APP_SIMARD_URL;
export const SIMARD_DID = process.env.REACT_APP_SIMARD_DID;
export const SIMARD_EXPIRATION = Number(process.env.REACT_APP_SIMARD_EXPIRATION);
export const COINSWITCH_LABEL = process.env.REACT_APP_COINSWITCH_LABEL;
export const COINSWITCH_URL = process.env.REACT_APP_COINSWITCH_URL;
export const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;
export const PORTIS_DEFAULT_NETWORK = process.env.REACT_APP_PORTIS_DEFAULT_NETWORK;
export const STRIPE_PUB_KEY = process.env.REACT_APP_STRIPE_PUB_KEY;
export const DIRECTORIES_INDEX_ADDRESS = process.env.REACT_APP_DIRECTORIES_INDEX_ADDRESS;
export const INFURA_PROVIDER = process.env.REACT_APP_INFURA_PROVIDER;

export const entityTypes = [
  'private entrepreneur',
  'private company limited by shares or Ltd. (UK, Ireland and the Commonwealth)',
  'public limited company (UK, Ireland and the Commonwealth)',
  'OÜ',
  'limited partnership',
  'unlimited partnership',
  'chartered company',
  'statutory company',
  'holding company',
  'subsidiary company',
  'one man company (sole proprietorship)',
  'charitable incorporated organisation (UK)',
  'non-governmental organization',
]

export const ORGID_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "director",
        "type": "address"
      }
    ],
    "name": "DirectorshipAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousDirector",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newDirector",
        "type": "address"
      }
    ],
    "name": "DirectorshipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousOrgJsonHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "previousOrgJsonUri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "previousOrgJsonUriBackup1",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "previousOrgJsonUriBackup2",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newOrgJsonHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newOrgJsonUri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newOrgJsonUriBackup1",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newOrgJsonUriBackup2",
        "type": "string"
      }
    ],
    "name": "OrgJsonChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "previousState",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "newState",
        "type": "bool"
      }
    ],
    "name": "OrganizationActiveStateChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OrganizationCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OrganizationOwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "parentOrgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "unitOrgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "director",
        "type": "address"
      }
    ],
    "name": "UnitCreated",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      }
    ],
    "name": "acceptDirectorship",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "solt",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup2",
        "type": "string"
      }
    ],
    "name": "createOrganization",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "solt",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "parentOrgId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "director",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup2",
        "type": "string"
      }
    ],
    "name": "createUnit",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "newUnitOrgId",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_orgId",
        "type": "bytes32"
      }
    ],
    "name": "getOrganization",
    "outputs": [
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      },
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup2",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "parentOrgId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "director",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isDirectorshipAccepted",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bool",
        "name": "includeInactive",
        "type": "bool"
      }
    ],
    "name": "getOrganizations",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "parentOrgId",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "includeInactive",
        "type": "bool"
      }
    ],
    "name": "getUnits",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "__owner",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      }
    ],
    "name": "renounceDirectorship",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "setInterfaces",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "orgJsonUriBackup2",
        "type": "string"
      }
    ],
    "name": "setOrgJson",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      }
    ],
    "name": "toggleActiveState",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "newDirector",
        "type": "address"
      }
    ],
    "name": "transferDirectorship",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOrganizationOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export const LIF_TOKEN_ABI = [{
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "DECIMALS",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "unpause",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_value",
    "type": "uint256"
  }],
  "name": "burn",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "paused",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_subtractedValue",
    "type": "uint256"
  }],
  "name": "decreaseApproval",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }, {
    "name": "data",
    "type": "bytes"
  }],
  "name": "approveData",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "balance",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "pause",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "NAME",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "MAX_LIF_FAUCET",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "to",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }, {
    "name": "data",
    "type": "bytes"
  }],
  "name": "transferData",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_addedValue",
    "type": "uint256"
  }],
  "name": "increaseApproval",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }, {
    "name": "_spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "name": "remaining",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "faucetLif",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "from",
    "type": "address"
  }, {
    "name": "to",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }, {
    "name": "data",
    "type": "bytes"
  }],
  "name": "transferDataFrom",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "SYMBOL",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "Pause",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "Unpause",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "burner",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Burn",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}];
export const DIR_INDEX_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "segment",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "SegmentAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "segment",
        "type": "address"
      }
    ],
    "name": "SegmentRemoved",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "segment",
        "type": "address"
      }
    ],
    "name": "addSegment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getSegments",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "segmentsList",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "__owner",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "segment",
        "type": "address"
      }
    ],
    "name": "removeSegment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "segments",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "segmentsIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export const ARB_DIR_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IArbitrator",
        "name": "_arbitrator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_disputeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_metaEvidenceID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_evidenceGroupID",
        "type": "uint256"
      }
    ],
    "name": "Dispute",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IArbitrator",
        "name": "_arbitrator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_evidenceGroupID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_party",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "Evidence",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_metaEvidenceID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "MetaEvidence",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "OrganizationAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "OrganizationRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "OrganizationSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IArbitrator",
        "name": "_arbitrator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_disputeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_ruling",
        "type": "uint256"
      }
    ],
    "name": "Ruling",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_previousSegment",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_newSegment",
        "type": "string"
      }
    ],
    "name": "SegmentChanged",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "MULTIPLIER_DIVISOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "RULING_OPTIONS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "acceptChallenge",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "arbitrator",
    "outputs": [
      {
        "internalType": "contract IArbitrator",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "arbitratorDisputeIDToOrg",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "arbitratorExtraData",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "challengeBaseDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "challengeOrganization",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract IArbitrator",
        "name": "_arbitrator",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_arbitratorExtraData",
        "type": "bytes"
      }
    ],
    "name": "changeArbitrator",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_challengeBaseDeposit",
        "type": "uint256"
      }
    ],
    "name": "changeChallengeBaseDeposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_executionTimeout",
        "type": "uint256"
      }
    ],
    "name": "changeExecutionTimeout",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_loserStakeMultiplier",
        "type": "uint256"
      }
    ],
    "name": "changeLoserStakeMultiplier",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_metaEvidence",
        "type": "string"
      }
    ],
    "name": "changeMetaEvidence",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requesterDeposit",
        "type": "uint256"
      }
    ],
    "name": "changeRequesterDeposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_responseTimeout",
        "type": "uint256"
      }
    ],
    "name": "changeResponseTimeout",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_sharedStakeMultiplier",
        "type": "uint256"
      }
    ],
    "name": "changeSharedStakeMultiplier",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_winnerStakeMultiplier",
        "type": "uint256"
      }
    ],
    "name": "changeWinnerStakeMultiplier",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_withdrawTimeout",
        "type": "uint256"
      }
    ],
    "name": "changeWithdrawTimeout",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "executeTimeout",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "executionTimeout",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "enum ArbitrableDirectory.Party",
        "name": "_side",
        "type": "uint8"
      }
    ],
    "name": "fundAppeal",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_challenge",
        "type": "uint256"
      }
    ],
    "name": "getChallengeInfo",
    "outputs": [
      {
        "internalType": "bool",
        "name": "disputed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "disputeID",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "resolved",
        "type": "bool"
      },
      {
        "internalType": "address payable",
        "name": "challenger",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "numberOfRounds",
        "type": "uint256"
      },
      {
        "internalType": "enum ArbitrableDirectory.Party",
        "name": "ruling",
        "type": "uint8"
      },
      {
        "internalType": "contract IArbitrator",
        "name": "arbitrator",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "arbitratorExtraData",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "metaEvidenceID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_challenge",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_round",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_contributor",
        "type": "address"
      }
    ],
    "name": "getContributions",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "contributions",
        "type": "uint256[3]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "getNumberOfChallenges",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "numberOfChallenges",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getOrganizations",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "organizationsList",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getOrganizationsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getRequestedOrganizations",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "organizationsList",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getRequestedOrganizationsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_challenge",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_round",
        "type": "uint256"
      }
    ],
    "name": "getRoundInfo",
    "outputs": [
      {
        "internalType": "bool",
        "name": "appealed",
        "type": "bool"
      },
      {
        "internalType": "uint256[3]",
        "name": "paidFees",
        "type": "uint256[3]"
      },
      {
        "internalType": "bool[3]",
        "name": "hasPaid",
        "type": "bool[3]"
      },
      {
        "internalType": "uint256",
        "name": "feeRewards",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getSegment",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "governor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_governor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_segment",
        "type": "string"
      },
      {
        "internalType": "contract OrgIdInterface",
        "name": "_orgId",
        "type": "address"
      },
      {
        "internalType": "contract ERC20",
        "name": "_lif",
        "type": "address"
      },
      {
        "internalType": "contract IArbitrator",
        "name": "_arbitrator",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_arbitratorExtraData",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "_metaEvidence",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_requesterDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_challengeBaseDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_executionTimeout",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_responseTimeout",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_withdrawTimeout",
        "type": "uint256"
      },
      {
        "internalType": "uint256[3]",
        "name": "_stakeMultipliers",
        "type": "uint256[3]"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lif",
    "outputs": [
      {
        "internalType": "contract ERC20",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "loserStakeMultiplier",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "makeWithdrawalRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "metaEvidenceUpdates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "orgId",
    "outputs": [
      {
        "internalType": "contract OrgIdInterface",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "organizationData",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "ID",
        "type": "bytes32"
      },
      {
        "internalType": "enum ArbitrableDirectory.Status",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "lastStatusChange",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lifStake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "withdrawalRequestTime",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "organizationsIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "registeredOrganizations",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "requestToAdd",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "requestedIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "requestedOrganizations",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "requesterDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "responseTimeout",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_disputeID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_ruling",
        "type": "uint256"
      }
    ],
    "name": "rule",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_segment",
        "type": "string"
      }
    ],
    "name": "setSegment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "sharedStakeMultiplier",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "submitEvidence",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "winnerStakeMultiplier",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_challenge",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_round",
        "type": "uint256"
      }
    ],
    "name": "withdrawFeesAndRewards",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "withdrawTimeout",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_organization",
        "type": "bytes32"
      }
    ],
    "name": "withdrawTokens",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export const DIR_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "organization",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "OrganizationAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "organization",
        "type": "bytes32"
      }
    ],
    "name": "OrganizationRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "previousSegment",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newSegment",
        "type": "string"
      }
    ],
    "name": "SegmentChanged",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "orgId",
    "outputs": [
      {
        "internalType": "contract OrgIdInterface",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "registeredOrganizations",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "__owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_segment",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_orgId",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_segment",
        "type": "string"
      }
    ],
    "name": "setSegment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "organization",
        "type": "bytes32"
      }
    ],
    "name": "add",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "organization",
        "type": "bytes32"
      }
    ],
    "name": "remove",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getOrganizations",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "organizationsList",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getSegment",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getOrganizationsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// For in-browser debug purposes.
window.SIMARD_URL = SIMARD_URL;
window.ORGID_PROXY_ADDRESS = ORGID_PROXY_ADDRESS;
window.ORGID_ABI = ORGID_ABI;
window.LIF_TOKEN_PROXY_ADDRESS = LIF_TOKEN_PROXY_ADDRESS;
window.LIF_TOKEN_ABI = LIF_TOKEN_ABI;
