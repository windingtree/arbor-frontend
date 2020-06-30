import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import history from '../redux/history';
import { Container, Grid, Typography, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
//actions and selectors
import {
  fetchSearchOrganizations,
  fetchAllOrganizations,
  isFetchedSelector,
  isFetchingSelector,
  metaSelector,
  itemsSelector
} from '../ducks/fetchSearchResults';
//components
import CardsGridList from '../components/CardsGridList';
import OrgsGridItem from '../components/OrgsGridItem';
import SearchComponent from '../components/SearchComponent';
import Pagination from '../components/Pagination';
//icons and illustrations
import SearchIllustration from '../assets/SvgComponents/search-illustration.svg';
import SearchNoResultsIllustration from '../assets/SvgComponents/search-no-result-illustration.svg';
//styles
import colors from '../styles/colors';
import {countries} from '../utils/countries';

const styles = makeStyles({
  searchHeaderWrapper: {
    backgroundColor: colors.greyScale.moreLighter,
    width: '100%',
  },
  searchHeaderWrapperNoResults: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  searchHeader: {
    position: 'relative',
    paddingTop: '60px',
    paddingBottom: '60px',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '0'
    },
  },
  searchTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest
  },
  searchForm: {
    position: 'relative',
    width: '70%',
    marginTop: '28px',
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    },
  },
  illustrationWrapper: {
    position: 'absolute',
    bottom: '-40px',
    right: '0',
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      position: 'relative',
      bottom: 'auto',
      right: 'auto',
      top: '40px'
    },
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      top: '20px'
    },
  },
  illustration: {
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'block',
      width: '80%'
    },
  },
  filtersContainer: {
    paddingTop: '40px',
  },
  filtersContainerTitle: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.greyScale.darkest
  },
  filtersControllersWrapper: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      flexWrap: 'wrap'
    },
  },
  filtersController: {
    width: '48%',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      marginBottom: '12px',
      '&:last-child': {
        marginBottom: '0'
      }
    },
  },
  selectFormControl: {
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
  gridListWrapper: {
    paddingTop: '40px',
  },
  paginationInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px 0',
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
    color: colors.greyScale.dark
  },
});

