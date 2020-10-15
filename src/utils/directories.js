import Web3 from 'web3';
import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';

import { api } from '../redux/api'

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

    const body = new FormData();

    if (file) {
        body.append('media', file, `${await getHash(file)}.json`);
    } else if (text) {
        body.append(
            'media',
            new Blob([text], { type: 'application/json' }),
            `${await getHash(text)}.json`
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
        fileTypeExtension: 'json',
        name,
        description
    };

    return saveMediaToArbor({
        address,
        id,
        text: serializeJson(evidence)
    })
};

export const isResponseTimeout = directory => (
    Number(directory.organization.lastStatusChange) + Number(directory.responseTimeout)
) * 1000 > Date.now();

export const isExecutionTimeout = directory => (
    Number(directory.organization.lastStatusChange) + Number(directory.executionTimeout)
) * 1000 > Date.now();

export const isWithdrawTimeout = directory => (
    Number(directory.organization.withdrawalRequestTime) + Number(directory.executionTimeout)
) * 1000 > Date.now();
