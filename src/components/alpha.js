import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';
import Formsy from 'formsy-react';

import Button from './button';
import TextField from './text-field';
import Snackbar from './snackbar';

import { emitError } from '../actions/error-actions';
import { createParty } from '../actions/user-actions';

import '../css/alpha.css';

const rpClasses = [
  'mightyfighter',
  'agileranger',
  'nerfedwizard',
  'trickyrogue',
  'lawfulpaladin',
  'charismaticbard',
  'kindcleric',
  'ragingbarbarian',
  'calmmonk',
  'arcanesorcerer',
  'homelessdruid',
  'lovecraftianwarlock',
];

const submittedFlag = JSON.parse(localStorage.getItem('submitted'));

class Alpha extends PureComponent {
    static propTypes = {
      emitError   : PropTypes.func.isRequired,
      createParty : PropTypes.func.isRequired,
      error       : PropTypes.string.isRequired,
    };
  
    state = {
      members   : 1,
      submitted : submittedFlag,
      captcha   : false,
    }
    
    componentDidMount() {
      document.title = 'Join Alpha – Adventure Companion';
    }
    
    onSubmit = (data) => {
      const emails = Object.values(data).filter(Boolean);
      
      if (!emails.length) return this.props.emitError('Please enter at least one email');
      
      this.setState({
        submitted : true
      });
      
      return this.props.createParty(emails);
    }
    
    onInvalidSubmit = () => {
      const error = 'At least one of the emails is invalid';
      this.props.emitError(error);
    }
    
    getTextFields = () => {
      const { members } = this.state;
      const fields = [];
      
      for (let i = 0; i < members; i += 1) {
        const cls = i < 12 ? rpClasses[i] : 'wowsomanyfriends';
        fields.push(<TextField
          key={`email-${i}`}
          name={`email-${i}`}
          value={this.state[`email-${i}`]}
          validations="isEmail"
          placeholder={`${cls}@example.com`}
          type="email"
          onChange={this.textFieldChange}
        />);
      }
      
      return fields;
    }
    
    getForm = () => (
      <Formsy
        styleName="form"
        onValidSubmit={this.onSubmit}
        onInvalidSubmit={this.onInvalidSubmit}
      >
        <p styleName="party__title">Create a party</p>
        <div styleName="fields-container">
          {this.getTextFields()}
          <Button
            label="Add member"
            shape="flat"
            duty="success"
            size="sm"
            icon="add"
            onClick={this.addMember}
          />
        </div>
        <ReCAPTCHA
          sitekey="6Lc0bXYUAAAAAEldqyVZdwbgB_-iSbqGzM4Cxzvo"
          onChange={this.successfulCaptcha}
          styleName="recaptcha"
        />
        <Button
          duty="success"
          label="Send"
          type="submit"
          shape="solid"
          disabled={!this.state.captcha}
        />
      </Formsy>
    )
    
    getThanks = () => (
      <div styleName="thanks-text">
        <h3>Done!</h3>
        <p>A confirmation will be sent to the specified email addresses in a few moments.</p>
        <p>As soon as the Closed Alpha is available, you will receive another notice.</p>
        <p>Thank you for your interest!</p>
      </div>
    );
    
    textFieldChange = (event) => {
      const { target } = event;
      const { name } = target;
      
      this.setState({
        [name] : target.value
      });
    }
    
    addMember = () => {
      const { members } = this.state;
      
      this.setState({
        members : members + 1
      });
    }
    
    successfulCaptcha = () => {
      this.setState({
        captcha : true,
      });
    }
    
    render() {
      const { error } = this.props;
      const { submitted } = this.state;
      
      return (
        <main
          styleName="container"
        >
          <div styleName="title__wrap">
            <div>
              <p styleName="title">Adventure</p>
              <p styleName="title">
                Companion
                <span styleName="sign">α</span>
              </p>
            </div>
            <div>
              <p styleName="disclaimer">
                These emails will never be shared with any 3rd parties,
                such as evil cults of all sorts or advertisement-mongers.
                Nor will it be used with any intention other than informing
                on the Closed Alpha&apos;s status and ranting about the
                meaninglessness of a pineapple pizza.
              </p>
              <p styleName="disclaimer">
                All user-created data may probably be lost at the end of (during) the Closed Alpha
                in a bizzare accident of some kind or by the will of the God of Removal (aka Rm-Rf).
              </p>
              <p styleName="disclaimer">
                By clicking &laquo;send&raquo; you are agreeing to these terms.
              </p>
            </div>
          </div>
          <div styleName="form__wrap">
            <div styleName="form__title">
              <p>Join</p>
              <p>Closed Alpha</p>
            </div>
            { submitted ? this.getThanks() : this.getForm() }
          </div>
          { error && <Snackbar duty="danger" message={error} /> }
        </main>
      );
    }
}

const mapStateToProps = state => ({
  error : state.error.error,
});

export default connect(mapStateToProps, { emitError, createParty })(Alpha);
