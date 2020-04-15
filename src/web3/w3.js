import Web3 from 'web3';
import { ORGID_ABI, ORGID_PROXY_ADDRESS, LIF_TOKEN_ABI, LIF_TOKEN_PROXY_ADDRESS } from "../utils/constants";

var cachedWeb3;

// Retrieve the Web3 object
export const getWeb3 = () => {
  if(cachedWeb3 === undefined) {
  
    // Ethereum user detected
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.autoRefreshOnNetworkChange = false;
      cachedWeb3 = new Web3(window['ethereum']);
      console.log("Ethereum provider detected.");
    }

    // Given Provider (eg: Mist)
    else if(Web3.givenProvider) {
      cachedWeb3 = new Web3(Web3.givenProvider);
      console.log("Given provider detected.");
    }
    
    // Check for injected web3 (old browsers or extensions)
    else if (typeof window.web3 !== undefined) {
      cachedWeb3 = window.web3;
      console.log("Injected web3 detected.");
    }
    
    else {
      alert('Please, install a web3 wallet such as MetaMask plugin at your browser extensions store and return to us');
    }
  }

  return cachedWeb3;
};

// Register to chain change event
export const onChainChange = (callback) => {
  let w3 = getWeb3();
  if(w3.currentProvider.on !== undefined) {
    w3.currentProvider.on('networkChanged', callback);
  }
  else {
    console.log('No network event change callbacks');
  }

}

/*******************************************/
/* Handle connecting, per EIP 1102/1193    */
/* https://eips.ethereum.org/EIPS/eip-1193 */
/*******************************************/
export const connect = () => {
  return new Promise((resolve, reject) => {

    // Check if there is support for EIP-1193
    if(window.ethereum.request !== undefined) {
      window.ethereum.request('eth_requestAccounts')
      .then(accounts => resolve(accounts))
      .catch(err => {
        // EIP 1193 userRejectedRequest error
        if (err.code === 4001) { 
          console.log('Please connect to MetaMask.')
        } else {
          console.error(err);
        }
        reject(err);
      });
    }

    // No support for EIP-1193, fallback to ethereum.enable()
    else {
      window.ethereum.enable()
      .then(accounts => resolve(accounts))
      .catch(err => reject(err));
    }
  });
};

// get the Gas Price
export const getGasPrice = () => {
  const web3 = getWeb3();
  return web3.toWei("10", "gwei"); // todo: calculate gwei
};

// get the current block number
export const getCurrentBlockNumber = async () => {
  const web3 = getWeb3();
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
};

// Get the ORG.ID contract
export const getOrgidContract = () => {
  const web3 = getWeb3();
  const orgidAbi = web3.eth.contract(ORGID_ABI); // todo: optimize ABI by removing methods that not used
  return orgidAbi.at(ORGID_PROXY_ADDRESS);
};


// Get the LIF Token contract
export const getLifTokenContract = () => {
  const web3 = getWeb3();
  return web3.eth.contract(LIF_TOKEN_ABI).at(LIF_TOKEN_PROXY_ADDRESS);
};
