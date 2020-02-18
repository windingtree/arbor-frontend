import React from 'react';
import { Button, InputAdornment, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//icons
import SearchIcon from '../assets/SvgComponents/SearchIcon';
//styles && colors
import colors from '../styles/colors';

const styles = makeStyles({
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
});

export default function SearchComponent(props) {
  const classes = styles();
  const { searchValue, handleSearchValue, fetchSearchResult, handleFocus} = props;

  return (
    <div className={classes.searchForm}>
      <div className={classes.searchInputWrapper}>
        <TextField
          id={'search-input'}
          autoComplete={''}
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
          onChange={handleSearchValue}
          onFocus={handleFocus}
          onKeyPress={(event) => {
              if (event.key === "Enter") {
                  fetchSearchResult()
              }
          }}
        />
      </div>
      <div className={classes.searchButtonWrapper}>
        <Button onClick={fetchSearchResult} className={classes.searchButton}>
          <Typography variant={'inherit'} className={classes.searchButtonLabel} noWrap>Find organization</Typography>
        </Button>
      </div>
    </div>
  )
}