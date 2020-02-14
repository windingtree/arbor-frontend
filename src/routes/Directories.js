import React from 'react';
import { connect } from 'react-redux';
import { Container, Typography, Grid, Button } from '@material-ui/core';
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
    padding: '64px 0'
  },
  title: {
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: 1.14,
    color: colors.greyScale.darkest
  },
  cardsContainer: {
    marginTop: '44px',
  },
  addDirectoryContainer: {
    position: 'relative',
    borderRadius: '6px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    marginTop: '40px',
  },
  addDirectoryContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 47px',
  },
  addDirectoryTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
  },
  addDirectoryButtonWrapper: {
    backgroundImage: colors.gradients.green,
    borderRadius: '8px',
    border: `1px solid ${colors.secondary.cyan}`
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
  const { items, meta: {page, per_page, total, pages}, isFetched, directories }  = props;

  return (
    <Container>
      <div className={classes.content}>
        <div>
          <Typography variant={'h1'} className={classes.title}>Directories</Typography>
        </div>
        <div className={classes.cardsContainer}>
          <CardsGridList justify={'space-between'} alignItems={'flex-start'}>
            {
              directories.map((item, index) => {
                return (
                  <Grid item key={index.toString()} style={{ width: '262px' }}>
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
              <Typography variant={'h3'} className={classes.addDirectoryTitle}>Your directory is missing? Let’s add it!</Typography>
            </div>
            <div className={classes.addDirectoryButtonWrapper}>
              <Button onClick={() => null}>
                <Typography variant={'inherit'} className={classes.addDirectoryButtonTitle}>Propose a new directory</Typography>
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
      name: 'insurance',
      image: InsuranceIllustration,
      searchReq: 'insurance'
    },
    {
      name: 'travel-agencies',
      image: TravelIllustration,
      searchReq: 'travel-agencies'
    },
  ]
};