import { withFormsy } from 'formsy-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused : false
    };
  }

  static propTypes = {
    value       : PropTypes.string,
    placeholder : PropTypes.string,
    name        : PropTypes.string.isRequired,
    label       : PropTypes.string.isRequired,
    disabled    : PropTypes.bool,
    state       : PropTypes.oneOf(['normal','error','sucess'])
  };

  static defaultProps = {
    value       : '',
    placeholder : '',
    disabled    : false,
    state       : 'normal'
  };
  
  onFocus() {
    this.setState({focused: true});
  }

  onBlur() {
    this.setState({focused: false});
  }

  render() {
    const {
      value,
      placeholder,
      name,
      label,
      disabled,
      state,
      onChange
    } = this.props;

    const errorMessage = this.props.getErrorMessage();

    return (
      <div
        className={`input-wrap input_state_${
          state
        } ${
          this.state.focused ? 'input_focused' : ''
        } ${
          value.length ? 'input_filled' : ''
        }`}
      >
        <p className="input__label">{label}</p>
        <input
          className={
            `input`
          }
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}

          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
        />
        <p className="input__validation">{errorMessage}</p>
      </div>
    );
  }
}

export default withFormsy(Input);
