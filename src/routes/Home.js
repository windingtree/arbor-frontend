import React, { useState } from "react";
import history from '../redux/history';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';
//components
import SearchComponent from '../components/SearchComponent';
//icons && illustrations
import HomeSearchIllustration from '../assets/SvgComponents/home-search-illustration.svg';
import WhatIfIllustration from '../assets/SvgComponents/what-if-illustration.svg';
import AirFinanceImage from '../assets/SvgComponents/partner-air-france.svg';
import ERevMaxImage from '../assets/images/partner-erev-max.png';
import NordicImage from '../assets/images/partner-nordic.png';
import MachefertImage from '../assets/images/partner-machefert.png';
import ArrowLongIcon from '../assets/SvgComponents/ArrowLongIcon';
//styles && colors
import colors from '../styles/colors';
import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';
import DirectoryCard from '../components/DirectoryCardItem';
import CardsGridList from '../components/CardsGridList';

const styles = makeStyles({
  searchContainer: {
    backgroundColor: colors.secondary.yellowLight,
    width: '100%'
  },
  searchContent: {
    position: 'relative',
    paddingTop: '122px',
    paddingBottom: '122px',
  },
  searchTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.greyScale.darkest,
    width: '50%'
  },
  subtitleWrapper: {
    width: '50%',
    margin: '20px 0 30px 0',
  },
  subtitle: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: colors.greyScale.dark,
  },
  searchForm: {
    position: 'relative',
    width: '60%',
  },
  illustrationWrapper: {
    position: 'absolute',
    top: '87px',
    right: '-60px'
  },
  kybChecksContent: {
    padding: '80px 0'
  },
  kybChecksImageWrapper: {
    position: 'relative',
    width: '40%',
    minHeight: '360px'
  },
  kybChecksIllustration: {
    position: 'absolute',
    left: '-80px',
    top: '0'
  },
  kybChecksTextContainer: {
    position: 'relative',
    width: '40%'
  },
  blockTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    paddingBottom: '20px'
  },
  blockSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: colors.greyScale.dark,
  },
  contentWrapper: {
    position: 'relative',
    padding: '120px 0'
  },
  partnerCard: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '220px',
    height: '80px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  directoriesWrapper: {
    backgroundColor: colors.greyScale.moreLighter
  },
  directoriesHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLinkToDirectories: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.1,
    color: colors.primary.accent,
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  navLinkIcon: {
    color: colors.primary.accent,
    verticalAlign: 'text-top',
    marginLeft: '10px'
  },
  directoriesContent: {
    padding: '64px',
  },
  useCasesInfoContainer: {
    position: 'relative',
    width: '40%'
  },
  useCasesControllers: {
    marginTop: '36px'
  },
  controllerItem: {
    position: 'relative',
    left: '-12px',
  },
  activeController: {
    '& button': {
      color: colors.primary.accent
    },
    '& > span': {
      width: '36px'
    }
  },
  controllerButton: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.1,
    backgroundColor: 'transparent',
    letterSpacing: '.009em',
    outline: 'none',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: colors.greyScale.common,
    transition: 'color .3s ease'
  },
  controllerLine: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '2px',
    width: '0',
    marginRight: '12px',
    backgroundColor: colors.primary.accent,
    transition: 'width .3s ease'
  },
  useCasesCardContainer: {
    position: 'relative',
    width: '50%',
  },
  useCasesCard: {
    width: '100%',
    height: '304px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  useCaseTextWrapper: {
    height: '140px',
    paddingTop: '16px',
  }
});

