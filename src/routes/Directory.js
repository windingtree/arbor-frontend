import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchOrganizationsByType,
  isFetchedSelector,
  itemsSelector,
  metaSelector
} from '../ducks/fetchSearchResults';

import { Button, Container, Grid, Typography } from '@material-ui/core';
import OrgsGridItem from '../components/OrgsGridItem';
import CardsGridList from '../components/CardsGridList';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '../components/Pagination';
import colors from '../styles/colors';
import history from '../redux/history';
import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';

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
  directoryTitle: {
    fontSize: '32px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    textTransform: 'capitalize',
  },
  gridListWrapper: {
    paddingTop: '30px'
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
    color: colors.greyScale.dark,
    textTransform: 'capitalize'
  },
  paginationWrapper: {
    marginRight: '56px',
  },
});

function Directory(props) {
  const classes = styles();
  const { items, meta: {page, per_page, total, pages} }  = props;

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
        <Grid item key={index.toString()} style={{ width: '264px' }}>
          <OrgsGridItem
            id={item.orgid}
            img={item.avatar}
            isSub={!!item.parent}
            type={item.orgidType}
            trustLevel={item.proofsQty}
            name={item.name}
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
    props.fetchSearchOrganizationsByType({ type: props.match.params.directory, page: selected + 1, per_page: 12 });
  };

  return (
    <div>
      <Container>
        <div className={classes.screenHeader}>
          <div className={classes.buttonWrapper}>
            <Button onClick={() => history.push('/directories')}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                Back to all organizations
              </Typography>
            </Button>
          </div>
        </div>
        <div className={classes.titleWrapper}>
          <Typography variant={'h2'} className={classes.directoryTitle}>
            {props.match.params.directory + 's'}
          </Typography>
        </div>
      </Container>
      {
        total !== 0 ? (
          <Container>
            <div className={classes.gridListWrapper}>
              <CardsList />
              {
                total > per_page ? (
                  <div className={classes.paginationInfoContainer}>
                    <div>
                      <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>ORG.ID in {props.match.params.directory + 's'}: {total}</Typography>
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
  fetchSearchOrganizationsByType
};

export default connect( mapStateToProps, mapDispatchToProps)(Directory);