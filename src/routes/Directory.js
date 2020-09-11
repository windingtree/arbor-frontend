import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchSearchOrganizationsByType,
  fetchSearchOrganizations,
  isFetchedSelector,
  itemsSelector,
  metaSelector
} from '../ducks/fetchSearchResults';

import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import OrgsGridItem from '../components/OrgsGridItem';
import CardsGridList from '../components/CardsGridList';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '../components/Pagination';
import colors from '../styles/colors';
import history from '../redux/history';
import queryString from 'query-string';
import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import { countries } from '../utils/countries';
import _ from 'lodash';

const styles = makeStyles({
  screenHeader: {
    padding: '60px 0 20px 0'
  },
  buttonWrapper: {
    marginLeft: '-7px'
  },
  buttonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
  headingWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap',
    },
  },
  directoryTitle: {
    fontSize: '32px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  gridListWrapper: {
    paddingTop: '30px',
    paddingBottom: '60px'
  },
  filterWrapper: {
    width: '30%',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    },
  },
  selectControl: {
    width: '100%',
    '& > .MuiInputBase-root': {
      padding: '0'
    },
    '& > .MuiInputLabel-formControl': {
      transform: 'translate(0, 24px) scale(1)'
    },
    '& > .MuiInputLabel-shrink': {
      transform: 'translate(0, 4px) scale(0.75)'
    }
  },
  paginationInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px 0'
  },
  totalSearchTitleContainer: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    },
  },
  totalSearchResultsTitle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.dark,
    textTransform: 'capitalize'
  },
});

function Directory(props) {
  const classes = styles();
  const search = history.location.search;
  const { items, fetchSearchOrganizations, meta: { per_page, total, pages} }  = props;
  const { directory } = useParams();
  const [searchCountry, setSearchCountry] = useState('');
  const [searchPage, setSearchPage] = useState(1);

  const options = {
    countries
  };

  useEffect(() => {
    const query = queryString.parse(search);
    const searchData = {
      directory: directory || '',
      country: query.country || '',
      page: query.page ? parseInt(query.page) : 1,
      'per_page': query['per_page'] ? query['per_page'] : per_page
    };

    setSearchPage(searchData.page);
    setSearchCountry(searchData.country);

    const doSearch = async () => {
      try {
        await fetchSearchOrganizations(searchData);
      } catch (error) {
        console.log(error);
      }
    };

    doSearch();
  }, [search, directory, per_page, fetchSearchOrganizations]);

  const CardsList = () => {
    let OrgCards = items.map((item, index) => {
      return (
        <Grid lg={3} sm={4} xs={12} item key={index.toString()}>
          <OrgsGridItem organization={item}/>
        </Grid>
      )
    });

    return (
      <CardsGridList spacing={3} justify="flex-start" alignItems="flex-start">{OrgCards}</CardsGridList>
    )
  };

  const updateSearchQuery = data => {
    // delete data['per_page'];
    history.push(`/directories/${directory}?${queryString.stringify(data)}`);
  };

  const handlePageClick = async ({ selected }) => {
    updateSearchQuery({
      directory,
      country: searchCountry,
      page: selected + 1,
      per_page: per_page
    });
  };

  const handleCountryFilterValueChange = e => {
    updateSearchQuery({
      directory,
      country: e.target.value,
      page: 1,
      per_page: per_page
    });
  };

  const directoryTitle = () => {
    if(directory === 'ota') {
      return 'Travel agencies'
    } else if(directory === 'insurance') {
      return 'Insurance companies'
    } else {
      return `${directory.charAt(0).toUpperCase() + directory.slice(1)}s`;
    }
  };

  return (
    <div>
      <Container>
        <div className={classes.screenHeader}>
          <div className={classes.buttonWrapper}>
            <Button onClick={() => history.push('/directories')}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                Back to directories
              </Typography>
            </Button>
          </div>
        </div>
        <div className={classes.headingWrapper}>
          <div className={classes.titleWrapper}>
            <Typography variant={'h2'} className={classes.directoryTitle}>
              {directoryTitle()}
            </Typography>
          </div>
          <div className={classes.filterWrapper}>
            <FormControl className={classes.selectControl}>
              <InputLabel>
                {searchCountry === '' ? 'Country' : ''}
              </InputLabel>
              <Select
                value={searchCountry}
                onChange={handleCountryFilterValueChange}
              >
                <MenuItem value={''}>All</MenuItem>
                {
                  _.map(options.countries, ((name, value) => (
                    <MenuItem key={name} value={value}>{name}</MenuItem>)
                  ))
                }
              </Select>
            </FormControl>
          </div>
        </div>
      </Container>
      <Container>
        <div className={classes.gridListWrapper}>
          <CardsList />
          {
            total > per_page ? (
              <div className={classes.paginationInfoContainer}>
                <div className={classes.totalSearchTitleContainer}>
                  <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>ORG.ID in {props.match.params.directory + 's'}: {total}</Typography>
                </div>
                <div>
                  <Pagination
                    pageCount={pages}
                    onPageChange={handlePageClick}
                    forcePage={searchPage - 1}
                  />
                </div>
              </div>
            ) : null
          }
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: itemsSelector(state),
    meta: metaSelector(state),
    isFetched: isFetchedSelector(state)
  }
};

const mapDispatchToProps = {
  fetchSearchOrganizationsByType,
  fetchSearchOrganizations
};

export default connect( mapStateToProps, mapDispatchToProps)(Directory);
