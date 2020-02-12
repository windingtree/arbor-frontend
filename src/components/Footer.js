import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Logo from '../assets/SvgComponents/Logo';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramSocialIcon from '../assets/SvgComponents/TelegramSocialIcon';
import MediumSocialIcon from '../assets/SvgComponents/MediumSocialIcon';
import InstagramSocialIcon from '../assets/SvgComponents/InstagramSocialIcon';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import colors from '../styles/colors';

const styles = makeStyles({
  footer: {
    background: colors.primary.white,
    border: 0,
    color: colors.primary.black,
    '& span': {
      marginBottom: '15px',
      marginRight: '5px'
    }
  },
  footerContent: {
    padding: '60px 0'
  },
  columnTitle: {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    paddingBottom: '12px'
  },
  columnItem: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.dark,
    padding: '4px 0'
  },
  navLink: {
    textDecoration: 'none',
  },
  logo: {
    width: '89px',
    height: '32px'
  },
  socialIcon: {
    fontSize: 'large',
    marginRight: '10px'
  },
  iconFacebook: {
    color: colors.social.facebook,
  },
  iconTelegram: {
    width: '18px',
    height: '15px'
  },
  iconTwitter: {
    color: colors.social.twitter,
  },
  iconMedium: {
    width: '17px',
    height: '14px'
  },
  iconGitHub: {
    color: colors.primary.black
  },
  legalInfoContainer: {
    position: 'relative',
    borderTop: `1px solid ${colors.greyScale.lightest}`
  },
  legalInfo: {
    padding: '20px 0'
  },
  legalInfoLabel: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.dark
  }
});

export default function Footer(props) {
  const classes = styles();
  return (
    <div id="app-footer" className={classes.footer}>
      <Container>
        <Grid container className={classes.footerContent}>
          <Grid item xs={2}>
            <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
          </Grid>
          <Grid container item xs={10}>
            <Grid container>
              <Grid container direction="column" item xs={3}>
                <Typography variant={'h4'} className={classes.columnTitle}>Solutions</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Hotels</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Avia</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>OTA</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Insurance company</Typography>
              </Grid>
              <Grid container direction="column" item xs={3}>
                <Typography variant={'h4'} className={classes.columnTitle}>Foundation</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>About</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Team</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Events</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Services</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Roadmap</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>White paper</Typography>
              </Grid>
              <Grid container direction="column" item xs={3}>
                <Typography variant={'h4'} className={classes.columnTitle}>Community</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Official page</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Blog</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Developer portal</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>Github</Typography>
              </Grid>
              <Grid container direction="column" item xs={3}>
                <Typography variant={'h4'} className={classes.columnTitle}>Contacts</Typography>
                <Typography variant={'h6'} className={classes.columnItem} noWrap>Gubelstrasse 11, 6300 Zug, Switzerland</Typography>
                <Typography variant={'h6'} className={classes.columnItem}>info@windingtree.com</Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
      <div className={classes.legalInfoContainer}>
        <Container>
          <Grid container justify={'space-between'} alignItems={'center'} className={classes.legalInfo}>
            <Grid item container justify={'space-between'} alignItems={'center'} style={{ width: '40%' }}>
              <Grid item>
                <Typography variant={'caption'} className={classes.legalInfoLabel}>
                  © 2020 Arbor
                </Typography>
              </Grid>
              <Grid item>
                <Link to={'/tos'} className={classes.navLink} style={{ marginRight: '40px' }}>
                  <Typography variant={'caption'} className={classes.legalInfoLabel}>Therms of Use</Typography>
                </Link>
                <Link to={'/privacy-policy'} className={classes.navLink}>
                  <Typography variant={'caption'} className={classes.legalInfoLabel}>Privacy Policy</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item container justify={'flex-end'} alignItems={'center'} style={{ width: '40%' }}>
              {
                props.socialLinks.map((item, index) => {
                  const socialIcon = type => {
                    switch(type[0]) {
                      case 'twitter':
                        return (
                          <TwitterIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>
                        );
                      case 'facebook':
                        return (
                          <FacebookIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>
                        );
                      case 'telegram':
                        return (
                          <TelegramSocialIcon viewBox={'0 0 18 15'} className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>
                        );
                      case 'medium':
                        return (
                          <MediumSocialIcon viewBox={'0 0 14 17'} className={[classes.socialIcon, classes.iconMedium].join(' ')}/>
                        );
                      case 'github':
                        return (
                          <GitHubIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>
                        );
                      default:
                        return null;
                    }
                  };
                  return (
                    <Grid item key={index.toString()}>
                      <a href={Object.values(item)} className={classes.socialLink}>
                        { socialIcon(Object.keys(item)) }
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
    { facebook: 'https://facebook.com/' },
    { github: 'https://github.com/' },
    { twitter: 'https://twitter.com/' },
    { medium: 'https://medium.com/' },
    { telegram: 'https://web.telegram.org/' },
  ]
};