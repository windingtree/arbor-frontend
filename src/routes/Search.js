import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, TextField, InputAdornment, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
//actions
import {fetchAllOrganizations} from '../ducks/fetchOrganizations';
//Components and illustrations
import SearchIcon from '../assets/SvgComponents/SearchIcon';
import CardsGridList from '../components/CardsGridList';
import OrgsGridItem from '../components/OrgsGridItem';
import SearchIllustration from '../assets/SvgComponents/search-illustration.svg';
import SearchNoResultsIllustration from '../assets/SvgComponents/search-no-result-illustration.svg';
//styles
import colors from '../styles/colors';

const styles = makeStyles({
  searchHeaderWrapper: {
    backgroundColor: colors.greyScale.moreLighter,
    width: '100%'
  },
  searchHeaderWrapperNoResults: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchHeader: {
    position: 'relative',
    padding: '60px 0'
  },
  searchTitle: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.greyScale.darkest
  },
  searchForm: {
    position: 'relative',
    width: '70%',
    marginTop: '28px'
  },
  searchInputWrapper: {
    width: '70%',
  },
  searchInput: {
    position: 'relative',
    backgroundColor: colors.primary.white,
    borderRadius: '8px 8px 0 0',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  searchInputIcon: {
    width: '14px',
    height: '14px',
    color: colors.greyScale.common,
    transition: 'color .2s cubic-bezier(0.0, 0, 0.2, 1) 0ms'
  },
  searchButtonWrapper: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    zIndex: 2
  },
  searchButton: {
    backgroundImage: colors.gradients.green,
    border: `1px solid ${colors.secondary.cyan}`,
    borderRadius: '8px',
    textTransform: 'none',
    padding: '14px 26px'
  },
  searchButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  illustrationWrapper: {
    position: 'absolute',
    bottom: '-40px',
    right: '0'
  },
  gridListWrapper: {
    paddingTop: '40px'
  }
});

function Search(props) {
  const classes = styles();
  const [searchValue, setSearchValue] = useState('');
  const { organizations: { data, isFetched }, searchResults }  = props;

  const handleSearch = event => {
    setSearchValue(event.target.value);
  };

  const searchTitle = () => {
    if(!isFetched && searchResults.length === 0 || searchValue === '') {
      return 'Search for ORG.ID'
    } else if(isFetched && searchResults.length === 0) {
      return `Sorry, can’t find anything for "${searchValue}"`
    } else {
      return `${searchResults.length} search results for "${searchValue}"`
    }
  };

  return (
    <div>
      <div className={isFetched && searchResults.length === 0 ? [classes.searchHeaderWrapper, classes.searchHeaderWrapperNoResults].join(' ') : classes.searchHeaderWrapper}>
        <Container className={classes.searchHeader}>
          <div>
            <Typography variant={'h2'} className={classes.searchTitle}>
              {searchTitle()}
            </Typography>
            <div className={classes.searchForm}>
              <div className={classes.searchInputWrapper}>
                <TextField
                  id={'search-input'}
                  className={classes.searchInput}
                  placeholder={`Search by organization name or ORG.ID`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position={'start'}>
                        <SearchIcon className={classes.searchInputIcon} viewBox={'0 0 14 14'}/>
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                  value={searchValue}
                  onChange={handleSearch}
                />
              </div>
              <div className={classes.searchButtonWrapper}>
                <Button onClick={props.fetchAllOrganizations} className={classes.searchButton}>
                  <Typography variant={'inherit'} className={classes.searchButtonLabel} noWrap>Find organization</Typography>
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.illustrationWrapper}>
            <img src={isFetched && searchResults.length === 0 ? SearchNoResultsIllustration : SearchIllustration} alt={'illustration'}/>
          </div>
        </Container>
      </div>
      {
        isFetched ? searchResults.length !== 0 ? (
          <Container>
            <div className={classes.gridListWrapper}>
              <CardsGridList spacing={2} justify="flex-start" alignItems="flex-start">
                {
                  data.map((item, index) => (
                    <Grid item key={index.toString()} style={{ width: '264px' }}>
                      <OrgsGridItem
                        id={item.orgid}
                      />
                    </Grid>
                  ))
                }
              </CardsGridList>
            </div>
          </Container>
        ) : null: null
      }
    </div>
  );
}

Search.defaultProps = {
  searchResults: []
};

const mapStateToProps = state => {
  return {
    organizations: state.organizations
  }
};

const mapDispatchToProps = {
  fetchAllOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

