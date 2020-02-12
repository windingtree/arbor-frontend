import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
//actions
import {fetchSearchOrganizations} from '../ducks/fetchOrganizations';
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
    paddingTop: '60px',
    paddingBottom: '60px',
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
  illustrationWrapper: {
    position: 'absolute',
    bottom: '-40px',
    right: '0'
  },
  gridListWrapper: {
    paddingTop: '40px'
  },
  paginationInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px 0'
  },
  totalSearchResultsTitle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.dark
  },
  paginationWrapper: {
    marginRight: '60px',
  },
});

function Search(props) {
  const classes = styles();
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const { searchResults: { data, pageCount, isFetched } }  = props;

  const handleSearch = event => {
    setSearchValue(event.target.value);
  };

  const searchTitle = () => {
    if(!isFetched && data.length === 0 || searchValue === '') {
      return 'Search for ORG.ID'
    } else if(isFetched && data.length === 0) {
      return `Sorry, can’t find anything for "${searchValue}"`
    } else {
      return `${data.length} search results for "${searchValue}"`
    }
  };

  //TODO rewrite THIS. Expect to fetch each chunk from server on pageChange
  let paginatedSearchResults = [];
  let arr = [];
  let arr2 = [];
  let arr3 = [];
  let arr4 = [];
  let arr5 = [];
  data.map(( item, index ) => {
    if ( index < 12 ) {
      arr.push(item);
    }
    if ( 12 <= index && index <= 23 ) {
      arr2.push(item);
    }
    if ( 24 <= index && index <= 35) {
      arr3.push(item);
    }
    if ( 36 <= index && index <= 47) {
      arr4.push(item);
    }
    if ( 48 <= index) {
      arr5.push(item);
    }
  });
  paginatedSearchResults.push(arr, arr2, arr3, arr4, arr5);

  const CardsList = () => {
    let OrgCards = paginatedSearchResults[pageIndex].map((item, index) => {
      return (
        <Grid item key={index.toString()} style={{ width: '264px' }}>
          <OrgsGridItem
            id={item.orgid}
          />
        </Grid>
      )
    });

    return (
      <CardsGridList spacing={4} justify="flex-start" alignItems="flex-start">{OrgCards}</CardsGridList>
    )
  };

  const handlePageClick = data => {
    let selected = data.selected;

    setPageIndex(selected);

    // useEffect(() => {
    //   setOffset(Math.ceil(selected * 12));
    //   props.fetchNextPage(offset);
    // });
  };

  return (
    <div>
      <div className={isFetched && paginatedSearchResults.length === 0 ? [classes.searchHeaderWrapper, classes.searchHeaderWrapperNoResults].join(' ') : classes.searchHeaderWrapper}>
        <Container className={classes.searchHeader}>
          <div>
            <Typography variant={'h2'} className={classes.searchTitle}>
              {searchTitle()}
            </Typography>
            <div className={classes.searchForm}>
              <SearchComponent searchValue={searchValue} handleSearchValue={handleSearch} fetchSearchResult={props.fetchSearchOrganizations}/>
            </div>
          </div>
          <div className={classes.illustrationWrapper}>
            <img src={isFetched && paginatedSearchResults.length === 0 ? SearchNoResultsIllustration : SearchIllustration} alt={'illustration'}/>
          </div>
        </Container>
      </div>
      {
        isFetched ? data.length !== 0 ? (
          <Container>
            <div className={classes.gridListWrapper}>
              <CardsList />
              {
                pageCount > 1 ? (
                  <div className={classes.paginationInfoContainer}>
                    <div>
                      <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>Search results: {data.length}</Typography>
                    </div>
                    <div className={classes.paginationWrapper}>
                      <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                      />
                    </div>
                  </div>
                ) : null
              }
            </div>
          </Container>
        ) : null: null
      }
    </div>
  );
}

Search.defaultProps = {
  results: []
};

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults
  }
};

const mapDispatchToProps = {
  fetchSearchOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);