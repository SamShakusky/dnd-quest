import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, } from 'react-router-dom';

const PrivateRoute = ({ component : Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.isAuth === true
        ? <Component {...props} accessToken={rest.accessToken} />
        : <Redirect to={{
            pathname : '/login',
            state    : { from : props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component : PropTypes.func.isRequired,
  location  : PropTypes.shape({}),
};

PrivateRoute.defaultProps = {
  location : {},
};


export default PrivateRoute;
