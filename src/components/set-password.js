import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextField from './text-field';
import Button from './button';
import Snackbar from './snackbar';

import {
  setPassword
} from '../actions/user-actions';

import '../css/set-password.css';

class SetPass extends React.PureComponent {
  static propTypes = {
    setPassword : PropTypes.func.isRequired,
    error       : PropTypes.string,
    location    : PropTypes.shape({}).isRequired,
    passChanged : PropTypes.bool,
  };
  
  static defaultProps = {
    error       : '',
    passChanged : false,
  };
  
  state = {
    newPass  : '',
    confPass : '',
    error    : '',
  }
  
  componentDidMount() {
    document.title = 'Set Password – Adventure Companion';
  }
  
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    
    if (error !== prevProps.error) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        error : 'Your link has expired. Please contact us to get a new one.'
      }, this.removeError());
    }
  }
  
  removeError = () => {
    setTimeout(() => {
      this.setState({ error : '' });
    }, 4000);
  }
  
  handleChange = (event) => {
    const { target: { name, value } } = event;
    
    this.setState({
      [name] : value
    });
  }
  
  handleSubmit = (data) => {
    const { location: { search } } = this.props;
    const token = search.split('=')[1];
    
    this.props.setPassword({
      pass : data.newPass,
      token
    });
  }
  
  render() {
    const { newPass, confPass, error } = this.state;
    const { passChanged } = this.props;
    
    if (passChanged) {
      return (
        <Redirect to="/" />
      );
    }
    
    return (
      <main styleName="page-pass">
        <Formsy
          onValidSubmit={this.handleSubmit}
          styleName="pass-form"
        >
          <h4>Set your password</h4>
          <p>Do not use passwords from other accounts.</p>
          <TextField
            type="password"
            label="Password"
            name="newPass"
            value={newPass}
            onChange={this.handleChange}
            noAutoComplete
            message="Must be at least 8 characters"
            // validations={{
            //   minLength : 8,
            // }}
            // validationErrors={{
            //   minLength : 'Must be at least 8 characters',
            // }}
            required
          />
          <TextField
            type="password"
            label="Confirm Password"
            name="confPass"
            value={confPass}
            onChange={this.handleChange}
            validations="equalsField:newPass"
            validationErrors={{
              equalsField : 'The passwords must match',
            }}
            noAutoComplete
            required
          />
          <Button
            label="done"
            type="submit"
          />
        </Formsy>
        { error && <Snackbar duty="danger" message={error} /> }
      </main>
    );
  }
}

const mapStateToProps = state => ({
  error       : state.user.error,
  passChanged : state.user.passChanged,
});

export default withRouter(connect(mapStateToProps, {
  setPassword,
})(SetPass));
