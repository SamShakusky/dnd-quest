import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AuthForm from './auth-form';

import '../css/main.css';

/* eslint-disable react/prefer-stateless-function */
export default class Login extends PureComponent {
  static propTypes = {
    isAuth   : PropTypes.bool,
    location : PropTypes.shape({
      state : PropTypes.object
    }).isRequired
  };
  
  static defaultProps = {
    isAuth : false
  }
  
  render() {
    const { isAuth } = this.props;
    const { from } = this.props.location.state || { from : { pathname : '/manager' } };
    if (isAuth) return <Redirect to={from} />;
    
    return (
      <main styleName="main">
        <AuthForm />
      </main>
    );
  }
}
