import Web3 from 'web3';

const GetWeb3 = () => {
  return new Promise((resolve, reject) => {
    let web3 = window.web3;
    if (typeof web3 !== undefined && web3.currentProvider.isMetaMask) {
      web3 = new Web3(web3.currentProvider);
      console.log("Injected web3 detected.");
      resolve(web3);
    } else {
      alert('Please, install MetaMask plugin at your browser extensions store and return to us');
      reject(web3);
    }
  })
};

export default GetWeb3;
