import Web3 from 'web3';
import {
  ORGID_ABI,
  ORGID_PROXY_ADDRESS,
  LIF_TOKEN_ABI,
  LIF_TOKEN_PROXY_ADDRESS,
  DIR_INDEX_ABI,
  DIRECTORIES_INDEX_ADDRESS,
  ARBITRATOR_ADDRESS,
  ARB_DIR_ABI,
  DIR_ABI,
  ARBITRATOR_ABI,

} from '../../utils/constants';

const toBN = value => Web3.utils.toBN(value);

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

// Get EnhancedAppealableArbitrator contract
export const getArbitratorContract = web3 => new web3.eth.Contract(ARBITRATOR_ABI, ARBITRATOR_ADDRESS);

// Get block
export const getBlock = async (web3, typeOrNumber = 'latest', checkEmptyBlocks = true) => {
  let counter = 0;
  let block;

  const isEmpty = block => checkEmptyBlocks
      ? block.transactions.length === 0
      : false;

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
    const isConnected = () => typeof web3.currentProvider.isConnected === 'function'
      ? web3.currentProvider.isConnected()
      : web3.currentProvider.connected;
    if (!isConnected()) {
      throw new Error(`Unable to fetch block "${typeOrNumber}": no connection`);
    }

    if (counter === 100) {
        counter = 0;
        throw new Error(
          `Unable to fetch block "${typeOrNumber}": retries limit has been reached`
        );
    }

    block = await blockRequest();
    console.log('>>>', counter, block.hash);

    if (!block) {
        await setTimeoutPromise(parseInt(3000 + 1000 * counter / 5));
    } else {
      await setTimeoutPromise(2500);
    }

    counter++;
  } while (!block || isEmpty(block));

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
export const sendMethod = async (web3, from, contractAddress, contractBuilder, method, methodArgs, value, gasPrice, confirmations = 2) => {
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
      throw new Error('This action method is currently not accessible by the contract conditions or your balance not enough to send a transaction');
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
          .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber > confirmations) {
              resolve(receipt);
            }
          })
          .on('error', (error) => {
            // Transaction has been reverted by the EVM
            console.log(error);
            reject(error);
          });
  });
};

// Fetching of the Evidence event for the specific challenge
export const getEvidenceEvent = async (web3, dirAddress, arbitratorAddress, orgId, challengeId) => {
  const contract = getArbDirContract(web3, dirAddress);
  const filter = {
    _arbitrator: arbitratorAddress,
    _evidenceGroupID: Web3.utils.toBN(Web3.utils.soliditySha3(orgId, Number(challengeId) + 1)).toString()
  };
  return contract.getPastEvents('Evidence', {
    filter,
    fromBlock: 0,
    toBlock: 'latest'
  });
};

// Return challenge info
export const getChallengeInfo = async (web3, dirAddress, orgId, challengeID) => {
  const contract = getArbDirContract(web3, dirAddress);
  return contract.methods.getChallengeInfo(orgId, challengeID).call();
};

// Return organization data
export const getOrganizationData = async (web3, dirAddress, orgId) => {
  const contract = getArbDirContract(web3, dirAddress);
  return contract.methods.organizationData(orgId).call();
};

// Return arbitrator owner address
export const getArbitratorOwner = async web3 => {
  const contract = getArbitratorContract(web3);
  return await contract.methods.owner().call();
};

// Return contributions
export const getContributions = async (web3, dirAddress, orgId, challengeID, round, contributor) => {
  const contract = getArbDirContract(web3, dirAddress);
  return contract.methods.getContributions(orgId, challengeID, round, contributor).call();
};

// Return current Round Info
export const getRoundInfo = async (web3, dirAddress, orgid, challengeID, round) => {
  const contract = getArbDirContract(web3, dirAddress);
  return contract.methods.getRoundInfo(orgid, challengeID, round).call();
};

// Return multiplier divisor
export const getMultiplierDivisor = async (web3, dirAddress) => {
  const contract = getArbDirContract(web3, dirAddress);
  return await contract.methods.MULTIPLIER_DIVISOR().call();
};

// Return current ruling
export const getCurrentRuling = async (web3, disputeID) => {
  const contract = getArbitratorContract(web3);
  return contract.methods.currentRuling(disputeID).call();
};

// Return current ruling
export const appealPeriod = async (web3, disputeID) => {
  const contract = getArbitratorContract(web3);
  return contract.methods.appealPeriod(disputeID).call();
};

// Return disputeStatus ruling
export const disputeStatus = async (web3, disputeID) => {
  const contract = getArbitratorContract(web3);
  return contract.methods.disputeStatus(disputeID).call();
};

// Return appealable dispute info
export const appealDisputes = async (web3, disputeID) => {
  const contract = getArbitratorContract(web3);
  return contract.methods.appealDisputes(disputeID).call();
};

// Return arbitrator timeOut
export const arbitratorTimeOut = async web3 => {
  const contract = getArbitratorContract(web3);
  return contract.methods.timeOut().call();
};

// Calculate appeal cost
export const calculateAppealCost = async (web3, dirAddress, orgId, party, challengeID, challenge) => {
  const dir = getArbDirContract(web3, dirAddress);
  const arb = getArbitratorContract(web3);
  const winner = await getCurrentRuling(web3, challenge.disputeID);
  let loser;
  if (winner === '1') {
    loser = '2';
  } else if (winner === '2') {
    loser = '1';
  }
  let multiplier;
  if (String(party) === winner) {
    multiplier = 'winnerStakeMultiplier';
  } else if (String(party) === loser) {
    multiplier = 'loserStakeMultiplier';
  } else {
    multiplier = 'sharedStakeMultiplier';
  }

  const MULTIPLIER_DIVISOR = toBN(await dir.methods.MULTIPLIER_DIVISOR().call());
  const multiplierValue = toBN(await dir.methods[multiplier]().call());
  console.log('===[[[', challenge);
  const appealCost = toBN(await arb.methods.appealCost(challenge.disputeID, challenge.arbitratorExtraData).call());
  console.log('>>>[[[', orgId, challengeID, Number(challenge.numberOfRounds) - 1);
  const round = await dir.methods.getRoundInfo(orgId, challengeID, Number(challenge.numberOfRounds) - 1).call();

  let totalCost = appealCost
    .add(
      appealCost
        .mul(multiplierValue)
        .div(MULTIPLIER_DIVISOR)
    );
  console.log('Total cost:', totalCost.toString());
  totalCost = totalCost.sub(toBN(round.paidFees[party]));

  const gas = '152114'; // pre calculated gas for the fundAppeal method
  const gasPrice = await ApiGetGasPrice(web3);
  const gasCost = toBN(gas).mul(toBN(gasPrice));

  return {
    multiplier: MULTIPLIER_DIVISOR.toString(),
    totalCost: totalCost.toString(),
    gasCost: gasCost.toString(),
    gasPrice
  };
};