function Search(props) {
  const classes = styles();
  const request = history.location.state && history.location.state.request;
  const [searchValue, setSearchValue] = useState('');
  const [forcePage, setForcePage] = useState(undefined);
  const [lastSearchValue, setLastSearchValue] = useState('');
  const [directoryFilterValue, setDirectoryFilterValue] = useState('');
  const [countryFilterValue, setCountryFilterValue] = useState('');
  const {items, meta: {page, per_page, total, pages}, isFetched, isFetching, 
  fetchSearchOrganizations, fetchAllOrganizations} = props;

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

  //handle pagination
  const handlePageClick = async (data) => {
    let selected = data.selected;
    const searchData = {
      directory: directoryFilterValue,
      country: countryFilterValue,
      name: searchValue,
      page: selected + 1
    };

    if (searchValue === "" && !request) {
      await props.fetchAllOrganizations({page: selected + 1, per_page: per_page});
      setLastSearchValue('');
    } else {
      await props.fetchSearchOrganizations(searchData);
      setLastSearchValue(searchValue);
    }
  };

  //handle search
  const searchTitle = () => {

    let searchTitle;
    // No Search initiated
    if(!isFetched && !isFetching) {
      searchTitle = 'Organization Search';
    }

    // Search results
    else if(isFetched) {
      // Define the organization category
      let orgDirectory = directoryFilterValue ? options.directories[directoryFilterValue] : 'Organizations';
      
      // Write directory in singular to be gramatically correct
      if(total === 1) {
        // `ies` -> `y`
        if(orgDirectory.substring(orgDirectory.length-3, orgDirectory.length) === 'ies') {
          orgDirectory = orgDirectory.substring(0, orgDirectory.length-3) + 'y';
        }
        
        // Remove final `s`
        else {
          orgDirectory = orgDirectory.substring(0, orgDirectory.length -1);
        }        
      }
      let orgCountry = countryFilterValue ? ` in ${options.countries[countryFilterValue]}` : '';

      // Search completed without results
      if(total === 0) {
        if (lastSearchValue && lastSearchValue !== "") {
          searchTitle = `Sorry, we haven’t found any ${orgDirectory} related to "${lastSearchValue}"${orgCountry}`;
        } else {
          searchTitle = `Sorry, we haven’t found any ${orgDirectory}${orgCountry}`;
        }
      }

      // Search completed with results
      else {
        // Criteria where provided for the search
        if (lastSearchValue && lastSearchValue !== "") {
          searchTitle = `${total} ${orgDirectory} matching "${lastSearchValue}"${orgCountry}`;
        }

        // No criteria provided - eg main search page
        else {
          searchTitle = 'Organization Search';
        }
      }
    }

    // Search is ongoing
    else if(isFetching) {
      searchTitle = `Searching...`;
    }

    // Store search title in state
    return(searchTitle);
  };

  const handleSearch = event => {
    setSearchValue(event.target.value);
  };

  const fetchSearchResults = async () => {
    // BUild data for the request
    const data = {
      directory: directoryFilterValue,
      country: countryFilterValue,
      name: searchValue,
      page: 1,
      per_page: per_page
    };

    if (searchValue === "" && !request) {
      if (data.directory !== '' || data.country !== '') {
        await props.fetchSearchOrganizations(data);
        setForcePage(0);
      } else {
        await props.fetchAllOrganizations({page: page, per_page: per_page});
        setForcePage(0);
      }
    } else {
      await props.fetchSearchOrganizations(data);
      setForcePage(0);
      setLastSearchValue(searchValue);
    }

  };

  useEffect(() => {
    setSearchValue(request);
    setLastSearchValue(request);
    if (request && request !== "") {
      fetchSearchOrganizations({name: request, page: page, per_page: per_page});
    } else fetchAllOrganizations({page: page, per_page: per_page});
  }, [request, page, per_page, fetchSearchOrganizations, fetchAllOrganizations]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleFocus = () => {
    // Delete the current search
    setSearchValue('');
  };

  //handle select fields
  const options = {
    directories: {
      'hotel': 'Hotels',
      'airline': 'Airlines',
      'insurance': 'Insurance Companies',
      'ota': 'Travel Agencies'
    },
    countries
  };

  const handleDirectoryFilterValueChange = async e => {
    const data = {
      directory: e.target.value,
      country: countryFilterValue,
      name: searchValue,
      page: 1,
      per_page: per_page
    };
    await props.fetchSearchOrganizations(data);
    setForcePage(0);
    setDirectoryFilterValue(data.directory);
  };

  const handleCountryFilterValueChange = async e => {
    const data = {
      directory: directoryFilterValue,
      country: e.target.value,
      name: searchValue,
      page: 1,
      per_page: per_page
    };
    await props.fetchSearchOrganizations(data);
    setForcePage(0);
    setCountryFilterValue(data.country);
  };

  const renderResultsText = () => {
    let firstValue, lastValue;
      firstValue = page === 1 ? '1' : ((page-1)*per_page)+1;
    lastValue = total < page*per_page ? total : page*per_page;
    return `Showing ${firstValue}-${lastValue} of ${total} results`
  };

  return (
    <div>
      <div
        className={total === 0 ? [classes.searchHeaderWrapper, classes.searchHeaderWrapperNoResults].join(' ') : classes.searchHeaderWrapper}>
        <Container className={classes.searchHeader}>
          <div>
            <Typography variant={'h2'} className={classes.searchTitle}>
              { searchTitle() }
            </Typography>
            <div className={classes.searchForm}>
              <SearchComponent
                searchValue={searchValue}
                handleSearchValue={handleSearch}
                fetchSearchResult={fetchSearchResults}
                handleFocus={handleFocus}
              />
            </div>
          </div>
          <div className={classes.illustrationWrapper}>
            <img src={total === 0 ? SearchNoResultsIllustration : SearchIllustration} className={classes.illustration}
                 alt={'illustration'}/>
          </div>
        </Container>
      </div>
        <Container>
          <div className={classes.filtersContainer}>
            <Typography variant={'subtitle2'} className={classes.filtersContainerTitle}>
              Filter organizations by
            </Typography>
            <div className={classes.filtersControllersWrapper}>
              <div className={classes.filtersController}>
                <FormControl className={classes.selectFormControl}>
                  <InputLabel>Directories</InputLabel>
                  <Select
                    value={directoryFilterValue}
                    onChange={handleDirectoryFilterValueChange}
                  >
                    <MenuItem value={''}>All</MenuItem>
                    {
                      _.map(options.directories, (name, value) => {
                        return (
                          <MenuItem key={value.toString()} value={value}>{name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div className={classes.filtersController}>
                <FormControl className={classes.selectFormControl}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={countryFilterValue}
                    onChange={handleCountryFilterValueChange}
                  >
                    <MenuItem value={''}>All</MenuItem>
                    {
                      _.map(options.countries, (name, value) => {
                        return (
                          <MenuItem key={value.toString()} value={value}>{name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          {
            total !== 0 ? (
              <div className={classes.gridListWrapper}>
                <CardsList/>
                {
                  total > per_page ? (
                    <div className={classes.paginationInfoContainer}>
                      <div className={classes.totalSearchTitleContainer}>
                        <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>
                          {renderResultsText()}</Typography>
                      </div>
                      <div>
                        <Pagination
                          pageCount={pages}
                          onPageChange={handlePageClick}
                          forcePage={forcePage}
                        />
                      </div>
                    </div>
                  ) : null
                }
              </div>
            ) : null
          }
        </Container>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    items: itemsSelector(state),
    meta: metaSelector(state),
    isFetching: isFetchingSelector(state),
    isFetched: isFetchedSelector(state)
  }
};

const mapDispatchToProps = {
  fetchSearchOrganizations,
  fetchAllOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
