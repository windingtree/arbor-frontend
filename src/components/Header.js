import React from 'react';
import {NavLink} from 'react-router-dom';
import history from '../redux/history';
import {Container, Grid, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Logo from '../assets/SvgComponents/Logo';
import SearchIcon from '../assets/SvgComponents/SearchIcon';
import HomeIcon from '../assets/SvgComponents/HomeIcon';

import colors from '../styles/colors';

const styles = makeStyles({
  xsHidden: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none !important',
    },
  },
  authenticatedBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unauthenticatedBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  header: {
    backgroundColor: colors.primary.white,
    zIndex: 100,
    borderBottom: `1px solid ${colors.greyScale.lightest}`,
    ['@media (max-width:767px)']: {
      position: 'fixed',
      width: '100%'
    }
  },
  logoButton: {
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer'
  },
  logo: {
    width: '89px',
    height: '32px'
  },
  navigationContainer: {
    width: '100%',
    maxWidth: '50%'
  },
  headerButton: {
    margin: '0 20px'
  },
  headerText: {
    color: 'black'
  },
  searchIcon: {
    fontSize: 'initial',
    marginLeft: '10px',
    color: colors.primary.black,
    transition: 'color .3s ease'
  },
  navLinksContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  navLinksDirectoriesSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  navLinkMyOrgs: {
    textDecoration: 'none',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    padding: '0 12px',
    marginLeft: '16px',
    '&:hover': {
      '& > span': {
        color: colors.secondary.peach
      },
      '& > svg': {
        color: colors.secondary.peach
      }
    }
  },
  navLink: {
    textDecoration: 'none',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    padding: '0 12px',
    margin: '0 7px',
    '&:hover': {
      '& > span': {
        color: colors.secondary.peach
      },
      '& > svg': {
        color: colors.secondary.peach
      }
    }
  },
  activeNavLink: {
    padding: '0 12px',
    borderTopColor: colors.primary.accent,
    backgroundImage: colors.gradients.orangeDegOpacity,
  },
  navIcon: {
    maxHeight: '18px',
    color: colors.primary.black,
    marginRight: '10px',
    transition: 'color .3s ease'
  },
  linkTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    color: colors.primary.black,
    display: 'block',
    padding: '22px 0',
    transition: 'color .3s ease'
  },
  authButton: {
    backgroundImage: colors.gradients.orange,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px'
  },
  buttonTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '6px 12px'
  }
});

export default function Header(props) {
  const classes = styles();
  const {isAuthenticated} = props;

  return (
    <div id="app-header" className={classes.header}>
      <Container>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item lg={2} sm={4} xs={2}>
            <button onClick={() => history.push('/')} className={classes.logoButton}>
              <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
            </button>
          </Grid>
          <Grid item lg={isAuthenticated ? 6 : 5} sm={4} xs={6} container justify={'space-between'}
                className={classes.navigationContainer}>
            <div className={classes.navLinksContainer}>
              <div className={classes.navLinksDirectoriesSearch}>
                <NavLink
                  to="/directories"
                  className={classes.navLink}
                  activeClassName={classes.activeNavLink}
                >
                  <Typography variant={'caption'} className={classes.linkTitle}>Directories</Typography>
                </NavLink>
                <NavLink
                  to="/search"
                  className={classes.navLink}
                  activeClassName={classes.activeNavLink}
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  <Typography variant={'caption'} className={classes.linkTitle}>Search</Typography>
                  <SearchIcon
                    width={'14px'}
                    height={'14px'}
                    viewBox={'0 0 14 14'}
                    className={classes.searchIcon}
                  />
                </NavLink>
              </div>
              {
                isAuthenticated ? (
                  <div className={`${classes.xsHidden} ${classes.authenticatedBlock} `}>
                    <NavLink
                      to={'/trust'}
                      className={classes.navLink}
                      activeClassName={classes.activeNavLink}
                    >
                      <Typography variant={'caption'} className={classes.linkTitle} noWrap>
                        Verification methods
                      </Typography>
                    </NavLink>
                    <NavLink
                      to={'/my-organizations'}
                      className={classes.navLinkMyOrgs}
                      activeClassName={classes.activeNavLink}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <HomeIcon
                        width={'18px'}
                        height={'15px'}
                        viewBox={'0 0 15 18'}
                        className={classes.navIcon}
                      />
                      <Typography variant={'caption'} className={classes.linkTitle} noWrap>
                        My organizations
                      </Typography>
                    </NavLink>
                  </div>
                ) : (
                  <div className={`${classes.xsHidden} ${classes.unauthenticatedBlock} `}>
                    <Button
                      onClick={() => history.push('/authorization/register')}
                      className={classes.authButton}
                      style={{
                        backgroundImage: 'unset',
                        borderColor: 'transparent'
                      }}
                    >
                      <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle}
                                  style={{color: colors.primary.black}}>
                        Sign Up
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => history.push('/authorization/signin')}
                      className={classes.authButton}
                      style={{marginLeft: '20px'}}
                    >
                      <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle}>
                        Sign In
                      </Typography>
                    </Button>
                  </div>
                )
              }
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
};
