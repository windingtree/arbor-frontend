import Web3 from 'web3';
import {
  ORGID_ABI,
  ORGID_PROXY_ADDRESS,
  LIF_TOKEN_ABI,
  LIF_TOKEN_PROXY_ADDRESS,
  DIR_INDEX_ABI,
  DIRECTORIES_INDEX_ADDRESS,
  ARB_DIR_ABI,
  DIR_ABI
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

// Get DirectoryIndex contract
export const getDirIndexContract = web3 => new web3.eth.Contract(DIR_INDEX_ABI, DIRECTORIES_INDEX_ADDRESS);

// Get ArbitrableDirectory contract
export const getArbDirContract = (web3, address) => new web3.eth.Contract(ARB_DIR_ABI, address);

// Get ArbitrableDirectory contract
export const getDirContract = (web3, address) => new web3.eth.Contract(DIR_ABI, address);

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
    if (counter === 100) {
        counter = 0;
        throw new Error(
          `Unable to fetch block "${typeOrNumber}": retries limit has been reached`
        );
    }

    block = await blockRequest();
    console.log('>>>', counter, block);

    if (!block) {
        await setTimeoutPromise(parseInt(3000 + 1000 * counter / 5));
    } else {
      await setTimeoutPromise(2500);
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
  return web3.utils.toWei(Math.ceil(parseInt((sum / transactions.length * 1.2))).toString(), 'gwei');
}

// get balance in units
export const getBalance = async (web3, address, toBN = true) => {
  const balance = await web3.eth.getBalance(address);
  return toBN
    ? web3.utils.toBN(balance)
    : balance;
};

// sign transaction
export const signTransaction = async (web3, from, gasLimit, method, args) => {
  const contract = await getOrgidContract(web3);
  const tx = {
    from,
    to: contract.options.address,
    gas: gasLimit,
    value: 0,
    data: contract.methods[method]
    .apply(contract, args)
    .encodeABI()
  };
  console.log(JSON.stringify(tx));

  return web3.eth.signTransaction(tx, from);
};

export const sendSignedTransaction = async (web3, from, rawTransaction) => {
  return web3.eth.sendSignedTransaction(rawTransaction, from);
};

// Send transaction to contract
export const sendMethod = async (web3, from, contractAddress, contractBuilder, method, methodArgs, value, gasPrice) => {
  const contract = contractBuilder(web3, contractAddress);
  let gas;
  try {
    gas = await contract
      .methods[method]
      .apply(contract, methodArgs)
      .estimateGas({
          from,
          ...(value ? { value } : {})
      });
  } catch (error) {
    if (error.message.match(/gas required exceeds allowance/)) {
      throw new Error('This action method is currently not accessible by the contract conditions');
    }
    throw error;
  }
  gasPrice = gasPrice ? gasPrice : await ApiGetGasPrice(web3);
  return new Promise((resolve, reject) => {
      contract
          .methods[method]
          .apply(contract, methodArgs)
          .send({
              from,
              gas,
              ...(gasPrice ? { gasPrice } : {}),
              ...(value ? { value } : {})
          })
          .on('receipt', receipt => {
              resolve(receipt);
          })
          .on('error', (error) => {
              reject(error);
          });
  });
};

// Fetching of the Evidence event for the specific challenge
export const getEvidenceEvent = async (web3, dirAddress, arbitratorAddress, orgId, challengeNumber) => {
  const contract = getArbDirContract(web3, dirAddress);
  const filter = {
    _arbitrator: arbitratorAddress,
    _evidenceGroupID: Web3.utils.toBN(Web3.utils.soliditySha3(orgId, challengeNumber)).toString()
  };
  return contract.getPastEvents('Evidence', {
    filter,
    fromBlock: 0,
    toBlock: 'latest'
  });
};