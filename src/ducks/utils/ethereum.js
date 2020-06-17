import { getWeb3 } from '../../web3/w3'

// Calculate average gas price value based on the latest block transactions
export const ApiGetGasPrice = async () => {
  let web3 = getWeb3();
  const block = await web3.eth.getBlock('latest');
  const transactions = await Promise.all(block.transactions.map(tx => web3.eth.getTransaction(tx)));
  const sum = transactions.reduce(
    (a, v) => {
      v.gasPrice = typeof v.gasPrice === 'object' ? v.gasPrice.toString() : v.gasPrice;
      return a + Math.ceil(Number(web3.utils.fromWei(v.gasPrice, 'gwei')));
    },
    0
  );
  return web3.utils.toWei(Math.ceil(parseInt(sum / transactions.length)).toString(), 'gwei');
}
