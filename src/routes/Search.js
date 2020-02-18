import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import history from '../redux/history';
import {Container, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
//actions and selectors
import {
    fetchSearchOrganizations,
    fetchAllOrganizations,
    isFetchedSelector,
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
    const request = history.location.state && history.location.state.request;
    const [searchValue, setSearchValue] = useState('');
    const [lastSearchValue, setLastSearchValue] = useState('');
    const {items, meta: {page, per_page, total, pages}, isFetched} = props;

    const handleSearch = event => {
        setSearchValue(event.target.value);
    };

    const handleSearchFromHome = () => {
        setSearchValue(request);
        setLastSearchValue(request);
    };


    const searchTitle = () => {
        if (lastSearchValue === "") {
            return 'Search for ORG.ID'
        } else if (total === 0 && isFetched) {
            return `Sorry, can’t find anything for "${lastSearchValue}"`
        } else {
            if (!isFetched) return `Searching...`;
            return `${total} search results for "${lastSearchValue}"`
        }
    };

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
                <Grid item key={index.toString()} style={{width: '264px'}}>
                    <OrgsGridItem
                        id={item.orgid}
                        img={item.avatar}
                        isSub={!!item.parent}
                        type={item.orgidType}
                        trustLevel={item.proofsQty}
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

    const handlePageClick = data => {
        let selected = data.selected;
        props.fetchSearchOrganizations({value: searchValue, page: selected + 1, per_page: per_page});
    };

    const fetchSearchResults = async () => {
        if (searchValue === "" && !request) {
            await props.fetchAllOrganizations({page: page, per_page: per_page});
        } else await props.fetchSearchOrganizations({value: searchValue, page: page, per_page: per_page});
        setLastSearchValue(searchValue)
    };


    useEffect(() => {
        handleSearchFromHome();
        if (request && request !== "") {
            props.fetchSearchOrganizations({value: request, page: page, per_page: per_page});
        } else props.fetchAllOrganizations({page: page, per_page: per_page});
    }, [request]);

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
                                handleFocus={() => setSearchValue('')}
                            />
                        </div>
                    </div>
                    <div className={classes.illustrationWrapper}>
                        <img src={total === 0 ? SearchNoResultsIllustration : SearchIllustration}
                             alt={'illustration'}/>
                    </div>
                </Container>
            </div>
            {
                total !== 0 ? (
                    <Container>
                        <div className={classes.gridListWrapper}>
                            <CardsList/>
                            {
                                total > per_page ? (
                                    <div className={classes.paginationInfoContainer}>
                                        <div>
                                            <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>Search
                                                results: {total}</Typography>
                                        </div>
                                        <div className={classes.paginationWrapper}>
                                            <Pagination
                                                pageCount={pages}
                                                onPageChange={handlePageClick}
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
        isFetched: isFetchedSelector(state)
    }
};

const mapDispatchToProps = {
    fetchSearchOrganizations,
    fetchAllOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);