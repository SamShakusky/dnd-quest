import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import AuthForm from './auth-form';

import '../css/Main.css';

/* eslint-disable react/prefer-stateless-function */
export default class Login extends PureComponent {
  onSubmit = (accessToken, userId) => {
    this.props.logIn(accessToken, userId);
  }
  
  render() {
    const { isAuth } = this.props;
    const { from } = this.props.location.state || { from : { pathname : '/manager' }};
    if (isAuth) return <Redirect to={from} />;
    
    return (
      <main styleName="main">
        <AuthForm onSubmit={this.onSubmit} />
      </main>
    );
  }
}
