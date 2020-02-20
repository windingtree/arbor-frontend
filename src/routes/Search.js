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
import {countries} from './Wizard/config/countries';

const styles = makeStyles({
  searchHeaderWrapper: {
    backgroundColor: colors.greyScale.moreLighter,
    width: '100%'
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
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
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
    },
  },
  selectFormControl: {
    width: '100%',
    '& > .MuiInputBase-root': {
      padding: '8px 0'
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
  const {items, meta: {page, per_page, total, pages}, isFetched, isFetching} = props;

  const CardsList = () => {
    let OrgCards = items.map((item, index) => {
      let parentName;
      let parentTrustLevel;
      if (item.parent !== null) {
        parentName = item.parent.name;
        parentTrustLevel = item.parent.proofsQty
      } else {
        parentName = null;
        parentTrustLevel = null;
      }
      return (
        <Grid lg={3} sm={4} xs={12} item key={index.toString()}>
          <OrgsGridItem
            orgid={item.orgid}
            img={item.avatar}
            isSub={!!item.parent}
            orgidType={item.orgidType}
            proofsQty={item.proofsQty}
            name={item.name}
            parent={item.parent}
            subs={item.subsidiaries}
            entityName={parentName}
            entityTrustLevel={parentTrustLevel}
          />
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
      orgidType: directoryFilterValue,
      country: countryFilterValue,
      name: searchValue,
      page: selected + 1
    };

    if (searchValue === "" && !request) {
      await props.fetchAllOrganizations({page: selected + 1, per_page: per_page});
    } else {
      await props.fetchSearchOrganizations(searchData);
      setLastSearchValue(searchValue)
    }
  };

  //handle search
  const searchTitle = () => {
    if (!lastSearchValue || lastSearchValue === "") {
      return 'Search for ORG.ID'
    } else if (total === 0 && isFetched) {
      return `Sorry, can’t find anything for "${lastSearchValue}"`
    } else {
      if (isFetching) return `Searching...`;
      return `${total} search results for "${lastSearchValue}"`
    }
  };

  const handleSearch = event => {
    setSearchValue(event.target.value);
  };

  const handleSearchFromHome = () => {
    setSearchValue(request);
    setLastSearchValue(request);
  };

  const fetchSearchResults = async () => {
    const data = {
      orgidType: directoryFilterValue,
      country: countryFilterValue,
      name: searchValue,
      page: 1,
      per_page: per_page
    };

    if (searchValue === "" && !request) {
      await props.fetchAllOrganizations({page: page, per_page: per_page});
      if (data.orgidType !== '' || data.country !== '') {
        await props.fetchSearchOrganizations(data);
        setForcePage(0);
      }
    } else {
      await props.fetchSearchOrganizations(data);
      setForcePage(0);
      setLastSearchValue(searchValue);
    }
  };


  useEffect(() => {
    handleSearchFromHome();
    if (request && request !== "") {
      props.fetchSearchOrganizations({name: request, page: page, per_page: per_page});
    } else props.fetchAllOrganizations({page: page, per_page: per_page});
  }, [request]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  //handle clear search fields
  const clearSearchFields = () => {
    setSearchValue('');
    setDirectoryFilterValue('');
    setCountryFilterValue('');
  };

  //handle select fields
  const options = {
      directories: {
        'hotel': 'Hotels',
        'airline': 'Airlines',
        'insurance': 'Insurance',
        'ota': 'Travel agencies'
      },
      countries
  };

  const handleDirectoryFilterValueChange = async e => {
    const data = {
      orgidType: e.target.value,
      country: countryFilterValue,
      name: searchValue,
      page: 1,
      per_page: per_page
    };
    await props.fetchSearchOrganizations(data);
    setForcePage(0);

    setDirectoryFilterValue(data.orgidType);
  };

  const handleCountryFilterValueChange = async e => {
    const data = {
      orgidType: directoryFilterValue,
      country: e.target.value,
      name: searchValue,
      page: 1,
      per_page: per_page
    };
    await props.fetchSearchOrganizations(data);
    setForcePage(0);

    setCountryFilterValue(data.country);
  };

  return (
    <div>
      <div
        className={total === 0 ? [classes.searchHeaderWrapper, classes.searchHeaderWrapperNoResults].join(' ') : classes.searchHeaderWrapper}>
        <Container className={classes.searchHeader}>
          <div>
            <Typography variant={'h2'} className={classes.searchTitle}>
              {searchTitle()}
            </Typography>
            <div className={classes.searchForm}>
              <SearchComponent
                searchValue={searchValue}
                handleSearchValue={handleSearch}
                fetchSearchResult={fetchSearchResults}
                handleFocus={clearSearchFields}
              />
            </div>
          </div>
          <div className={classes.illustrationWrapper}>
            <img src={total === 0 ? SearchNoResultsIllustration : SearchIllustration} className={classes.illustration}
                 alt={'illustration'}/>
          </div>
        </Container>
      </div>
      {
        total !== 0 ? (
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
            <div className={classes.gridListWrapper}>
              <CardsList/>
              {
                total > per_page ? (
                  <div className={classes.paginationInfoContainer}>
                    <div className={classes.totalSearchTitleContainer}>
                      <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>
                        Search results: {total}</Typography>
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
          </Container>
        ) : null
      }
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
