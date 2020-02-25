import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { fetchSearchOrganizationsByType } from '../ducks/fetchSearchResults';
import history from '../redux/history';
import {Link} from 'react-router-dom';
import {Container, Typography, Grid, Card, CardContent, Box, Hidden} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';
import VizSensor from 'react-visibility-sensor';
import { throttle } from '../utils/helpers';
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
import listPlaceholderSvg from '../assets/SvgComponents/list-placeholder.svg';
//styles && colors
import colors from '../styles/colors';
import '@brainhubeu/react-carousel/lib/style.css';
import { styles as trustStyles } from '../routes/Trust/TrustWebsite';

const styles = makeStyles({
  searchContainer: {
    backgroundColor: colors.secondary.yellowLight,
    width: '100%'
  },
  searchContent: {
    position: 'relative',
    paddingTop: '94px',
    paddingBottom: '117px',
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '40px',
      paddingTop: '40px',
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
      marginTop: '0',
    },
  },
  bgRed: { // 435+16+191 = 642 | 435/642 = 68% | 29% ||
    backgroundColor: 'red',
    minHeight: '20px'
  },
  searchBlockIllustrationImg: {
    width: '100%'
  },
  kybChecksContent: {
    padding: '98px 0',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '32px 0',
    },
  },
  kybChecksImageWrapper: {
    textAlign: 'center',
    maxWidth: '100%',
    ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
      marginRight: '-82px'
    },
  },
  kybChecksIllustration: {
    maxWidth: '100%'
  },
  kybChecksTextContainer: {
  },
  blockTitleWrapper: {
    width: '85%'
  },
  blockTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '24px'
    },
  },
  blockSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.74,
    color: colors.greyScale.dark,
    paddingTop: '30px',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '14px',
      paddingTop: '20px',
      color: colors.greyScale.darkest
    },
  },
  joinContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.greyScale.moreLighter
  },
  trustLink: {
    textDecoration: 'none',
    color: colors.secondary.peach
  },
  joinSliderContainer: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column'
    }
  },
  joinTextContainer: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '30px'
    }
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
  carouselWrapper: {
    position: 'absolute',
    top: '100px',
    left: '-25px',
    width: '120%',
    height: '70%'
  },
  carouselImage: {
    width: '100%'
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
  joinSliderControllersContainer: {
    width: '34%',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    }
  },
  contentWrapper: {
    position: 'relative',
    padding: '103px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '32px 0'
    },
  },
  partnerCard: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  partnerCardImage: {
    maxWidth: '95%'
  },
  directoriesWrapper: {
    backgroundColor: colors.greyScale.moreLighter,
    marginBottom: '75px',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      marginBottom: '20px',
    },
  },
  directoriesContent: {
    padding: '80px 64px 64px',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      padding: '64px',
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '32px 20px 20px'
    },
  },
  directoriesHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directoriesLinkWrapper: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },
  directoriesCardsContainer: {
    marginTop: '20px',
    flexWrap: 'no-wrap',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap'
    },
  },
  directoriesCardsGridItem: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      width: '50%',
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '70%'
    }
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
  joinControllerItem: {
    left: 'auto',
    right: '-12px'
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
  joinControllerButton: {
    textAlign: 'end',
    whiteSpace: 'nowrap'
  },
  joinSliderControllers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
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
  joinControllerLine: {
    marginRight: '0',
    marginLeft: '12px'
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
    padding: '120px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '40px 0'
    },
  },
  builtByContentImage: {
    width: '100%'
  },
});

const animation = {
  fadeInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  }
};

