import { keccak256 } from "js-sha3";
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
    console.error(e);
    index = 0;
  }
  return arrayOfDefaultImages[index];
};

export const idGenerator = () => {
  return `did:orgid:0x${keccak256(`${Date.now()}${Math.random()}`)}`
};
