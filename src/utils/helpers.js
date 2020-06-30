import Web3 from 'web3';
// import { keccak256 } from "js-sha3";
import DefaultHotelImage1 from '../assets/images/default-image-hotel-1.svg';
import DefaultHotelImage2 from '../assets/images/default-image-hotel-2.svg';
import DefaultHotelImage3 from '../assets/images/default-image-hotel-3.svg';
import DefaultHotelImage4 from '../assets/images/default-image-hotel-4.svg';
import DefaultHotelImage5 from '../assets/images/default-image-hotel-5.svg';
import DefaultHotelImage6 from '../assets/images/default-image-hotel-6.svg';
import DefaultHotelImage7 from '../assets/images/default-image-hotel-7.svg';
import DefaultHotelImage8 from '../assets/images/default-image-hotel-8.svg';
import DefaultHotelImage9 from '../assets/images/default-image-hotel-9.svg';
import DefaultAirlineImage1 from '../assets/images/default-image-airline-1.svg';
import DefaultAirlineImage2 from '../assets/images/default-image-airline-2.svg';
import DefaultAirlineImage3 from '../assets/images/default-image-airline-3.svg';
import DefaultAirlineImage4 from '../assets/images/default-image-airline-4.svg';
import DefaultAirlineImage5 from '../assets/images/default-image-airline-5.svg';
import DefaultAirlineImage6 from '../assets/images/default-image-airline-6.svg';
//import { ORGID_ABI, ORGID_PROXY_ADDRESS, LIF_TOKEN_ABI, LIF_TOKEN_PROXY_ADDRESS } from "./constants";

export const copyStrToClipboard = str => navigator.clipboard.writeText(str).then(resolve => resolve);
export const strCenterEllipsis = str => str ? `${str.substr(0, 4)}...${str.substr(-4, 4)}` : '0xUNDEFINED';

export const setRandomDefaultImage = (orgid, directory) => {
  let arrayOfDefaultImages = [];
  let index = 0;
  if (directory === 'hotel' || directory === 'legalEntity' || directory === 'ota' || directory === 'insurance') arrayOfDefaultImages.push(DefaultHotelImage1, DefaultHotelImage2, DefaultHotelImage3, DefaultHotelImage4, DefaultHotelImage5, DefaultHotelImage6, DefaultHotelImage7, DefaultHotelImage8, DefaultHotelImage9);
  if (directory === 'airline') arrayOfDefaultImages.push(DefaultAirlineImage1, DefaultAirlineImage2, DefaultAirlineImage3, DefaultAirlineImage4, DefaultAirlineImage5, DefaultAirlineImage6);
  try {
    let lastCharFromOrgid = orgid.toString().slice(-1);
    index = parseInt(`0x${lastCharFromOrgid}`);
    index = index < arrayOfDefaultImages.length ? index : index % arrayOfDefaultImages.length;
  } catch (e) {
    console.error('Error in setRandomDefaultImage:', e.toString());
    index = 0;
  }
  return arrayOfDefaultImages[index];
};

// export const idGenerator = () => {
//   return `did:orgid:0x${keccak256(`${Date.now()}${Math.random()}`)}`
// };

export const generateSolt = () => Web3.utils.keccak256(Math.random().toString());

export const createIdWithSolt = (address, solt) => {
  return `did:orgid:${Web3.utils.soliditySha3(
    address,
    solt
  )}`;
};

/*
export const getWeb3 = () => {
  if (typeof window.web3 === 'undefined') {
    alert('MetaMask not found. If you just install MetaMask please refresh page to continue');
    throw new Error(`MetaMask not found`);
  }
  return window.web3
};

export const getGasPrice = () => {
  const web3 = getWeb3();
  return web3.toWei("10", "gwei"); // todo: calculate gwei
};

export const getCurrentBlockNumber = async () => {
  const web3 = getWeb3();
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
};

export const getOrgidContract = () => {
  const web3 = getWeb3();
  const orgidAbi = web3.eth.contract(ORGID_ABI); // todo: optimize ABI by removing methods that not used
  return orgidAbi.at(ORGID_PROXY_ADDRESS);
};

export const getLifTokenContract = () => {
  const web3 = getWeb3();
  return web3.eth.contract(LIF_TOKEN_ABI).at(LIF_TOKEN_PROXY_ADDRESS);
};
*/