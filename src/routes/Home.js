import React, {useState, useEffect} from "react";
import history from '../redux/history';
import {Link} from 'react-router-dom';
import {Container, Typography, Grid, Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';
import Carousel from '@brainhubeu/react-carousel';
//components
import SearchComponent from '../components/SearchComponent';
//icons && illustrations
import HomeSearchIllustration from '../assets/SvgComponents/home-search-illustration.svg';
import WhatIfIllustration from '../assets/SvgComponents/what-if-illustration.svg';
import Logo from '../assets/SvgComponents/Logo';
import HomeIcon from '../assets/SvgComponents/HomeIcon';
import CarouselSignUpIllustration from '../assets/SvgComponents/home-carousel-sign-up-illustration.svg';
import CarouselValidateIllustration from '../assets/SvgComponents/home-carousel-validate-illustration.svg';
import CarouselDirectoryIllustration from '../assets/SvgComponents/home-carousel-directory-illustration.svg';
import AirFinanceImage from '../assets/SvgComponents/partner-air-france.svg';
import ERevMaxImage from '../assets/SvgComponents/partner-erev-max.svg';
import NordicImage from '../assets/SvgComponents/partner-nordic.svg';
import MachefertImage from '../assets/SvgComponents/partner-machefert.svg';
import ArrowLongIcon from '../assets/SvgComponents/ArrowLongIcon';
import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';
import DirectoryCard from '../components/DirectoryCardItem';
import CardsGridList from '../components/CardsGridList';
import BuiltByIllustration from '../assets/SvgComponents/built-by-illustration.svg';
//styles && colors
import colors from '../styles/colors';
import '@brainhubeu/react-carousel/lib/style.css';

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
    color: colors.greyScale.darkest,
    width: '50%'
  },
  subtitleWrapper: {
    width: '50%',
    marginBottom: '30px',
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
  blockTitleWrapper: {
    width: '85%'
  },
  blockTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
  },
  blockSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: colors.greyScale.dark,
    paddingTop: '20px'
  },
  joinContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.greyScale.moreLighter
  },
  joinSliderBase: {
    position: 'relative',
    height: '540px',
    width: '320px',
    borderRadius: '32px',
    boxShadow: '0px 4px 32px rgba(12, 64, 78, 0.08)',
    padding: '28px 28px 18px 28px',
    boxSizing: 'border-box',
  },
  joinSliderBaseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  joinSliderBaseLogo: {
    width: '74px',
    height: '26px'
  },
  joinSliderBaseHomeIcon: {
    color: colors.primary.accent
  },
  joinSliderBaseLine: {
    position: 'absolute',
    bottom: '18px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '2px',
    backgroundImage: colors.gradients.orangeDeg,
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
  directoriesCardsContainer: {
    marginTop: '20px'
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
    paddingTop: '16px',
  },
  statsContentWrapper: {
    position: 'absolute',
    bottom: '28px',
    left: '28px',
    width: 'calc(100% - 56px)'
  },
  statsContent: {
    position: 'relative',
    paddingTop: '14px',
    boxSizing: 'border-box'
  },
  statsLine: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '60px',
    height: '2px',
    backgroundColor: colors.primary.accent
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsItem: {},
  statsItemCount: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.greyScale.darkest,
  },
  statsItemLabel: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.greyScale.dark
  },
  builtByContainer: {
    backgroundColor: colors.secondary.yellowLight,
  },
  builtByContent: {
    position: 'relative',
    padding: '120px 0'
  }
});

