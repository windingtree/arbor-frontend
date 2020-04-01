import React, {useEffect} from 'react';
import history from '../redux/history';
import { connect } from 'react-redux';
import { Container, Typography, Grid, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchSearchOrganizationsByType,
  itemsSelector,
  metaSelector
} from '../ducks/fetchSearchResults';
//Components
import DirectoryCard from '../components/DirectoryCardItem';
import CardsGridList from '../components/CardsGridList';
//illustrations
import HotelIllustration from '../assets/SvgComponents/hotel-illustration.svg';
import AirlineIllustration from '../assets/SvgComponents/plane-illustration.svg';
import InsuranceIllustration from '../assets/SvgComponents/Insurance-illustration.svg';
import TravelIllustration from '../assets/SvgComponents/travel-illustration.svg';

import colors from '../styles/colors';

const styles = makeStyles({
  content: {
    padding: '64px 0',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '88px'
    },
  },
  title: {
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: 1.14,
    color: colors.greyScale.darkest
  },
  cardsContainer: {
    marginTop: '44px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '20px'
    },
  },
  addDirectoryContainer: {
    position: 'relative',
    borderRadius: '6px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    marginTop: '40px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      boxShadow: 'none'
    },
  },
  addDirectoryContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 47px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap',
      padding: '0'
    },
  },
  addDirectoryTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
  },
  addDirectoryTitleMobile: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '17px',
      paddingBottom: '20px'
    },
  },
  addDirectoryButtonWrapper: {
    backgroundImage: colors.gradients.green,
    borderRadius: '8px',
    border: `1px solid ${colors.secondary.cyan}`,
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    },

  },
  addDirectoryButton: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    },
  },
  addDirectoryButtonTitle: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px',
  }
});

function Directories(props){
  const classes = styles();
  const { directories }  = props;
  const dirType = history.location.state && history.location.state.dirType;

  useEffect(() => {
    if (dirType) props.fetchSearchOrganizationsByType({ type: dirType, page: 1, per_page: 12 })
  }, [dirType]); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
      window.scrollTo(0, 0)
  }, []);

  return (
    <Container>
      <div className={classes.content}>
        <div>
          <Typography variant={'h1'} className={classes.title}>Directories</Typography>
        </div>
        <div className={classes.cardsContainer}>
          <CardsGridList spacing={2} justify={'space-between'} alignItems={'flex-start'}>
            {
              directories.map((item, index) => {
                return (
                  <Grid item lg={3} sm={6} xs={12} key={index.toString()}>
                    <DirectoryCard
                      directoryName={item.name}
                      directoryImage={item.image}
                      directorySearchReq={item.searchReq}
                      handleSearchByType={() => props.fetchSearchOrganizationsByType({ type: item.searchReq, page: 1, per_page: 12 })}
                    />
                  </Grid>
                )
              })
            }
          </CardsGridList>
        </div>
        <div className={classes.addDirectoryContainer}>
          <div className={classes.addDirectoryContent}>
            <div className={classes.addDirectoryTitleWrapper}>
              <Hidden mdDown>
                <Typography variant={'h3'} className={classes.addDirectoryTitle}>None of these directories is relevant to your organization?</Typography>
              </Hidden>
              <Hidden lgUp>
                <Typography variant={'h3'} className={[classes.addDirectoryTitle, classes.addDirectoryTitleMobile].join(' ')}>Need new segments?</Typography>
              </Hidden>
            </div>
            <div className={classes.addDirectoryButtonWrapper}>
              <Button onClick={() => window.location = "mailto:propose@windingtree.com"} className={classes.addDirectoryButton}>
                <Typography variant={'inherit'} className={classes.addDirectoryButtonTitle} noWrap={true}>Propose a new directory</Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    items: itemsSelector(state),
    meta: metaSelector(state)
  }
};

const mapDispatchToProps = {
  fetchSearchOrganizationsByType
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);

Directories.defaultProps = {
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
      name: 'insurance companies',
      image: InsuranceIllustration,
      searchReq: 'insurance'
    },
    {
      name: 'travel agencies',
      image: TravelIllustration,
      searchReq: 'ota'
    },
  ]
};
