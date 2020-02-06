import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import history from '../redux/history';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../assets/SvgComponents/Logo';
import SearchIcon from '../assets/SvgComponents/SearchIcon';
import HomeIcon from '../assets/SvgComponents/HomeIcon';

import colors from '../styles/colors';

const styles = makeStyles({
  header: {
    borderBottom: `1px solid ${colors.greyScale.lightest}`
  },
  logo: {
    width: '89px',
    height: '32px'
  },
  navigationContainer: {
    width: '100%',
  },
  headerButton: {
    margin: '0 20px'
  },
  headerText: {
    color: 'black'
  },
  searchIcon: {
    fontSize: 'initial',
    marginLeft: '10px'
  },
  navLink: {
    textDecoration: 'none',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    padding: '0 14px'
  },
  linkTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    color: colors.primary.black,
    display: 'block',
    padding: '22px 0',
  },
  activeNavLink: {
    borderTopColor: colors.primary.accent,
    backgroundImage: colors.gradients.orangeDegOpacity,
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
    lineHeight: 1.2,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '6px 12px'
  }
});

export default function Header(props) {
  const classes = styles();
  const { isAuthenticated } = props;

  return (
    <div id="app-header" className={classes.header}>
      <Container>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item xs={2}>
            <RouterLink to={'/'}>
              <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
            </RouterLink>
          </Grid>
          <Grid item xs={isAuthenticated ? 6 : 5} container justify={'space-between'} className={classes.navigationContainer}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
                  style={{ display: 'flex', alignItems: 'center' }}
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
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <NavLink
                      to={'/trust'}
                      className={classes.navLink}
                      activeClassName={classes.activeNavLink}
                    >
                      <Typography variant={'caption'} className={classes.linkTitle} noWrap>
                        General trust guide
                      </Typography>
                    </NavLink>
                    <NavLink
                      to={'/my-organizations'}
                      className={classes.navLink}
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
                        style={{ marginRight: '10px' }}
                      />
                      <Typography variant={'caption'} className={classes.linkTitle} noWrap>
                        My Organizations
                      </Typography>
                    </NavLink>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Button
                      onClick={() => history.push('/authorization/register')}
                      className={classes.authButton}
                      style={{
                        backgroundImage: 'unset',
                        borderColor: 'transparent'
                      }}
                    >
                      <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle} style={{ color: colors.primary.black }}>
                        Sign Up
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => history.push('/authorization/signin')}
                      className={classes.authButton}
                      style={{ marginLeft: '20px' }}
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