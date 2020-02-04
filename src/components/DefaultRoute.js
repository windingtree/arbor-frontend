import React from 'react';
import { Route } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const DefaultRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          <Header isAuthenticated={props.isAuthenticated}/>
          <div style={{ minHeight: '100vh', width: '100%' }}>
            <Component {...props}/>
          </div>
          <Footer/>
        </div>
      )}
    />
  )
};

export default DefaultRoute;