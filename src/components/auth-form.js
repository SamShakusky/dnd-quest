import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import axios from 'axios';

import Button from './Button';
import TextField from './TextField';

import localhost from '../config/localhost';
import '../css/form.css';

export default class AuthForm extends PureComponent {
  static propTypes = {
    onSubmit : PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      username : '',
      password : '',
    };
  }
  
  onChange = (event) => {
    const { target } = event;
    const { name } = target;
    
    this.setState({
      [name] : target.value
    });
  }
  
  onSubmit = () => {
    const { username, password } = this.state;
    
    const userData = {
      username,
      password
    };
    
    const requestOptions = {
      method  : 'POST',
      url     : `${localhost}/api/Users/login`,
      data    : JSON.stringify(userData),
      headers : { 'Content-Type' : 'application/json' }
    };
    
    axios.request(requestOptions).then((response) => {
      const { id, userId } = response.data;
      localStorage.setItem('access_token', id);
      localStorage.setItem('user_id', userId);
      
      this.props.onSubmit(id, userId);
    });
  }
  
  render() {
    const { username, password } = this.state;
    
    return (
      <Formsy onValidSubmit={this.onSubmit} styleName="form">
        <h1 styleName="form-title">Sign in</h1>
        <div styleName="simple-auth">
          <TextField label="Name" name="username" value={username} onChange={this.onChange} required />
          <TextField label="Password" name="password" value={password} onChange={this.onChange} required />
          <Button label="Submit" type="submit" />
        </div>
        {/* <div styleName="buttons">
          <Button label="google" onClick={this.handleClick} />
          <Button label="facebook" />
        </div> */}
      </Formsy>
    );
  }
}
