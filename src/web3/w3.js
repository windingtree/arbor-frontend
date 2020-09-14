// import Web3 from 'web3';

// import {
//   ORGID_ABI,
//   ORGID_PROXY_ADDRESS,
//   LIF_TOKEN_ABI,
//   LIF_TOKEN_PROXY_ADDRESS
// } from "../utils/constants";

// var cachedWeb3;
// var orgidContract;
// var lifContract;

// // Retrieve the Web3 object
// export const getWeb3 = () => {
//   if(cachedWeb3 === undefined) {

//     // Ethereum user detected
//     if (typeof window.ethereum !== 'undefined') {
//       window.ethereum.autoRefreshOnNetworkChange = false;
//       cachedWeb3 = new Web3(window['ethereum']);
//       console.log("Ethereum provider detected.");
//     }

//     // Given Provider (eg: Mist)
//     else if(Web3.givenProvider) {
//       cachedWeb3 = new Web3(Web3.givenProvider);
//       console.log("Given provider detected.");
//     }

//     // Check for injected web3 (old browsers or extensions)
//     else if (typeof window.web3 !== undefined) {
//       cachedWeb3 = window.web3;
//       console.log("Injected web3 detected.");
//     }

//     else {
//       alert('Please, install a web3 wallet such as MetaMask plugin at your browser extensions store and return to us');
//     }
//   }

//   return cachedWeb3;
// };

// // Register to chain change event
// export const onChainChanged = (callback) => {
//   let w3 = getWeb3();
//   if(w3 && w3.currentProvider.on !== undefined) {
//     // Legacy Method
//     // w3.currentProvider.on('networkChanged', callback);

//     // EIP 1193 Method
//     w3.currentProvider.on('chainChanged', (chainIdHex) => {
//       callback(parseInt(chainIdHex, 16));
//     });
//     w3.currentProvider.on('chainIdChanged', (chainIdHex) => {
//       callback(parseInt(chainIdHex, 16));
//     });
//   }
//   else {
//     console.log('No network event change callbacks');
//   }
// }

// // Register to account change event
// export const onAccountsChanged = (callback) => {
//   let w3 = getWeb3();
//   if(w3 && w3.currentProvider.on !== undefined) {
//     // EIP 1193 Method
//     w3.currentProvider.on('accountsChanged', callback);
//   }
//   else {
//     console.log('No network event change callbacks');
//   }
// }

// // get the current block number
// export const getCurrentBlockNumber = async () => {
//   const web3 = getWeb3();
//   return new Promise((resolve, reject) => {
//     web3.eth.getBlockNumber((err, data) => {
//       if(err) return reject(err);
//       resolve(data);
//     });
//   });
// };

// // Get the ORG.ID contract
// export const getOrgidContract = () => {
//   if(orgidContract === undefined) {
//     let web3 = getWeb3();
//     orgidContract =  new web3.eth.Contract(ORGID_ABI, ORGID_PROXY_ADDRESS)
//   }
//   return orgidContract;
// };

// // Get the LIF Token contract
// export const getLifTokenContract = () => {
//   if(lifContract === undefined) {
//     let web3 = getWeb3();
//     lifContract = new web3.eth.Contract(LIF_TOKEN_ABI, LIF_TOKEN_PROXY_ADDRESS);
//   }
//   return lifContract;
// };
