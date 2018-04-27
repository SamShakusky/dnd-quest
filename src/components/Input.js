import { withFormsy } from 'formsy-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Input.css';

class Input extends Component {
  static propTypes = {
    value       : PropTypes.string,
    placeholder : PropTypes.string,
    name        : PropTypes.string.isRequired,
    label       : PropTypes.string.isRequired,
    width       : PropTypes.oneOf(['full', 'min']),
    disabled    : PropTypes.bool,
    duty        : PropTypes.oneOf(['normal', 'error', 'sucess']),
    onChange    : PropTypes.func
  };

  static defaultProps = {
    value       : '',
    placeholder : '',
    width       : 'full',
    disabled    : false,
    duty        : 'normal',
    onChange    : null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      focused : false
    };
  }
  
  onFocus() {
    this.setState({ focused : true });
  }

  onBlur() {
    this.setState({ focused : false });
  }

  render() {
    const {
      value,
      placeholder,
      name,
      label,
      width,
      disabled,
      duty,
      onChange
    } = this.props;

    const errorMessage = this.props.getErrorMessage();

    return (
      <div
        className={`input-wrap input_duty_${
          duty
        } input_width_${
          width
        } ${
          this.state.focused ? 'input_focused' : ''
        } ${
          value.length ? 'input_filled' : ''
        }`}
      >
        <p className="input__label">{label}</p>
        <input
          className="input"
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
