import Web3 from 'web3';
import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';

import { api } from '../redux/api';
import {
    getLifTokenContract
} from '../ducks/utils/ethereum';

// Prepare directory meta-data
export const getSegmentMeta = data => {
    const segment = data;

    switch (data.segment) {
        case 'hotels':
            segment.title = 'Hotels';
            segment.icon = HotelIllustration;
            break;
        case 'airlines':
            segment.title = 'Airlines';
            segment.icon = AirlineIllustration;
            break;
        case 'insurance':
            segment.title = 'Insurance companies';
            segment.icon = InsuranceIllustration;
            break;
        case 'ota':
            segment.title = 'Travel agencies';
            segment.icon = TravelIllustration;
            break;
        default:
            segment.title = data.segment.charAt(0).toUpperCase() + data.segment.slice(1);
            segment.icon = TravelIllustration;
    }

    return segment
};

export const serializeJson = jsonData => JSON.stringify(jsonData, null, 2);

// Generate hash for string or file
export const getHash = file => new Promise((resolve, reject) => {
    if (!file) {
        throw new Error('File not found');
    }
    if (typeof file === 'string') {
        return resolve(Web3.utils.soliditySha3(file));
    }
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = evt => resolve(Web3.utils.soliditySha3(evt.target.result));
    reader.onerror = () => reject(new Error('Unable to read file'));
});

export const saveMediaToArbor = async data => {
    const {
      address,
      id,
      file,
      text
    } = data;

    let fileTypeExtension;
    const body = new FormData();

    if (file) {
        fileTypeExtension = file.name.match(/\.([0-9a-z]+)$/i)[1];
        body.append('media', file, `${await getHash(file)}.${fileTypeExtension}`);
    } else if (text) {
        fileTypeExtension = 'json';
        body.append(
            'media',
            new Blob([text], { type: `application/${fileTypeExtension}` }),
            `${await getHash(text)}.${fileTypeExtension}`
        );
    } else {
        throw new Error('Nor file not text has been provided');
    }

    body.append('address', address);
    body.append('id', id);

    return api(`media`, 'POST', {
        body
    });
}

export const buildAndSaveEvidenceJson = data => {
    const {
        fileURI,
        fileHash,
        name,
        description,
        address,
        id
    } = data;

    const evidence = {
        fileURI,
        fileHash,
        fileTypeExtension: fileURI.match(/\.([0-9a-z]+)$/i)[1],
        name,
        description
    };

    return saveMediaToArbor({
        address,
        id,
        text: serializeJson(evidence)
    })
};

export const fetchLifBalance = async (web3, owner) => {
    const lif = getLifTokenContract(web3);
    const balance = await lif.methods.balanceOf(owner).call();
    return web3.utils.fromWei(balance, 'ether');
};

export const fetchLifAllowance = async (web3, owner, spender) => {
    const lif = getLifTokenContract(web3);
    const allowance = await lif.methods.allowance(owner, spender).call();
    return web3.utils.fromWei(allowance, 'ether');
};

export const fetchEthBalance = async (web3, owner) => {
    const balance = await web3.eth.getBalance(owner);
    return web3.utils.fromWei(balance, 'ether');
};

export const fetchBalances = async (web3, owner, spender) => {
    const lifBalance = await fetchLifBalance(web3, owner);
    const lifAllowance = await fetchLifAllowance(web3, owner, spender);
    const ethBalance = await fetchEthBalance(web3, owner);
    return {
        lifBalance,
        lifAllowance,
        ethBalance
    };
}

export const isResponseTimeout = (directory, organization) => (
    Number(organization.lastStatusChange) + Number(directory.responseTimeout)
) * 1000 > Date.now();

export const isExecutionTimeout = (directory, organization) => (
    Number(organization.lastStatusChange) + Number(directory.executionTimeout)
) * 1000 > Date.now();

export const isWithdrawTimeout = (directory, organization) => (
    Number(organization.withdrawalRequestTime) + Number(directory.executionTimeout)
) * 1000 > Date.now();

export const responseTimeoutTitle = (directory, organization) => {
    const time = new Date(
        (
            Number(organization.lastStatusChange) + Number(directory.responseTimeout)
        ) * 1000
    );
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
};

export const timeToLocalString = unixtime => {
    const time = new Date(Number(unixtime));
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
};

export const executionTimeoutTitle = (directory, organization) => {
    const time = new Date(
        (
            Number(organization.lastStatusChange) + Number(directory.executionTimeout)
        ) * 1000
    );
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
};

export const withdrawTimeoutTitle = (directory, organization) => {
    const time = new Date(
        (
            Number(organization.withdrawalRequestTime) + Number(directory.executionTimeout)
        ) * 1000
    );
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
}
