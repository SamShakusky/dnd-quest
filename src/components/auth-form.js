import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import Button from './Button';
import TextField from './TextField';

import { signIn } from '../actions/user-actions';
import '../css/form.css';

class AuthForm extends PureComponent {
  static propTypes = {
    signIn : PropTypes.func.isRequired
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
    
    this.props.signIn(userData);
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

const mapStateToProps = state => ({
  user : state.user.credentials
});

export default connect(mapStateToProps, {
  signIn
})(AuthForm);
