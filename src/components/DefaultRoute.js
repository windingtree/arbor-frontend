import React  from 'react';
import { Route } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  afterHeader: {
    minHeight: '70vh',
    width: '100%',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '61px'
    }
  }
});

function DefaultRoute ({ component: Component, isAuthenticated, ...rest }) {
  const classes = styles();
  return (
    <Route
      {...rest}
      render={props => (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          <Header isAuthenticated={isAuthenticated}/>
          <div className={classes.afterHeader}>
            <Component {...props}/>
          </div>
          <Footer/>
        </div>
      )}
    />
  )
}

export default DefaultRoute;
