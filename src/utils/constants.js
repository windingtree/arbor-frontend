export const appName = `Arbor`;
export const API_URI = `https://api.arbor.dev.bachoodesign.com/api/v1`;
// export const API_URI = `https://192.168.88.71:3000/api/v1`;
// export const API_URI = `https://127.0.0.1:3000/api/v1`;
// export const API_URI = `https://loc.orangerea.com.ua:3000/api/v1`;
export const ORGID_PROXY_ADDRESS = '0x27B9dFa2607AaF3730Dad5c0E9fa8f6Dc0F2B49f';
export const DIRECTORY_PROXY_ADDRESS = '0x68d9cB089a3e17be6F9De7a318BBCC55F4c899Bc';
export const LIF_PROXY_ADDRESS = '0xfCfD5E296E4eD50B5F261b11818c50B73ED6c89E';
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
    "inputs": [],
    "name": "setInterfaces",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
