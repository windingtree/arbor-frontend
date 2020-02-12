import Web3 from 'web3';

const GetWeb3 = () => {
  return new Promise((resolve, reject) => {
    let web3 = window.web3;
    const alreadyInjected = typeof web3 !== "undefined";
    if (alreadyInjected) {
      web3 = new Web3(web3.currentProvider);
      console.log("Injected web3 detected.");
      resolve(web3);
    } else {
      const provider = new Web3.providers.HttpProvider('localhost:3000');
      web3 = new Web3(provider);
      alert('Please, install MetaMask plugin at your browser extensions store and return to us');
      resolve(web3);
    }
  })
};

export default GetWeb3;
