import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import {Grid, Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../assets/SvgIconsComponents/Logo';
import SearchIcon from '../assets/SvgIconsComponents/SearchIcon';
import HomeIcon from '../assets/SvgIconsComponents/HomeIcon';
import ButtonCommon from './Button';

import colors from '../styles/colors';

const styles = makeStyles({
    header: {
        border: 0,
        color: 'white',
        borderBottom: '1px solid #EFEFEF'
    },
    container: {
        width: '90%',
        position: 'relative',
        margin: '0 auto'
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
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1,
        color: colors.primary.black,
        display: 'block',
        padding: '22px 0',
    },
    activeNavLink: {
        borderTopColor: colors.primary.accent,
        backgroundImage: 'linear-gradient(35.28deg, rgba(236, 111, 149, 0.1) 0%, rgba(252, 184, 113, 0.1) 100%)',
    },
    authButton: {
        backgroundImage: 'linear-gradient(35.28deg, #EC6F95 0%, #FCB871 100%)',
        boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
        border: `1px solid ${colors.primary.accent}`,
        borderRadius: '6px'
    },
    buttonTitle: {
        fontFamily: 'Inter',
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
            <Box className={classes.container}>
                <Grid direction="row" container={true} justify={'space-between'} alignItems={'center'}>
                    <Grid item xs={4}>
                        <RouterLink to={'/'}>
                            <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
                        </RouterLink>
                    </Grid>
                    <Grid item xs={4} container={true} direction={"row"} justify={'space-between'} className={classes.navigationContainer}>
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
                                      viewBox={'0 0 14px 14px'}
                                      className={classes.searchIcon}
                                    />
                                </NavLink>
                            </div>
                            {
                                !isAuthenticated ? (
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
                                      <ButtonCommon
                                        onClick={() => null}
                                        className={classes.authButton}
                                        style={{
                                            backgroundImage: 'unset',
                                            borderColor: 'transparent'
                                        }}
                                      >
                                          <RouterLink to={'/authorization/register'} style={{ textDecoration: 'none' }}>
                                              <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle} style={{ color: colors.primary.black }}>
                                                  Sign Up
                                              </Typography>
                                          </RouterLink>
                                      </ButtonCommon>
                                      <ButtonCommon
                                        onClick={() => null}
                                        className={classes.authButton}
                                        style={{ marginLeft: '20px' }}
                                      >
                                          <RouterLink to={'/authorization/signin'} style={{ textDecoration: 'none' }}>
                                              <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle}>
                                                  Sign In
                                              </Typography>
                                          </RouterLink>
                                      </ButtonCommon>
                                  </div>
                                )
                            }
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
};