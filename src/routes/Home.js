import React, { useState } from "react";
import history from '../redux/history';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//components
import SearchComponent from '../components/SearchComponent';
//icons && illustrations
import HomeSearchIllustration from '../assets/SvgComponents/home-search-illustration.svg';
import WhatIfIllustration from '../assets/SvgComponents/what-if-illust.svg';
//styles && colors
import colors from '../styles/colors';
import { green } from '@material-ui/core/colors';

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
  kybChecksTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    paddingBottom: '20px'
  },
  kybChecksSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: colors.greyScale.dark
  },
});

function Home() {
  const classes = styles();
  const [searchValue, setSearchValue] = useState('');


  const handleSearch = event => {
    setSearchValue(event.target.value);
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
              <Typography variant={'h3'} className={classes.kybChecksTitle}>
                Simplify routine KYB checks
              </Typography>
              <Typography variant={'subtitle2'} className={classes.kybChecksSubtitle}>
                Every organization in Arbor database has been validated via a secure process. It is transparent, decentralized and free of charge. Look for organizations across various industries in our database or join the community and get discovered by potential clients and partners.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Home;
