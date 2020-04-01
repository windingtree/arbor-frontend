import React  from 'react';
import { Route } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    minHeight: '70vh',
    width: '100%',
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
          <div className={classes.container}>
            <Component {...props}/>
          </div>
          <Footer/>
        </div>
      )}
    />
  )
}

export default DefaultRoute;
