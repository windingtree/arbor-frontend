import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import history from '../redux/history';
import { Container, Grid, Typography, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import queryString from 'query-string';
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
    paddingTop: '30px',
    paddingBottom: '60px'
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
  emptyResults: {
    minHeight: '383px'
  }
});

function Search(props) {
  const classes = styles();
  const search = history.location.search;
  const [searchValue, setSearchValue] = useState('');
  const [searchDirectory, setSearchDirectory] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [lastSearchValue, setLastSearchValue] = useState('');
  const {items, meta: {page, per_page, total, pages}, isFetched, isFetching,
  fetchSearchOrganizations, fetchAllOrganizations} = props;

  const options = {
    directories: {
      'hotel': 'Hotels',
      'airline': 'Airlines',
      'insurance': 'Insurance Companies',
      'ota': 'Travel Agencies'
    },
    countries
  };

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

  //handle search
  const searchTitle = () => {

    let searchTitle;
    // No Search initiated
    if (!isFetched && !isFetching) {
      searchTitle = 'Organization Search';
    }

    // Search results
    else if (isFetched) {
      // Define the organization category
      let orgDirectory = searchDirectory ? options.directories[searchDirectory] : 'Organizations';

      // Write directory in singular to be gramatically correct
      if (total === 1) {
        // `ies` -> `y`
        if(orgDirectory.substring(orgDirectory.length-3, orgDirectory.length) === 'ies') {
          orgDirectory = orgDirectory.substring(0, orgDirectory.length-3) + 'y';
        }

        // Remove final `s`
        else {
          orgDirectory = orgDirectory.substring(0, orgDirectory.length -1);
        }
      }
      let orgCountry = searchCountry ? ` in ${options.countries[searchCountry]}` : '';

      // Search completed without results
      if (total === 0) {
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
    else if (isFetching) {
      searchTitle = `Searching...`;
    }

    // Store search title in state
    return (searchTitle);
  };

  useEffect(() => {
    const query = queryString.parse(search);
    const searchData = {
      directory: query.directory || '',
      country: query.country || '',
      name: query.name || '',
      page: query.page ? parseInt(query.page) : 1,
      'per_page': query['per_page'] ? query['per_page'] : per_page
    };

    setSearchPage(searchData.page);
    setSearchValue(searchData.name);
    setSearchDirectory(searchData.directory);
    setSearchCountry(searchData.country);

    const doSearch = async () => {
      try {
        if (searchData.name === "") {
          if (searchData.directory !== '' || searchData.country !== '') {
            await fetchSearchOrganizations(searchData);
          } else {
            await fetchAllOrganizations({page: searchData.page, per_page: per_page});
          }
        } else {
          await fetchSearchOrganizations(searchData);
          setLastSearchValue(searchData.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    doSearch();
  }, [search, per_page, fetchSearchOrganizations, fetchAllOrganizations]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleFocus = () => {
    // Delete the current search
    setSearchValue('');
  };

  const updateSearchQuery = data => {
    // delete data['per_page'];
    history.push(`/search?${queryString.stringify(data)}`);
  };

  const handleSearchValue = event => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    updateSearchQuery({
      directory: searchDirectory,
      country: searchCountry,
      name: searchValue,
      page: 1,
      per_page: per_page,
      key: Math.random().toString(36).substr(2, 9)
    });
  };

  const handleDirectoryFilterValueChange = e => {
    updateSearchQuery({
      directory: e.target.value,
      country: searchCountry,
      name: searchValue,
      page: 1,
      per_page: per_page
    });
  };

  const handleCountryFilterValueChange = e => {
    updateSearchQuery({
      directory: searchDirectory,
      country: e.target.value,
      name: searchValue,
      page: 1,
      per_page: per_page
    });
  };

  //handle pagination
  const handlePageClick = async ({ selected }) => {
    updateSearchQuery({
      directory: searchDirectory,
      country: searchCountry,
      name: searchValue,
      page: selected + 1,
      per_page: per_page
    });
  };

  const renderResultsText = () => {
    let firstValue, lastValue;
      firstValue = page === 1 ? '1' : ((page-1)*per_page)+1;
    lastValue = total < page*per_page ? total : page*per_page;
    return `Showing ${firstValue}-${lastValue} of ${total} results`
  };

  return (
    <div>
      <div className={classes.searchHeaderWrapper}>
        <Container className={classes.searchHeader}>
          <div>
            <Typography variant={'h2'} className={classes.searchTitle}>
              { searchTitle() }
            </Typography>
            <div className={classes.searchForm}>
              <SearchComponent
                searchValue={searchValue}
                handleSearchValue={handleSearchValue}
                fetchSearchResult={handleSearch}
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
                  <InputLabel>
                    {searchDirectory === '' ? 'Directories' : ''}
                  </InputLabel>
                  <Select
                    value={searchDirectory}
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
                  <InputLabel>
                    {searchCountry === '' ? 'Country' : ''}
                  </InputLabel>
                  <Select
                    value={searchCountry}
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
          {total !== 0 &&
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
                        forcePage={searchPage - 1}
                      />
                    </div>
                  </div>
                ) : null
              }
              {total <= per_page &&
                <div className={classes.paginationInfoContainer}>&nbsp;</div>
              }
            </div>
          }
          {total === 0 &&
            <div className={classes.emptyResults}>
              <div className={classes.paginationInfoContainer}>&nbsp;</div>
            </div>
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
