import React from 'react';
import { Route, Redirect } from 'react-router';
import DefaultRoute from './DefaultRoute';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        props.isAuthenticated ? (
          <DefaultRoute isAuthenticated={props.isAuthenticated} component={Component} {...props} />
        ) : (
          <Redirect to={{ pathname: '/authorization', state: { from: props.location } }} />
        )
      }
    />
  )
};

export default PrivateRoute;

