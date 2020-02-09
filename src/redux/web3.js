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
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
  })
};

export default GetWeb3;