function Home(props) {
  const classes = styles();
  const trustClasses = trustStyles();
  const [searchValue, setSearchValue] = useState('');
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [sensor, setSensorState] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const {directories} = props;
  const dirType = history.location.state && history.location.state.dirType;

  useEffect(() => {
    if (dirType) props.fetchSearchOrganizationsByType({ type: dirType, page: 1, per_page: 12 })
  }, [dirType]); // eslint-disable-line react-hooks/exhaustive-deps

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

  function SliderAnimatedImage(props) {
    const image = <img src={props.image} style={animation.fadeInUp} alt={'illustration'} className={classes.carouselImage}/>;

    return (
      <StyleRoot>
        {image}
      </StyleRoot>
    )
  }

  const carouselWheelEvent = (isVisible) => {
    const listener = throttle((event => handleWheelEvent(event)), 1200);
    const handleWheelEvent = (event) => {
      let scrollValue = event.deltaY;
      console.log(scrollValue);

      if (scrollValue > 1) {
        setActiveSlide(prevState => {
          if(prevState === 2) {
            setSensorState(false);
            document.body.style.overflow = 'auto';
            document.removeEventListener('wheel', listener);
            return prevState;
          } else {
            return prevState + 1;
          }
        });
      } else {
        setActiveSlide(prevState => {
          if(prevState === 0) {
            return prevState;
          } else {
            return prevState - 1;
          }
        });
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('wheel', listener);
    }
  };

  const sliderControllers = [
    'sign up',
    'validate info',
    'choose directory'
  ];

  const sliderImages = [CarouselSignUpIllustration, CarouselValidateIllustration, CarouselDirectoryIllustration];

  const handleSlideChange = (e) => {
    setActiveSlide(e.target ? sliderControllers.indexOf(e.target.innerHTML) : e );
  };

  const renderSliderControllers = () => {
    const controllers = sliderControllers.map((item, index) => {
      return (
        <li className={activeSlide === index ? classes.activeController : [classes.controllerItem, classes.joinControllerItem].join(' ')}
            key={index.toString()} style={{ margin: '8px 0' }}>
          <button
            className={[classes.controllerButton, classes.joinControllerButton].join(' ')}
            onClick={handleSlideChange}
          >
            {item}
          </button>
          <span className={[classes.controllerLine, classes.joinControllerLine].join(' ')}/>
        </li>
      )
    });

      return (
        <ul className={classes.joinSliderControllers}>{controllers}</ul>
      )
  };

  return (
    <div>
      {/* ================================================ BLOCK 01: Search =================================================*/}
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
              Find trusted partners for your business
            </Typography>
              <div className={classes.subtitleWrapper}>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                  Arbor has created an efficient alternative to lengthy and expensive <Typography variant={'inherit'} noWrap>Know-Your-Business</Typography> (KYB) processes.
                  Search for verified organizations across various industries and get
                  discovered by potential partners.
                </Typography>
              </div>
              <div className={classes.searchForm}>
                <SearchComponent searchValue={searchValue} handleSearchValue={handleSearch}
                                 fetchSearchResult={() => history.push('search', {request: searchValue})}/>
              </div>
            </Grid>{/*left*/}
          </Grid>
        </Container>
      </div>
      {/* ================================================ BLOCK 02: KYB =================================================*/}
      <Container>
        <Grid container spacing={5}  justify={'space-around'} alignItems={'center'} className={classes.kybChecksContent} >
            <Grid item xs={12} md={6}>
              <div className={classes.kybChecksImageWrapper}>
                <img src={WhatIfIllustration} alt={'illustration'} className={classes.kybChecksIllustration}/>
              </div>
            </Grid>{/*left*/}

            <Grid item xs={12} md={6} className={classes.kybChecksTextContainer}>
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
          </Grid>{/*right*/}
        </Grid>
      </Container>
      {/* ================================================ BLOCK 03: Slider  =================================================*/}
      <VizSensor onChange={carouselWheelEvent} minTopValue={300} active={sensor}>
        <div className={classes.joinContainer} id='slider'>
          <Container>
            <div className={classes.contentWrapper}>
              <Grid container spacing={5} direction="row-reverse" justify={'space-between'} alignItems={'center'}>
                <Grid item xm={12} md={6} container justify={'space-between'} alignItems={'center'} className={classes.joinSliderContainer}>
                  <Grid item xm={12} md={6}>
                    <div className={classes.joinSliderBase}>
                      <div className={classes.joinSliderBaseHeader}>
                        <Logo viewBox={'0 0 90 32'} className={classes.joinSliderBaseLogo}/>
                        <HomeIcon width={'16px'} height={'16px'} viewBox={'0 0 16 16'} className={classes.joinSliderBaseHomeIcon}/>
                      </div>
                      <div className={classes.joinSliderBaseLine}/>
                      <div className={classes.carouselWrapper}>
                        <Hidden mdDown>
                          <SliderAnimatedImage image={sliderImages[activeSlide]}/>
                        </Hidden>
                        <Hidden lgUp>
                          <img src={CarouselDirectoryIllustration} alt={'illustration'} className={classes.carouselImage}/>
                        </Hidden>
                      </div>
                    </div>
                  </Grid>
                  <Grid item className={classes.joinSliderControllersContainer}>
                    {
                      renderSliderControllers()
                    }
                  </Grid>
                </Grid>
                <Grid item xm={12} md={6} className={classes.joinTextContainer}>
                  <div className={classes.blockTitleWrapper}>
                    <Typography variant={'h3'} className={classes.blockTitle}>
                      Join the registry of
                      trusted organizations
                    </Typography>
                    <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                      Find new partners for your business and get discovered by potential clients.
                    </Typography>
                    <ul style={{marginTop: '42px'}}>
                      <li className={trustClasses.howTextListItem}>
                        <span className={trustClasses.howListDot}/>
                        <Typography className={trustClasses.howListTexts}>
                          Register your organization and get a unique identifier
                        </Typography>
                      </li>
                      <li><img className={trustClasses.howListPlaceholder} src={listPlaceholderSvg} alt={"|"}/></li>
                      <li className={trustClasses.howTextListItem}><span
                        className={trustClasses.howListDot}/>
                        <Typography className={trustClasses.howListTexts}>
                          Add information on your business activities
                        </Typography>
                      </li>
                      <li><img className={trustClasses.howListPlaceholder} src={listPlaceholderSvg} alt={"|"}/></li>
                      <li className={trustClasses.howTextListItem}>
                        <span className={trustClasses.howListDot}/>
                        <Typography
                          className={trustClasses.howListTexts}>
                          Verify your data to gain
                          <Link className={classes.trustLink} to={'/trust/general'}> trust points</Link>
                        </Typography>
                      </li>
                      <li><img className={trustClasses.howListPlaceholder} src={listPlaceholderSvg} alt={"|"}/></li>
                      <li className={trustClasses.howTextListItem}>
                        <span className={trustClasses.howListDot}/>
                        <Typography className={trustClasses.howListTexts}>
                          Join one of the directories to be easily found
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </VizSensor>
      {/* ================================================   GRID   =================================================*/}
      {/*<Container>
        <Grid container spacing={5}>
          <Grid item xs={1}><div className={classes.bgRed}>1</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>2</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>3</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>4</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>5</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>6</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>7</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>8</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>9</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>10</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>11</div></Grid>
          <Grid item xs={1}><div className={classes.bgRed}>12</div></Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}><div className={classes.bgRed}>1</div></Grid>
          <Grid item xs={12} md={6}><div className={classes.bgRed}>2</div></Grid>
        </Grid>
      </Container>*/}
      {/* ================================================ BLOCK 04: We works =================================================*/}
      <Container>
        <div className={classes.contentWrapper}>
          <Grid container spacing={5} direction="row-reverse" justify={'space-between'} alignItems={'center'}>
            <Grid item xs={12} md={6} >
              <Typography variant={'h3'} className={classes.blockTitle}>We work with industry leaders
              </Typography>
              <Typography variant={'subtitle1'} className={classes.blockSubtitle}>
                Large multinational companies join Arbor community to optimize their due diligence
                processes and get exposed to prospective clients.</Typography>
            </Grid>
            <Grid item xs={12} md={6} container spacing={2} >
              {
                [AirFinanceImage, ERevMaxImage, NordicImage, MachefertImage].map((src, index) => (
                  <Grid item xs={6} className={classes.partnerCardContainer} key={index}>
                    <Card className={classes.partnerCard}>
                      <img className={classes.partnerCardImage} src={src} alt={'partner'}/>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* ================================================ BLOCK 05: Directories =================================================*/}
      <Container>
        <div className={classes.directoriesWrapper}>
          <div className={classes.directoriesContent}>
            <div className={classes.directoriesHeading}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Directories we work with
              </Typography>
              <Box className={classes.directoriesLinkWrapper}>
                <Link to={'/directories'} className={classes.navLinkToDirectories} >
                  Explore directories <ArrowLongIcon viewbow={'0 0 24 12'} className={classes.navLinkIcon}/>
                </Link>
              </Box>
            </div>
            <CardsGridList justify={'space-between'} alignItems={'flex-start'} className={classes.directoriesCardsContainer}>
              {
                directories.map((item, index) => {
                  return (
                    <Grid item lg={3} sm={6} xs={12} key={index.toString()} className={classes.directoriesCardsGridItem}>
                      <DirectoryCard
                        homeLayout={true}
                        directoryName={item.name}
                        directoryImage={item.image}
                        handleSearchByType={() => props.fetchSearchOrganizationsByType({ type: item.searchReq, page: 1, per_page: 12 })}
                      />
                    </Grid>
                  )
                })
              }
            </CardsGridList>
          </div>
        </div>
      </Container>
      {/* ================================================ BLOCK 06: Use cases =================================================*/}
      <Container hidden={true}>
        <div className={classes.contentWrapper}>
          <Grid container spacing={5} justify={'space-between'} alignItems={'center'}>
            <Grid item xs={12} md={6} className={classes.useCasesInfoContainer}>
              <div>
                <Typography variant={'h3'} className={classes.blockTitle}>Use cases</Typography>
                <Typography variant={'subtitle1'} className={classes.blockSubtitle}>Take a look how
                  other businesses use Arbor to work with each other.</Typography>
              </div>
              <div>
                {renderUseCasesControllers()}
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.useCasesCardContainer}>
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
      {/* ================================================ BLOCK 07: Built by =================================================*/}
      <div className={classes.builtByContainer}>
        <Container>
          <div className={classes.builtByContent}>
            <Grid container spacing={5} justify={'space-between'} alignItems={'center'}>
              <Grid item xs={12} md={6} style={{width: '45%'}}>
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
                  Organizations of any size and from any industry can voluntarily join Arbor community
                  and get in contact with other members.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{width: '50%'}}>
                <img className={classes.builtByContentImage} src={BuiltByIllustration} alt={'illustration'}/>
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
      image: HotelIllustration,
      searchReq: 'hotel'
    },
    {
      name: 'airlines',
      image: AirlineIllustration,
      searchReq: 'airline'
    },
    {
      name: 'insurance',
      image: InsuranceIllustration,
      searchReq: 'insurance'
    },
    {
      name: 'travel-agencies',
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
