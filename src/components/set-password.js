import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextField from './text-field';
import Button from './button';

// import {
//   readQuests,
//   createQuest,
//   updateQuest,
//   deleteQuest,
//   subscribe,
//   unsubscribe,
// } from '../actions/quest-actions';

import '../css/set-password.css';

class SetPass extends React.PureComponent {
  static propTypes = {
    
  };
  
  static defaultProps = {
    
  };
  
  state = {
    newPass  : '',
    confPass : '',
  }
  
  componentDidMount() {
    document.title = 'Set New Password – Adventure Companion';
  }
  
  handleChange = (event) => {
    const { target: { name, value } } = event;
    console.log()
    this.setState({
      [name] : value
    });
  }
  
  handleSubmit = (data) => {
    console.log(data);
  }
  
  render() {
    const { newPass, confPass } = this.state;
    
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
            validations={{
              minLength : 8,
            }}
            validationErrors={{
              minLength : 'Must be at least 8 characters',
            }}
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
      </main>
    );
  }
}

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps, {

})(SetPass));