function Home(props) {
  const classes = styles();
  const [searchValue, setSearchValue] = useState('');
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const {directories} = props;

  const handleSearch = event => {
    setSearchValue(event.target.value);
  };

  const useCasesControllers = [
    'AirFrance KLM',
    'Hotels',
    'airlines',
    'Category 4',
  ];
// -- Scrolling to top on first render
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const renderUseCasesControllers = () => {
    const controllers = useCasesControllers.map((item, index) => {
      return (
        <li className={index === activeUseCase ? classes.activeController : classes.controllerItem}
            key={index.toString()} style={{margin: '8px 0'}}>
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

  const sliderControllers = [
    'sign up',
    'validate',
    'directory'
  ];

  const handleSlideChange = (e) => {
    const item = e.target.innerHTML;
    const itemIndex = sliderControllers.indexOf(item);

    if (activeSlide === itemIndex) return;
    setActiveSlide(itemIndex);
  };

  const renderSliderControllers = () => {
    const controllers = sliderControllers.map((item, index) => {
      return (
        <li className={index === activeSlide ? classes.activeController : classes.controllerItem}
            key={index.toString()} style={{margin: '8px 0'}}>
          <span className={classes.controllerLine}/>
          <button
            className={classes.controllerButton}
            onClick={handleSlideChange}
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

  return (
    <div>
      <div className={classes.searchContainer}>
        <Container className={classes.searchContent}>
          <div>
            <Typography variant={'h1'} className={classes.searchTitle}>
              Find trusted partners for your business
            </Typography>
            <div className={classes.subtitleWrapper}>
              <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                Arbor has created an efficient alternative to lengthy and expensive Know-Your-Business
                (KYB) processes. Search for verified organizations across various industries and get
                discovered by potential partners.</Typography>
            </div>
            <div className={classes.searchForm}>
              <SearchComponent searchValue={searchValue} handleSearchValue={handleSearch}
                               fetchSearchResult={() => history.push('search', {request: searchValue})}/>
            </div>
<<<<<<< HEAD
            <Container>
                <div className={classes.contentWrapper}>
                    <Grid container justify={'space-between'} alignItems={'center'}>
                        <Grid item container spacing={2} style={{width: '42%'}}>
                            <Grid item>
                                <Card className={classes.partnerCard}>
                                    <img src={AirFinanceImage} alt={'partner'}/>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.partnerCard}>
                                    <img src={ERevMaxImage} alt={'partner'}/>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.partnerCard}>
                                    <img src={NordicImage} alt={'partner'}/>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.partnerCard}>
                                    <img src={MachefertImage} alt={'partner'}/>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item style={{width: '45%'}}>
                            <Typography variant={'h3'} className={classes.blockTitle}>We work with industry leaders
                            </Typography>
                            <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                                Large multinational companies join Arbor community to optimize their due diligence
                                processes and get exposed to prospective clients.</Typography>
                        </Grid>
                    </Grid>
=======
          </div>
          <div className={classes.illustrationWrapper}>
            <img src={HomeSearchIllustration} alt={'illustration'}/>
          </div>
        </Container>
      </div>
      <Container>
        <Grid container justify={'space-around'} alignItems={'center'} className={classes.kybChecksContent}
              wrap={'nowrap'}>
          <Grid item className={classes.kybChecksImageWrapper}>
            <img src={WhatIfIllustration} alt={'illustration'} className={classes.kybChecksIllustration}/>
          </Grid>
          <Grid item className={classes.kybChecksTextContainer}>
            <Typography variant={'h3'} className={classes.blockTitle}>
              Simplify routine KYB checks
            </Typography>
            <Typography variant={'subtitle2'} className={classes.blockSubtitle}>
              We strongly believe that due diligence should not get in the way of your business' success.
              With this in mind, we have created an open-source registry of trusted organizations that is
              controlled by community and accessible to everyone. </Typography>
            <Typography variant={'subtitle2'} className={classes.blockSubtitle}>Arbor uses ORG.ID, an open
              source
              standard for exchanging verified data about organizations. We have designed it to simplify
              lengthy and costly KYB processes that impede many potential partnerships.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.joinContainer}>
        <Container>
          <div className={classes.contentWrapper}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item style={{width: '45%'}}>
                <div className={classes.blockTitleWrapper}>
                  <Typography variant={'h3'} className={classes.blockTitle}>Join the registry of
                    trusted organizations</Typography>
                  <Typography variant={'subtitle1'} className={classes.blockSubtitle}>Find new
                    partners for your business and get discovered by potential clients.</Typography>
>>>>>>> 2bb3b6d02d05bbf3818779f28e8cd66e591b9df0
                </div>
              </Grid>
              <Grid item container justify={'space-between'} alignItems={'center'} style={{width: '50%'}}>
                <Grid item style={{width: '60%'}}>
                  <div className={classes.joinSliderBase}>
                    <div className={classes.joinSliderBaseHeader}>
                      <Logo viewBox={'0 0 90 32'} className={classes.joinSliderBaseLogo}/>
                      <HomeIcon width={'16px'} height={'16px'} viewBox={'0 0 16 16'} className={classes.joinSliderBaseHomeIcon}/>
                    </div>
                    <div>
                      <Carousel
                        value={activeSlide}
                        onChange={handleSlideChange}
                      >
                        <img src={CarouselSignUpIllustration} alt={'illustration'}/>
                        <img src={CarouselValidateIllustration} alt={'illustration'}/>
                        <img src={CarouselDirectoryIllustration} alt={'illustration'}/>
                      </Carousel>
                    </div>
                    <div className={classes.joinSliderBaseLine}/>
                  </div>
                </Grid>
                <Grid item style={{width: '30%'}}>
                  {
                    renderSliderControllers()
                  }
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container>
        <div className={classes.contentWrapper}>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item container spacing={2} style={{width: '42%'}}>
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
            <Grid item style={{width: '45%'}}>
              <Typography variant={'h3'} className={classes.blockTitle}>We work with industry leaders
              </Typography>
              <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                Large multinational companies join Arbor community to optimize their due diligence
                processes and get exposed to prospective clients.</Typography>
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
                Explore directories <ArrowLongIcon viewbow={'0 0 24 12'}
                                                   className={classes.navLinkIcon}/>
              </Link>
            </div>
            <CardsGridList justify={'space-between'} alignItems={'flex-start'}
                           className={classes.directoriesCardsContainer}>
              {
                directories.map((item, index) => {
                  return (
                    <Grid item key={index.toString()} style={{width: '210px'}}>
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
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>Take a look how
                  other businesses use Arbor to work with each other.</Typography>
              </div>
              <div>
                {renderUseCasesControllers()}
              </div>
            </Grid>
            <Grid item className={classes.useCasesCardContainer}>
              <Card className={classes.useCasesCard}>
                <CardContent
                  style={{position: 'relative', height: 'calc(100% - 56px)', padding: '28px'}}>
                  <img src={props.useCases[activeUseCase].logo} alt={'partner logo'}/>
                  <div className={classes.useCaseTextWrapper}>
                    <Typography variant={'subtitle2'} className={classes.blockSubtitle}>
                      <Ellipsis clamp={4}>
                        {props.useCases[activeUseCase].text}
                      </Ellipsis>
                    </Typography>
                  </div>
                  <div className={classes.statsContentWrapper}>
                    <div className={classes.statsContent}>
                      <div className={classes.statsLine}/>
                      <div className={classes.stats}>
                        {
                          props.useCases[activeUseCase].info.map((item, index) => {
                            return (
                              <div key={index.toString()} className={classes.statsItem}>
                                <Typography variant={'h5'}
                                            className={classes.statsItemCount}>{item.count}</Typography>
                                <Typography variant={'caption'}
                                            className={classes.statsItemLabel}
                                            noWrap>{item.label}</Typography>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.builtByContainer}>
        <Container>
          <div className={classes.builtByContent}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item style={{width: '45%'}}>
                <Typography variant={'h3'} className={classes.blockTitle}>
                  Built by community for community
                </Typography>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                  Arbor and its services are initiated by a non-profit foundation Winding Tree that
                  drives the development of open-source protocols.
                </Typography>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                  All the processes and operations taking place on Arbor platform are based on
                  Blockchain technology. It ensures full transparency and protects the members from
                  any fraudulent activities.
                </Typography>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                  Arbor is not controlled by any particular individual or company. This means your
                  data will never be sold to third parties and the service will remain non-commercial.
                </Typography>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                  Organizations of any size and from any industry can voluntary join Arbor community
                  and get in contact with other members.
                </Typography>
              </Grid>
              <Grid item style={{width: '50%'}}>
                <img src={BuiltByIllustration} alt={'illustration'}/>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
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
