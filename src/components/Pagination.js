import React from 'react';
import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../styles/colors';

const styles = makeStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationItem: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    color: colors.greyScale.dark,
    margin: '0 5px',
    padding: '4px 8px',
    boxSizing: 'border-box',
    backgroundImage: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'color .3s ease',
    '&:hover': {
      backgroundImage: colors.gradients.orangeDegOpacity,
      color: colors.secondary.peach
    }
  },
  paginationActive: {
    backgroundImage: colors.gradients.orangeDegOpacity,
    color: colors.secondary.peach
  },
  paginationLink: {
    outline: 'none'
  },
  paginationBreak: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    color: colors.greyScale.dark
  },
  paginationIcon: {
    width: '13px',
    height: '12px',
    color: colors.greyScale.dark,
    padding: '4px 8px',
    cursor: 'pointer',
    transition: 'color .3s ease',
    marginRight: '22px',
    '&:hover': {
      color: colors.secondary.peach
    }
  },
  paginationIconRight: {
    marginRight: '0',
    marginLeft: '22px',
    transform: 'rotate(180deg)'
  },
  disabled: {
    '& > a > svg': {
      color: colors.greyScale.common,
      cursor: 'auto',
      '&:hover': {
        color: colors.greyScale.common
      }
    }
  }
});

function Pagination(props) {
  const classes = styles();
  const { pageCount, onPageChange } = props;

  return (
    <ReactPaginate
      previousLabel={(
        <ArrowLeftIcon
          viewBox={'0 0 12 12'}
          className={classes.paginationIcon}
        />
      )}
      nextLabel={(
        <ArrowLeftIcon
          viewBox={'0 0 12 12'}
          className={[classes.paginationIcon, classes.paginationIconRight].join(' ')}
        />
      )}
      disabledClassName={classes.disabled}
      breakLabel={'...'}
      breakClassName={classes.paginationBreak}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      onPageChange={onPageChange}
      containerClassName={classes.pagination}
      pageClassName={classes.paginationItem}
      pageLinkClassName={classes.paginationLink}
      previousLinkClassName={classes.paginationLink}
      nextLinkClassName={classes.paginationLink}
      activeClassName={classes.paginationActive}
    />
  )
}

export default Pagination;