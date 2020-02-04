import React from 'react';
import history from '../redux/history';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

import Logo from '../assets/SvgComponents/Logo';
import Illustration from '../assets/SvgComponents/404-illustration.svg';
import ButtonCommon from '../components/Button';

import colors from '../styles/colors';

const styles = makeStyles({
  container: {
    position: 'relative',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: colors.secondary.yellowLight,
  },
  logoContainer: {
    paddingTop: '16px'
  },
  logo: {
    width: '89px',
    height: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.primary.black,
  },
  subtitleWrapper: {
    margin: '20px 0 40px 0',
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  button: {
    border: `1px solid ${colors.secondary.cyan}`,
    backgroundImage: colors.gradients.green,
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px'
  }
});

export default function NotFound(props) {
  const classes = styles();

   return (
     <div className={classes.container}>
       <Container>
         <div className={classes.logoContainer}>
           <RouterLink to={'/'}>
             <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
           </RouterLink>
         </div>
         <Grid container justify={'center'} alignItems={'center'} wrap={'nowrap'}>
           <Grid item>
             <Typography variant={'h1'} className={classes.title}>Oops...Something went wrong</Typography>
             <div className={classes.subtitleWrapper}>
               <Typography variant={'subtitle1'} className={classes.subtitle}>
                 Sorry, can’t find what you’re looking for. Let’s try to find something new
               </Typography>
             </div>
             <div>
               <ButtonCommon onClick={() => history.push('/')} className={classes.button}>
                 <Typography variant={'subtitle2'} className={classes.buttonLabel}>Back to main page</Typography>
               </ButtonCommon>
             </div>
           </Grid>
           <Grid item>
             <img src={Illustration} alt={'illustration'}/>
           </Grid>
         </Grid>
       </Container>
     </div>
   )
}
