import React from 'react';
import history from '../redux/history';

import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../assets/SvgComponents/Logo';
import FacebookSocialIcon from '../assets/SvgComponents/FacebookSocialIcon';
import TwitterSocialIcon from '../assets/SvgComponents/TwitterSocialIcon';
import GitHubSocialIcon from '../assets/SvgComponents/GitHubSocialIcon';
import TelegramSocialIcon from '../assets/SvgComponents/TelegramSocialIcon';
import MediumSocialIcon from '../assets/SvgComponents/MediumSocialIcon';

import colors from '../styles/colors';

const styles = makeStyles({
  xsVisible: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '20px',
      width: '260px'
    },
  },
  footer: {
    background: colors.greyScale.darkBg,
    border: 0,
    color: colors.primary.white,
    '& span': {
      marginBottom: '15px',
      marginRight: '5px'
    }
  },
  footerContent: {
    flexWrap: 'nowrap',
    padding: '60px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '40px 0',
      alignItems: 'center',
      flexDirection: 'column'
    },
  },
  columnTitle: {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.primary.white,
    paddingBottom: '20px',
  },
  columnItem: {
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 400,
    padding: '2px 0',
    borderBottomColor: colors.primary.white,
    color: colors.primary.white,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    transition: 'border-bottom-color .3s ease',
    '&:hover': {
      color: colors.secondary.intenseGreen,
      borderBottomColor: colors.secondary.intenseGreen,
    }
  },
  columnTitleNoBorder: {
    fontSize: '14px',
    fontWeight: 400,
    padding: '2px 0',
    borderBottomColor: colors.primary.white,
    '& > span': {
      display: 'block',
      marginBottom: 0
    }
  },
  navLink: {
    position: 'relative',
    cursor: 'default',
    textDecoration: 'none',
    padding: '8px 0'
  },
  logoButton: {
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer'
  },
  logo: {
    backgroundColor: 'transparent',
    width: '150px',
    height: '50px'
  },
  socialIcon: {
    fontSize: 'large',
    marginRight: '20px',
  },
  iconFacebook: {
    color: colors.primary.white
  },
  iconTelegram: {
    width: '18px',
    height: '15px'
  },
  iconTwitter: {
    color: colors.primary.white,
  },
  iconMedium: {
    width: '17px',
    height: '14px'
  },
  iconGitHub: {
    color: colors.primary.white
  },
  legalInfoContainer: {
    position: 'relative',
    //borderTop: `1px solid ${colors.greyScale.lightest}`
  },
  legalInfo: {
    padding: '20px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column-reverse',
      // alignItems: 'center',
      paddingBottom: '40px',
      width: '260px',
      margin: '0 auto'
    },
  },
  copyrightInfoWrapper: {
    width: '50%',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      padding: '20px 0 40px',
      flexDirection: 'column'
    },
  },
  legalInfoLabel: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.primary.white
  },
  socialWrapper: {
    width: '50%',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '260px',
      justifyContent: 'space-between'
    },
  },
  logoContainer: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '260px',
      padding: '15px 0 20px'
    }
  }
});

export default function Footer(props) {
  const classes = styles();
  return (
    <div id="app-footer" className={classes.footer}>
      <Container>
        <Grid container className={classes.footerContent}>
          <Grid item xs={12} md={5} className={classes.logoContainer}>
              <button onClick={() => history.push('/')} className={classes.logoButton}>
                    <Logo viewBox={'0 0 90 32'} className={classes.logo} primary={colors.primary.white} />
              </button>
          </Grid>
          <Grid container direction="column" item xs={12} md={2} className={classes.xsVisible}>
            <Typography variant={'h4'} className={classes.columnTitle}>Organizations</Typography>
            <Link to={'/search'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>About Us</Typography>
            </Link>
            <Link to={'/my-organizations/wizard'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>Documentation</Typography>
            </Link>
            <Link to={'/my-organizations/wizard'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>FAQ</Typography>
            </Link>
          </Grid>

          <Grid container direction="column" item xs={12} md={2} className={classes.xsVisible}>
            <Typography variant={'h4'} className={classes.columnTitle}>Directories</Typography>

            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'airline' })}><Typography variant={'h6'} className={classes.columnItem}>Airlines</Typography></div>
            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'hotel' })} ><Typography variant={'h6'} className={classes.columnItem}>Hotels</Typography></div>
            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'ota' })} ><Typography variant={'h6'} className={classes.columnItem}>Travel agencies</Typography></div>
            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'insurance' })} ><Typography variant={'h6'} className={classes.columnItem}>Insurance</Typography></div>
            <Link to={'/search'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>Search</Typography>
            </Link>
            <Link to={'/my-organizations/wizard'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>Create organization</Typography>
            </Link>
          </Grid>

          <Grid container direction="column" item xs={12} md={3} className={classes.xsVisible}>
            <Typography variant={'h4'} className={classes.columnTitle}>Contacts</Typography>
            <Typography variant={'h6'} className={classes.columnTitleNoBorder}>
              <span>Gubelstrasse 11, 6300 Zug,</span>
              <span>Switzerland</span>
            </Typography>
            <a href={'mailto:info@windingtree.com'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>info@windingtree.com</Typography>
            </a>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.legalInfoContainer}>
        <Container>
          <Grid container justify={'space-between'} alignItems={'center'} className={classes.legalInfo}>
            <Grid item container justify={'space-between'} alignItems={'center'} className={classes.copyrightInfoWrapper}>
              <Grid item>
                <Typography variant={'caption'} className={classes.legalInfoLabel}>
                  © 2020 Winding Tree
                </Typography>
              </Grid>
              <Grid item>
                <Link to={'/tos'} className={classes.navLink}>
                  <Typography variant={'caption'} className={classes.legalInfoLabel}>Terms of
                    Service</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item container justify={'flex-end'} alignItems={'center'} className={classes.socialWrapper}>
              {
                props.socialLinks.map((item, index) => {
                  const socialIcon = type => {
                    switch (type[0]) {
                      case 'twitter':   return <TwitterSocialIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>;
                      case 'facebook':  return <FacebookSocialIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>;
                      case 'telegram':  return <TelegramSocialIcon className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>;
                      case 'medium':    return <MediumSocialIcon className={[classes.socialIcon, classes.iconMedium].join(' ')}/>;
                      case 'github':    return <GitHubSocialIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>;
                      default: return null;
                    }
                  };
                  return (
                    <Grid item lg={1} key={index.toString()}>
                      <a href={Object.values(item)} className={classes.socialLink}>
                        {socialIcon(Object.keys(item))}
                      </a>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
};

Footer.defaultProps = {
  socialLinks: [
    { facebook: 'https://www.facebook.com/WindingTree' },
    { github: 'https://github.com/windingtree' },
    { twitter: 'https://blog.windingtree.com' },
    { medium: 'https://blog.windingtree.com/' },
    { telegram: 'https://t.me/windingtree' },
  ]
};
