import { withFormsy } from 'formsy-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/TextField.css';

class TextField extends Component {
  static propTypes = {
    value       : PropTypes.string,
    placeholder : PropTypes.string,
    name        : PropTypes.string.isRequired,
    label       : PropTypes.string.isRequired,
    width       : PropTypes.oneOf(['full', 'min']),
    disabled    : PropTypes.bool,
    duty        : PropTypes.oneOf(['normal', 'error', 'sucess']),
    onChange    : PropTypes.func,
    fieldType   : PropTypes.oneOf(['input', 'textarea'])
  };

  static defaultProps = {
    value       : '',
    placeholder : '',
    width       : 'full',
    disabled    : false,
    duty        : 'normal',
    onChange    : null,
    fieldType   : 'input'
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
      onChange,
      fieldType
    } = this.props;

    const errorMessage = this.props.getErrorMessage(); // eslint-disable-line react/prop-types
    const Field = fieldType;

    return (
      <div
        className={`field-wrap field_duty_${
          duty
        } field_width_${
          width
        } ${
          this.state.focused ? 'field_focused' : ''
        } ${
          value.length ? 'field_filled' : ''
        } field__${
          fieldType
        }`}
      >
        <p className="field__label">{label}</p>
        <Field
          className="field"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}

          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
        />
        <p className="field__validation">{errorMessage}</p>
      </div>
    );
  }
}

export default withFormsy(TextField);
