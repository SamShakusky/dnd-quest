/*  eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import Button from './Button';
import Link from './link';
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
    
    const hasAccount = JSON.parse(localStorage.getItem('has_account'));
    
    this.state = {
      username : '',
      password : '',
      email    : '',
      isValid  : false,
      error    : '',
      hasAccount
    };
  }
  
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    
    if (error !== prevProps.error) {
      const message = error.data.error.message;
      
      if (message.indexOf('username') !== -1) {
        this.setState({ // eslint-disable-line react/no-did-update-set-state
          error : 'This username is already taken'
        });
      } else if (message.indexOf('email') !== -1) {
        this.setState({ // eslint-disable-line react/no-did-update-set-state
          error : 'This email is already taken'
        });
      } else {
        this.setState({ // eslint-disable-line react/no-did-update-set-state
          error : ''
        });
      }
    }
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
  
  enableButton = () => {
    this.setState({
      isValid : true,
    });
  }
  
  disableButton = () => {
    this.setState({
      isValid : false,
    });
  }
  
  get signInForm() {
    const { username, password } = this.state;
    
    return (
      <Formsy onValidSubmit={this.onSignIn} styleName="form">
        <h1 styleName="form-title">Long time no see!</h1>
        <h2 styleName="form-subtitle">Make yourself at home.</h2>
        <div styleName="simple-auth">
          <TextField label="Username" name="username" value={username} onChange={this.onChange} required />
          <TextField label="Password" name="password" value={password} onChange={this.onChange} required />
          <Button label="Submit" type="submit" />
          <p styleName="form-change">Forgot password? <Link onClick={this.toggleForm} text="Don't you worry"/></p>
          <p styleName="form-change">New around here? <Link onClick={this.toggleForm} text="Let's introduce ourselves"/></p>
        </div>
      </Formsy>
    );
  }
  
  get signUpForm() {
    const { username, password, email, isValid } = this.state;
    
    return (
      <Formsy
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.onSignUp}
        styleName="form"
      >
        <h1 styleName="form-title">Welcome, Traveler!</h1>
        <h2 styleName="form-subtitle">Good to see new faces.</h2>
        <p>{this.state.error}</p>
        <div styleName="simple-auth">
          <TextField
            label="Username"
            name="username"
            value={username}
            validations={{
              minLength : 4,
              maxLength : 20,
              isAlphanumeric : true
            }}
            validationErrors={{
              minLength      : "Must be between 4 and 20 characters",
              maxLength      : "Must be between 4 and 20 characters",
              isAlphanumeric : "Must only contain letters or numbers"
            }}
            onChange={this.onChange}
            message="Only letters and numbers"
            // required
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={this.onChange}
            // required
            validations="isEmail"
            validationError="This is not an email"
            innerRef={(c) => { this.emailInput = c; }}
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            // required
            message="Must be at least 8 characters"
            validations={{
              minLength : 8,
            }}
            validationErrors={{
              minLength : "Must be at least 8 characters",
            }}
          />
          <Button label="Submit" type="submit" disabled={!isValid} />
          <p styleName="form-change">Been here before? <Link onClick={this.toggleForm} text="Remind me your name"/></p>
        </div>
      </Formsy>
    );
  }
  
  get form() {
    const { hasAccount } = this.state;
    
    return hasAccount ? this.signInForm : this.signUpForm;
  }
  
  toggleForm = (e) => {
    e.preventDefault();
    
    this.setState({ hasAccount : !this.state.hasAccount });
  }
  
  render() {
    return (
      this.form
    );
  }
}

const mapStateToProps = state => ({
  error : state.user.error
});

export default connect(mapStateToProps, {
  signIn,
  signUp,
})(AuthForm);
