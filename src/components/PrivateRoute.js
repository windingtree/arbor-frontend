import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        props.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/authorization', state: { from: props.location } }} />
        )
      }
    />
  )
};

export default PrivateRoute;

