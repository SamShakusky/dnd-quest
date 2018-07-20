import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import Button from './Button';
import TextField from './TextField';

import { signIn, signUp } from '../actions/user-actions';
import '../css/form.css';

class AuthForm extends PureComponent {
  static propTypes = {
    signIn : PropTypes.func.isRequired,
    signUp : PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      username   : '',
      password   : '',
      email      : '',
      hasAccount : true,
    };
  }
  
  onChange = (event) => {
    const { target } = event;
    const { name } = target;
    
    this.setState({
      [name] : target.value
    });
  }
  
  onSignIn = () => {
    const { username, password } = this.state;
    
    const userData = {
      username,
      password
    };
    
    this.props.signIn(userData);
  }
  
  onSignUp = () => {
    const { username, password, email } = this.state;
    
    const userData = {
      username,
      password,
      email,
    };
    
    this.props.signUp(userData);
  }
  
  get signInForm() {
    const { username, password } = this.state;
    
    return (
      <Formsy onValidSubmit={this.onSignIn} styleName="form">
        <h1 styleName="form-title">Sign in</h1>
        <div styleName="simple-auth">
          <TextField label="Name" name="username" value={username} onChange={this.onChange} required />
          <TextField label="Password" name="password" value={password} onChange={this.onChange} required />
          <Button label="Create account" shape="flat" size="sm" onClick={this.toggleForm} />
          <Button label="Submit" type="submit" />
        </div>
        {/* <div styleName="buttons">
          <Button label="google" onClick={this.handleClick} />
          <Button label="facebook" />
        </div> */}
      </Formsy>
    );
  }
  
  get signUpForm() {
    const { username, password, email } = this.state;
    
    return (
      <Formsy onValidSubmit={this.onSignUp} styleName="form">
        <h1 styleName="form-title">Sign up</h1>
        <div styleName="simple-auth">
          <TextField label="Email" name="email" value={email} onChange={this.onChange} required />
          <TextField label="Password" name="password" value={password} onChange={this.onChange} required />
          <TextField label="Name" name="username" value={username} onChange={this.onChange} required />
          <Button label="Sign in" shape="flat" size="sm" onClick={this.toggleForm} />
          <Button label="Submit" type="submit" />
        </div>
      </Formsy>
    );
  }
  
  get form() {
    const { hasAccount } = this.state;
    
    return hasAccount ? this.signInForm : this.signUpForm;
  }
  
  toggleForm = () => {
    this.setState({ hasAccount : !this.state.hasAccount });
  }
  
  render() {
    return (
      this.form
    );
  }
}

export default connect(null, {
  signIn,
  signUp,
})(AuthForm);