function Home(props) {
  const classes = styles();
  const [searchValue, setSearchValue] = useState('');
  const [activeUseCase, setActiveUseCase] = useState(0);
  const { directories } = props;

  const handleSearch = event => {
    setSearchValue(event.target.value);
  };

  const useCasesControllers = [
    'AirFrance KLM',
    'Hotels',
    'airlines',
    'Category 4',
  ];

  const renderUseCasesControllers = () => {
    const controllers = useCasesControllers.map((item, index) => {
      return (
        <li className={index === activeUseCase ? classes.activeController : classes.controllerItem} key={index.toString()} style={{ margin: '8px 0' }}>
          <span className={classes.controllerLine}/>
          <button
            className={classes.controllerButton}
            onClick={handleChangeActiveUseCase}
          >
            {item}
          </button>
        </li>
      )
    });

    return (
      <ul className={classes.useCasesControllers}>{controllers}</ul>
    )
  };

  const handleChangeActiveUseCase = (e) => {
    const item = e.target.innerHTML;
    const itemIndex = useCasesControllers.indexOf(item);

    if (activeUseCase === itemIndex) return;
    setActiveUseCase(itemIndex);
  };

  return (
    <div>
      <div className={classes.searchContainer}>
        <Container className={classes.searchContent}>
          <div>
            <Typography variant={'h2'} className={classes.searchTitle}>
              Find trusted partners for your business
            </Typography>
            <div className={classes.subtitleWrapper}>
              <Typography variant={'subtitle1'} className={classes.subtitle}>
                Arbor lets companies exchange trusted data with open source solutions. So you would know ho you are dealing with. It is designed to make Know-Your-Business (KYB) processes cheaper, faster, and more secure.
              </Typography>
            </div>
            <div className={classes.searchForm}>
              <SearchComponent searchValue={searchValue} handleSearchValue={handleSearch} fetchSearchResult={() => history.push('search', { state: { request: searchValue }})}/>
            </div>
          </div>
          <div className={classes.illustrationWrapper}>
            <img src={HomeSearchIllustration} alt={'illustration'} />
          </div>
        </Container>
      </div>
      <div>
        <Container>
          <Grid container justify={'space-around'} alignItems={'center'} className={classes.kybChecksContent} wrap={'nowrap'}>
            <Grid item className={classes.kybChecksImageWrapper}>
              <img src={WhatIfIllustration} alt={'illustration'} className={classes.kybChecksIllustration}/>
            </Grid>
            <Grid item className={classes.kybChecksTextContainer}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Simplify routine KYB checks
              </Typography>
              <Typography variant={'subtitle2'} className={classes.blockSubtitle}>
                Every organization in Arbor database has been validated via a secure process. It is transparent, decentralized and free of charge. Look for organizations across various industries in our database or join the community and get discovered by potential clients and partners.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container>
        <div className={classes.contentWrapper}>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item container spacing={2} style={{ width: '42%' }}>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={AirFinanceImage} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={ERevMaxImage} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={NordicImage} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={MachefertImage} alt={'partner'}/>
                </Card>
              </Grid>
            </Grid>
            <Grid item style={{ width: '45%' }}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Our partners
              </Typography>
              <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                Meet the companies that support Arbor in our strategic development and daily operations.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Container>
        <div className={classes.directoriesWrapper}>
          <div className={classes.directoriesContent}>
            <div className={classes.directoriesHeading}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Directories we work with
              </Typography>
              <Link to={'/directories'} className={classes.navLinkToDirectories}>
                Explore directories <ArrowLongIcon viewbow={'0 0 24 12'} className={classes.navLinkIcon}/>
              </Link>
            </div>
            <CardsGridList justify={'space-between'} alignItems={'flex-start'}>
              {
                directories.map((item, index) => {
                  return (
                    <Grid item key={index.toString()} style={{ width: '210px' }}>
                      <DirectoryCard
                        homeLayout={true}
                        directoryName={item.name}
                        directoryImage={item.image}
                      />
                    </Grid>
                  )
                })
              }
            </CardsGridList>
          </div>
        </div>
      </Container>
      <Container>
        <div className={classes.contentWrapper}>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item className={classes.useCasesInfoContainer}>
              <div>
                <Typography variant={'h3'} className={classes.blockTitle}>Use cases</Typography>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>Take a look how other businesses use Arbor to work with each other.</Typography>
              </div>
              <div>
                {renderUseCasesControllers()}
              </div>
            </Grid>
            <Grid item className={classes.useCasesCardContainer}>
              <Card className={classes.useCasesCard}>
                <CardContent style={{ position: 'relative' }}>
                  <img src={props.useCases[activeUseCase].logo} alt={'partner logo'}/>
                  <div className={classes.useCaseTextWrapper}>
                    <Typography variant={'subtitle2'} className={classes.blockSubtitle}>
                      <Ellipsis clamp={5}>
                        {props.useCases[activeUseCase].text}
                      </Ellipsis>
                    </Typography>
                  </div>
                  <div className={classes.statsContainer}>
                    <div>
                      {
                        props.useCases[activeUseCase].info.map((item, index) => {
                          return (
                            <div key={index.toString()}>

                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

Home.defaultProps = {
  directories: [
    {
      name: 'hotels',
      image: HotelIllustration
    },
    {
      name: 'airlines',
      image: AirlineIllustration
    },
    {
      name: 'insurance',
      image: InsuranceIllustration
    },
    {
      name: 'travel-agencies',
      image: TravelIllustration
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

export default Home;
