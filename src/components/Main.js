import React, { PureComponent } from 'react';

import AuthForm from './auth-form';

import '../css/Main.css';

/* eslint-disable react/prefer-stateless-function */
export default class Main extends PureComponent {
  render() {
    return (
      <main styleName="main">
        <AuthForm />
      </main>
    );
  }
}
