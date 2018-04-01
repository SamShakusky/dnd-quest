import { withFormsy } from 'formsy-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
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

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const {
      value,
      placeholder,
      name,
      label,
      disabled,
      state
    } = this.props;

    return (
      <div
        className={`input-wrap input_state_${
          state
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
          onChange={this.changeValue}
          disabled={disabled}
        />
      </div>
    );
  }
}

export default withFormsy(Input);
