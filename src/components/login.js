import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import AuthForm from './auth-form';

import '../css/Main.css';

/* eslint-disable react/prefer-stateless-function */
export default class Login extends PureComponent {
  onSubmit = () => {
    this.props.logIn();
  }
  
  render() {
    const { isAuth } = this.props;
    
    if (isAuth) return <Redirect to="/manager" />;
    
    return (
      <main styleName="main">
        <AuthForm onSubmit={this.onSubmit} />
      </main>
    );
  }
}

// export default withRouter(Login);
