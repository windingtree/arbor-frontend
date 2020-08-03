import { getWeb3 } from '../../web3/w3';

const setTimeoutPromise = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// Get current block number
// const getCurrentBlockNumber = async web3 => {
//   let counter = 0;
//   let blockNumber;

//   const blockNumberRequest = () => new Promise(resolve => {
//       const blockNumberTimeout = setTimeout(() => resolve(null), 2000);

//       try {
//           web3.eth.getBlockNumber((error, result) => {
//               clearTimeout(blockNumberTimeout);

//               if (error) {
//                   return resolve();
//               }

//               resolve(result);
//           });
//       } catch (error) {
//           // ignore errors due because of we will be doing retries
//           resolve(null);
//       }
//   });

//   do {
//       if (counter === 10) {
//           throw new Error('Unable to fetch blockNumber: retries limit has been reached');
//       }

//       blockNumber = await blockNumberRequest();
      
//       if (typeof blockNumber !== 'number') {
//           await setTimeoutPromise(1000 + 1000 * parseInt(counter / 3));
//       }

//       counter++;
//   } while (typeof blockNumber !== 'number');

//   return blockNumber;
// };

// Get block
const getBlock = async (web3, typeOrNumber) => {
  let counter = 0;
  let block;

  const blockRequest = () => new Promise(resolve => {
    const blockNumberTimeout = setTimeout(() => resolve(null), 2000);

    try {
      web3.eth.getBlock(typeOrNumber, (error, result) => {
        clearTimeout(blockNumberTimeout);

        if (error) {
            return resolve();
        }

        resolve(result);
      });
    } catch (error) {
        // ignore errors due because of we will be doing retries
        resolve(null);
    }
  });

  do {
    if (counter === 20) {
        throw new Error(
          `Unable to fetch block "${typeOrNumber}": retries limit has been reached`
        );
    }

    block = await blockRequest();
    
    if (!block) {
        await setTimeoutPromise(1000 + 1000 * parseInt(counter / 3));
    }

    counter++;
  } while (!block || block.transactions.length === 0);

  return block;
};

// Calculate average gas price value based on the latest block transactions
export const ApiGetGasPrice = async () => {
  let web3 = getWeb3();
  const block = await getBlock(web3, 'latest');
  const transactions = await Promise.all(block.transactions.map(tx => web3.eth.getTransaction(tx)));
  const sum = transactions.reduce(
    (a, v) => {
      v.gasPrice = typeof v.gasPrice === 'object' ? v.gasPrice.toString() : v.gasPrice;
      return a + Math.ceil(Number(web3.utils.fromWei(v.gasPrice, 'gwei')));
    },
    0
  );
  console.log('@@@@@@@@@@@', sum, transactions, transactions.length);
  return web3.utils.toWei(Math.ceil(parseInt(sum / transactions.length)).toString(), 'gwei');
}
