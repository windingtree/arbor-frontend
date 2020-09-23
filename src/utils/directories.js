import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';

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