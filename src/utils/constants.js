// Export main variables
export const appName = `Arbor`;
export const LIF_DEPOSIT_AMOUNT = Number(process.env.REACT_APP_LIF_DEPOSIT_AMOUNT);
export const API_URI = process.env.REACT_APP_API_URI;
export const ORGID_PROXY_ADDRESS = process.env.REACT_APP_ORGID_PROXY_ADDRESS;
export const DIRECTORY_PROXY_ADDRESS = process.env.REACT_APP_DIRECTORY_PROXY_ADDRESS;
export const LIF_TOKEN_PROXY_ADDRESS = process.env.REACT_APP_LIF_TOKEN_PROXY_ADDRESS;
export const CHAIN_ID = process.env.REACT_APP_ETHEREUM_CHAIN_ID;
export const MAINTENANCE = process.env.REACT_APP_MAINTENANCE ? JSON.parse(process.env.REACT_APP_MAINTENANCE): undefined;

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
    "name": "DirectorOwnershipConfirmed",
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
    "name": "DirectorOwnershipTransferred",
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
        "indexed": true,
        "internalType": "bytes32",
        "name": "newOrgJsonHash",
        "type": "bytes32"
      }
    ],
    "name": "OrgJsonHashChanged",
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
        "internalType": "string",
        "name": "previousOrgJsonUri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newOrgJsonUri",
        "type": "string"
      }
    ],
    "name": "OrgJsonUriChanged",
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
    "name": "OrganizationToggled",
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
        "name": "subOrgId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "director",
        "type": "address"
      }
    ],
    "name": "SubsidiaryCreated",
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
    "inputs": [],
    "name": "renounceOwnership",
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
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
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
    "inputs": [],
    "name": "getLifTokenAddress",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "lifToken",
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
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "subOrgId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "subsidiaryDirector",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      }
    ],
    "name": "createSubsidiary",
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
        "name": "orgId",
        "type": "bytes32"
      }
    ],
    "name": "toggleOrganization",
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
      }
    ],
    "name": "confirmDirectorOwnership",
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
    "name": "transferDirectorOwnership",
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
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      }
    ],
    "name": "changeOrgJsonUriAndHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
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
        "name": "orgId",
        "type": "bytes32"
      }
    ],
    "name": "getSubsidiaries",
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
        "name": "_orgId",
        "type": "bytes32"
      }
    ],
    "name": "getOrganization",
    "outputs": [
      {
        "internalType": "bool",
        "name": "exist",
        "type": "bool"
      },
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "orgJsonHash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "parentEntity",
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
        "name": "state",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "directorConfirmed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "deposit",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x22b3cd4e"
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
        "internalType": "string",
        "name": "orgJsonUri",
        "type": "string"
      }
    ],
    "name": "changeOrgJsonUri",
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
      }
    ],
    "name": "changeOrgJsonHash",
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
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "addDeposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6e700a7f"
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
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "submitWithdrawalRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xfa094c70"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orgId",
        "type": "bytes32"
      }
    ],
    "name": "getWithdrawalRequest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "exist",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "withdrawTime",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3e7d48ab"
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
    "name": "withdrawDeposit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa8e06bc3"
  },
];
export const LIF_TOKEN_ABI = [
  {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x095ea7b3"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "DECIMALS",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x2e0f2625"
  },
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x70a08231"
  },
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdd62ed3e"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
      "indexed": true,
      "name": "spender",
      "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}],
    "name": "Approval",
    "type": "event",
    "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
  },
  {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_addedValue", "type": "uint256"}],
    "name": "increaseApproval",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd73dd623"
  },
  {
    "constant":false,
    "inputs":[],
    "name":"faucetLif",
    "outputs":[],
    "payable":false,
    "type":"function"
  }
];

// For in-browser debug purposes.
window.ORGID_PROXY_ADDRESS = ORGID_PROXY_ADDRESS;
window.ORGID_ABI = ORGID_ABI;
window.LIF_TOKEN_PROXY_ADDRESS = LIF_TOKEN_PROXY_ADDRESS;
window.LIF_TOKEN_ABI = LIF_TOKEN_ABI;
