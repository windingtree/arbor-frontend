import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import history from '../redux/history';
import {Container, Grid, Typography, Button, Hidden, Collapse, Card} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import {
  getBackendConnectionStatus
} from '../ducks/backendStatus';

import Logo from '../assets/SvgComponents/Logo';
import SearchIcon from '../assets/SvgComponents/SearchIcon';
import HomeIcon from '../assets/SvgComponents/HomeIcon';
import MobileMenuIcon from '../assets/SvgComponents/mobile-menu-icon.svg';
import MobileMenuIconClose from '../assets/SvgComponents/mobile-menu-icon-close.svg';
import PlaneIcon from '../assets/SvgComponents/plane-icon.svg';
import HotelIcon from '../assets/SvgComponents/hotel-icon.svg';
import PaperIcon from '../assets/SvgComponents/paper-icon.svg';
import TravelIcon from '../assets/SvgComponents/travel-icon.svg';
import InfoIcon from '../components/icons/IconInfo';
import {getWeb3} from '../web3/w3';

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
  headerContainer: {
    position: 'relative'
  },
  header: {
    backgroundColor: colors.primary.white,
    zIndex: 100,
    padding: '17px 0',
    borderBottom: `1px solid ${colors.greyScale.lightest}`,
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      position: 'fixed',
      width: '100%'
    }
  },
  headerJoin: {
    backgroundColor: colors.greyScale.moreLighter,
    zIndex: 100,
    paddingBottom: '100px',
    padding: '17px 0'
  },
  logoButton: {
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer'
  },
  logo: {
    width: '150px',
    height: '50px'
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
      },
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      padding: '0',
    },
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
  },
  headerContent: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      padding: '16px 0',
    },
  },
  mobileMenuButtonContainer: {
    ['@media (min-width:961px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
  },
  mobileMenuButton: {
    borderRadius: '50%',
    minWidth: 'auto',
    fontSize: '0'
  },
  mobileMenu: {
    position: 'fixed',
    width: '100%',
    top: '67px',
    left: '0',
    backgroundColor: colors.greyScale.moreLighter,
    zIndex: 2
  },
  mobileMenuContent: {
    paddingTop: '32px',
    paddingBottom: '40px',
    borderBottom: `1px solid ${colors.greyScale.common}`
  },
  mobileNavLinkWrapper: {
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: '0',
      marginTop: '30px'
    }
  },
  mobileNavLink: {
    textDecoration: 'none'
  },
  mobileNavLinkIcon: {
    verticalAlign: 'middle',
    paddingRight: '12px'
  },
  mobileNavLinkLabel: {
    fontSize: '17px',
    fontWeight: 500,
    lineHeight: 1.36,
    color: colors.primary.black
  },
  mobileNavLinkSubItem: {
    padding: '12px 0'
  },
  mobileNavLinkSubLabel: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  mobileMenuFootnoteWrapper: {
    padding: '20px 0'
  },
  mobileMenuFootnote: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.darkest
  },
  statusAlert: {
    margin: '16px',
    padding: '16px',
    backgroundColor: '#f44336'
  },
  statusText: {
    color: 'white',
    fontSize: '16px'
  },
  statusIcon: {
    marginRight: '16px'
  }
});

const animation = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  }
};

