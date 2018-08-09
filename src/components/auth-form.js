import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import Button from './Button';
import TextField from './TextField';
import Snackbar from './snackbar';

import { signIn, signUp } from '../actions/user-actions';
import '../css/form.css';

const errorShape = {
  data : PropTypes.shape({
    error : PropTypes.shape({
      statusCode : PropTypes.number,
      message    : PropTypes.string,
    })
  })
};

class AuthForm extends PureComponent {
  static propTypes = {
    signIn : PropTypes.func.isRequired,
    signUp : PropTypes.func.isRequired,
    error  : PropTypes.shape(errorShape),
  }
  
  static defaultProps = {
    error : {},
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
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        error : this.errorMessage
      }, this.removeError());
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
  
  get signInForm() {
    const { username, password, isValid } = this.state;
    
    return (
      <Formsy
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.onSignIn}
        styleName="form"
      >
        <h1 styleName="form-title">Long time no see!</h1>
        <h2 styleName="form-subtitle">Make yourself at home.</h2>
        <div styleName="simple-auth">
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={this.onChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <Button label="Submit" type="submit" disabled={!isValid} />
          <p styleName="form-change">Forgot password? <Button inline label="Don't you worry" onClick={this.toggleForm} /></p>
          <p styleName="form-change">New around here? <Button inline label="Let's introduce ourselves" onClick={this.toggleForm} /></p>
        </div>
      </Formsy>
    );
  }
  
  get signUpForm() {
    const {
      username,
      password,
      email,
      isValid,
    } = this.state;
    
    return (
      <Formsy
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.onSignUp}
        styleName="form"
      >
        <h1 styleName="form-title">Welcome, Traveler!</h1>
        <h2 styleName="form-subtitle">Good to see new faces.</h2>
        <div styleName="simple-auth">
          <TextField
            label="Username"
            name="username"
            value={username}
            validations={{
              minLength      : 4,
              maxLength      : 20,
              isAlphanumeric : true
            }}
            validationErrors={{
              minLength      : 'Must be between 4 and 20 characters',
              maxLength      : 'Must be between 4 and 20 characters',
              isAlphanumeric : 'Must only contain letters or numbers'
            }}
            onChange={this.onChange}
            message="Only letters and numbers"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            type="email"
            onChange={this.onChange}
            required
            validations="isEmail"
            validationError="This is not an email"
            noAutoComplete
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.onChange}
            required
            message="Must be at least 8 characters"
            validations={{
              minLength : 8,
            }}
            validationErrors={{
              minLength : 'Must be at least 8 characters',
            }}
            noAutoComplete
          />
          <Button label="Submit" type="submit" disabled={!isValid} />
          <p styleName="form-change">Been here before? <Button inline label="Remind me your name" onClick={this.toggleForm} /></p>
        </div>
      </Formsy>
    );
  }
  
  get form() {
    const { hasAccount } = this.state;
    
    return hasAccount ? this.signInForm : this.signUpForm;
  }
  
  get errorMessage() {
    const { statusCode, message } = this.props.error.data.error;
    
    if (statusCode === 401) return 'Incorrect username or password';
    if (message.indexOf('username') !== -1) return 'This username is already taken';
    if (message.indexOf('email') !== -1) return 'This email is already taken';
    
    return '';
  }
  
  removeError = () => {
    setTimeout(() => {
      this.setState({ error : '' });
    }, 4000);
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
  
  toggleForm = (e) => {
    e.preventDefault();
    
    this.setState({
      hasAccount : !this.state.hasAccount,
      password   : '',
    });
  }
  
  render() {
    const { error } = this.state;
    
    return (
      <div>
        {this.form}
        { error && <Snackbar duty="danger" message={error} /> }
      </div>
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
