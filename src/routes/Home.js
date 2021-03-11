import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { fetchSearchOrganizationsByType } from '../ducks/fetchSearchResults';
import history from '../redux/history';
import queryString from 'query-string';
import {Container, Typography, Grid} from '@material-ui/core'; // CardContent,
import {makeStyles} from '@material-ui/core/styles';
import SearchComponent from '../components/SearchComponent';
import HomeSearchIllustration from '../assets/SvgComponents/home-search-illustration.svg';
import AirFinanceImage from '../assets/SvgComponents/partner-air-france.svg';
import ERevMaxImage from '../assets/SvgComponents/partner-erev-max.svg';
import NordicImage from '../assets/SvgComponents/partner-nordic.svg';
import MachefertImage from '../assets/SvgComponents/partner-machefert.svg';
import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';

import colors from '../styles/colors';
import '@brainhubeu/react-carousel/lib/style.css';

const styles = makeStyles({
  searchContainer: {
    backgroundColor: colors.primary.white,
    width: '100%'
  },
  searchContent: {
    position: 'relative',
    paddingTop: '140px',
    paddingBottom: '250px',
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '80px',
      paddingTop: '100px',
    },
  },
  searchTitle: {
    marginTop: '28px',
    fontSize: '40px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    lineHeight: 1.3,
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '24px',
      marginTop: '0'
    },
  },
  subtitleWrapper: {
    marginTop: '5px',
    marginBottom: '30px',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      marginBottom: '24px'
    },
  },
  searchForm: {
    marginTop: '50px',
    position: 'relative',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '30px',
    },
  },
  bgRed: { // 435+16+191 = 642 | 435/642 = 68% | 29% ||
    backgroundColor: 'red',
    minHeight: '20px'
  },
  searchBlockIllustrationImg: {
    width: '100%'
  },
});

function Home(props) {
  const classes = styles();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleUpdate = e => {
    setSearchValue(e.target.value);
  };

  const handleSearch = value => {
    const data = {
      name: value
    };
    history.push(`/search?${queryString.stringify(data)}`);
  };

  return (
    <div>
      <div className={classes.searchContainer}>
        <Container className={classes.searchContent}>
          <Grid container spacing={5} direction="row-reverse">
            <Grid item xs={12} md={5}>
              <div>
                <img className={classes.searchBlockIllustrationImg} src={HomeSearchIllustration} alt={''}/>
              </div>
            </Grid>{/*right*/}
            <Grid item xs={12} md={7}>
              <Typography variant={'h1'} className={classes.searchTitle}>
                Find trusted partners <br /> for your business
              </Typography>
              <div className={classes.searchForm}>
                <SearchComponent
                  searchValue={searchValue}
                  handleSearchValue={handleUpdate}
                  fetchSearchResult={() => handleSearch(searchValue)}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

Home.defaultProps = {
  directories: [
    {
      name: 'Hotels',
      image: HotelIllustration,
      searchReq: 'hotel'
    },
    {
      name: 'Airlines',
      image: AirlineIllustration,
      searchReq: 'airline'
    },
    {
      name: 'Insurance companies',
      image: InsuranceIllustration,
      searchReq: 'insurance'
    },
    {
      name: 'Travel agencies',
      image: TravelIllustration,
      searchReq: 'ota'
    },
  ],
  useCases: [
    {
      logo: AirFinanceImage,
      text: 'I have been in sales and marketing for over 12 years and literally have NEVER liked one of the sales CRMs that I have used...and then HubSpot came along and waived their magic sales wand and made a CRM that is actually sales-minded and makes SENSE.',
      info: [
        {
          count: 322,
          label: 'followers on insta'
        },
        {
          count: 1200,
          label: 'followers on insta'
        },
        {
          count: 750,
          label: 'followers on insta'
        },
      ]
    },
    {
      logo: ERevMaxImage,
      text: 'NEVER liked one of the sales CRMs that I have used...and then HubSpot came along and waived their magic sales wand and made a CRM that is actually sales-minded and makes SENSE.',
      info: [
        {
          count: 900,
          label: 'followers on insta'
        },
        {
          count: 650,
          label: 'followers on insta'
        },
        {
          count: 1000,
          label: 'followers on insta'
        },
      ]
    },
    {
      logo: NordicImage,
      text: 'marketing for over 12 years and marketing for over 12 years and have been in have been in I have been in sales and marketing for over 12 years and literally have NEVER liked one of the sales CRMs that I have used...and then HubSpot came along and waived their magic sales wand and made a CRM that is actually sales-minded and makes SENSE.',
      info: [
        {
          count: 550,
          label: 'followers on insta'
        },
        {
          count: 780,
          label: 'followers on insta'
        },
        {
          count: 800,
          label: 'followers on insta'
        },
      ]
    },
    {
      logo: MachefertImage,
      text: '12 years marketing for over 12 years andI have been in sales and marketing for over 12 years and literally have NEVER liked one of the sales CRMs that I have used...and then HubSpot came along and waived their magic sales wand and made a CRM that is actually sales-minded and makes SENSE.',
      info: [
        {
          count: 800,
          label: 'followers on insta'
        },
        {
          count: 800,
          label: 'followers on insta'
        },
        {
          count: 800,
          label: 'followers on insta'
        },
      ]
    },
  ]
};
const mapDispatchToProps = {
  fetchSearchOrganizationsByType
};

export default connect(null, mapDispatchToProps)(Home);
