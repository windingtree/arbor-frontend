// Export main variables
export const appName = `Winding Tree Marketplace`;
export const LIF_DEPOSIT_AMOUNT = Number(process.env.REACT_APP_LIF_DEPOSIT_AMOUNT);
export const API_URI = process.env.REACT_APP_API_URI;
export const ORGID_PROXY_ADDRESS = process.env.REACT_APP_ORGID_PROXY_ADDRESS;
export const DIRECTORY_PROXY_ADDRESS = process.env.REACT_APP_DIRECTORY_PROXY_ADDRESS;
export const LIF_TOKEN_PROXY_ADDRESS = process.env.REACT_APP_LIF_TOKEN_PROXY_ADDRESS;
export const CHAIN_ID = process.env.REACT_APP_ETHEREUM_CHAIN_ID;
export const MAINTENANCE = process.env.REACT_APP_MAINTENANCE ? JSON.parse(process.env.REACT_APP_MAINTENANCE): undefined;
export const SIMARD_URL = process.env.REACT_APP_SIMARD_URL;
export const SIMARD_DID = process.env.REACT_APP_SIMARD_DID;
export const SIMARD_EXPIRATION = Number(process.env.REACT_APP_SIMARD_EXPIRATION);

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

// For in-browser debug purposes.
window.SIMARD_URL = SIMARD_URL;
window.ORGID_PROXY_ADDRESS = ORGID_PROXY_ADDRESS;
window.ORGID_ABI = ORGID_ABI;
window.LIF_TOKEN_PROXY_ADDRESS = LIF_TOKEN_PROXY_ADDRESS;
window.LIF_TOKEN_ABI = LIF_TOKEN_ABI;