const Header = (props) => {
  const classes = styles();
  const [isOpen, toggleOpen] = useState(false);
  const { isAuthenticated, connectionStatus } = props;

  // Redirect users depending on Web3 presence or not
  const handleSignInRedirect = () => {
    let w3 = getWeb3();
    if(w3 !== undefined) {
      history.push('/authorization/signin');
    }
    else {
      history.push('/authorization/register')
    }
  };

  let directoriesContent = [
    {
      logo: PlaneIcon,
      title: 'Airlines',
      path: '/directories/airline'
    },
    {
      logo: HotelIcon,
      title: 'Hotels',
      path: '/directories/hotel'
    },
    {
      logo: PaperIcon,
      title: 'Insurance',
      path: '/directories/insurance'
    },
    {
      logo: TravelIcon,
      title: 'Travel agencies',
      path: '/directories/ota'
    },
  ];

  const handleMobileMenuOpenState = () => {
    toggleOpen(!isOpen);
  };

  const MenuIcon = (props) => {
    const mobileIcon = <img src={props.icon} style={animation.fadeIn} alt={'mobile-menu'}/>;

    return (
      <StyleRoot>
        {mobileIcon}
      </StyleRoot>
    )
  };

  const mobileMenuContent = () => {
    const directoriesNavLinks = directoriesContent.map((item, index) => {
      return (
        <li key={index.toString()} onClick={handleMobileMenuOpenState} className={classes.mobileNavLinkSubItem}>
          <Link to={item.path} className={classes.mobileNavLink}>
            <img src={item.logo} alt={''} className={classes.mobileNavLinkIcon}/>
            <Typography variant={'caption'} className={classes.mobileNavLinkSubLabel}>{item.title}</Typography>
          </Link>
        </li>
      )
    });

    return (
      <div className={classes.mobileMenuContent}>
        <div className={classes.mobileNavLinkWrapper}>
          <Link to={'/directories'} className={classes.mobileNavLink} onClick={handleMobileMenuOpenState}>
            <Typography variant={'caption'} className={classes.mobileNavLinkLabel}>Directories</Typography>
          </Link>
        </div>
        <ul>{directoriesNavLinks}</ul>
        <div className={classes.mobileNavLinkWrapper}>
          <Link to={'/search'} className={classes.mobileNavLink} onClick={handleMobileMenuOpenState}>
            <Typography variant={'caption'} className={classes.mobileNavLinkLabel}>Search</Typography>
          </Link>
        </div>
      </div>
    )
  };

  return (
    <div id="app-header" className={classes.headerContainer}>
      <div className={history.location.pathname === '/join' ? classes.headerJoin : classes.header}>
        <Container>
          <Grid container justify={'space-between'} alignItems={'center'} className={classes.headerContent}>
            <Grid item lg={2} sm={4} xs={2}>
              <button onClick={() => history.push('/')} className={classes.logoButton}>
                <Logo viewBox={'0 0 90 32'} className={classes.logo} primary={colors.greyScale.darkBg}/>
              </button>
            </Grid>
            {history.location.pathname !== '/join' &&
              <Hidden smDown>
                <Grid item lg={isAuthenticated ? 6 : 4} sm={4} xs={6} container justify={'space-between'} className={classes.navigationContainer}>
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
                            onClick={handleSignInRedirect}
                            className={classes.authButton}
                            style={{marginLeft: '20px'}}
                          >
                            <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle}>
                              Sign up / Sign in
                            </Typography>
                          </Button>
                        </div>
                      )
                    }
                  </div>
                </Grid>
              </Hidden>
            }
            {history.location.pathname !== '/join' &&
              <div className={classes.mobileMenuButtonContainer}>
                <Button onClick={handleMobileMenuOpenState} className={classes.mobileMenuButton}>
                  <MenuIcon icon={isOpen ? MobileMenuIconClose : MobileMenuIcon}/>
                </Button>
              </div>
            }
          </Grid>
          {!connectionStatus &&
            <Card className={classes.statusAlert}>
              <Grid container alignItems='center'>
                <Grid item>
                  <InfoIcon iconcolor={'#FFFFFF'} className={classes.statusIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.statusText}>
                    Looks like there are some Ethereum network connection difficulties at the moment.
                  </Typography>
                  <Typography className={classes.statusText}>
                    While we reconnect your updates may not go live, but don't worry - data will be synced once the connection is up again
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          }
        </Container>
      </div>
      {history.location.pathname !== '/join' &&
        <Collapse in={isOpen} className={classes.mobileMenu}>
          <Container>
            {mobileMenuContent()}
            <div className={classes.mobileMenuFootnoteWrapper}>
              <Typography variant={'caption'} className={classes.mobileMenuFootnote}>
                For full access use devices larger than 1024 px
              </Typography>
            </div>
          </Container>
        </Collapse>
      }
    </div>
  )
};

const mapStateToProps = state => {
  return {
      connectionStatus: getBackendConnectionStatus(state)
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
