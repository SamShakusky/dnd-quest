import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AuthForm from './auth-form';

import '../css/main.css';

/* eslint-disable react/prefer-stateless-function */
export default class Login extends PureComponent {
  static propTypes = {
    isAuth   : PropTypes.bool.isRequired,
    location : PropTypes.shape({
      state : PropTypes.object
    }).isRequired
  };
  
  render() {
    const { isAuth } = this.props;
    const { from } = this.props.location.state || { from : { pathname : '/quests' } };
    if (isAuth) return <Redirect to={from} />;
    
    return (
      <main styleName="main">
        <AuthForm />
      </main>
    );
  }
}
