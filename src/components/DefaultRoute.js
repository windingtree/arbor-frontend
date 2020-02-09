import React  from 'react';
import { Route } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function DefaultRoute ({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          <Header isAuthenticated={isAuthenticated}/>
          <div style={{ minHeight: '70vh', width: '100%' }}>
            <Component {...props}/>
          </div>
          <Footer/>
        </div>
      )}
    />
  )
}

export default DefaultRoute;