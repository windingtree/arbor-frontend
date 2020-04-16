import Web3 from 'web3';
import { 
  ORGID_ABI,
  ORGID_PROXY_ADDRESS,
  LIF_TOKEN_ABI,
  LIF_TOKEN_PROXY_ADDRESS,
} from "../utils/constants";

var cachedWeb3;
var orgidContract;
var lifContract;

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
export const onChainChanged = (callback) => {
  let w3 = getWeb3();
  if(w3.currentProvider.on !== undefined) {
    // Legacy Method
    w3.currentProvider.on('networkChanged', callback);
    
    // EIP 1193 Method
    w3.currentProvider.on('chainChanged', (chainIdHex) => {
      callback(parseInt(chainIdHex, 16));
    });
  }
  else {
    console.log('No network event change callbacks');
  }
}

// Register to account change event
export const onAccountsChanged = (callback) => {
  let w3 = getWeb3();
  if(w3.currentProvider.on !== undefined) {
    // EIP 1193 Method
    w3.currentProvider.on('accountsChanged', callback);
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
  return getWeb3().utils.toWei("10", "gwei");
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
  if(orgidContract === undefined) {
    let web3 = getWeb3();
    orgidContract =  new web3.eth.Contract(ORGID_ABI, ORGID_PROXY_ADDRESS)
  }
  return orgidContract;
};


// Get the LIF Token contract
export const getLifTokenContract = () => {
  if(lifContract === undefined) {
    let web3 = getWeb3();
    lifContract = new web3.eth.Contract(LIF_TOKEN_ABI, LIF_TOKEN_PROXY_ADDRESS);
  }
  return lifContract;
};
