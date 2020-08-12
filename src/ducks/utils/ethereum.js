import {
  ORGID_ABI,
  ORGID_PROXY_ADDRESS,
  LIF_TOKEN_ABI,
  LIF_TOKEN_PROXY_ADDRESS
} from '../../utils/constants';

const setTimeoutPromise = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// get the current block number
export const getCurrentBlockNumber = async web3 => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
};

// Get the ORG.ID contract
export const getOrgidContract = web3 => new web3.eth.Contract(ORGID_ABI, ORGID_PROXY_ADDRESS);

// Get the LIF Token contract
export const getLifTokenContract = web3 => new web3.eth.Contract(LIF_TOKEN_ABI, LIF_TOKEN_PROXY_ADDRESS);

// Get block
export const getBlock = async (web3, typeOrNumber) => {
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
export const ApiGetGasPrice = async web3 => {
  const block = await getBlock(web3, 'latest');
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
