import { withFormsy } from 'formsy-react';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from './button';

import '../css/text-field.css';

class TextField extends PureComponent {
  static propTypes = {
    value           : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder     : PropTypes.string,
    name            : PropTypes.string.isRequired,
    label           : PropTypes.string,
    width           : PropTypes.oneOf(['full', 'min']),
    disabled        : PropTypes.bool,
    onChange        : PropTypes.func,
    fieldType       : PropTypes.oneOf(['input', 'textarea']),
    required        : PropTypes.bool,
    type            : PropTypes.string,
    icon            : PropTypes.string,
    iconColor       : PropTypes.string,
    onButton        : PropTypes.func,
    getErrorMessage : PropTypes.func,
    message         : PropTypes.string,
    noAutoComplete  : PropTypes.bool,
  };

  static defaultProps = {
    value           : undefined,
    label           : '',
    placeholder     : '',
    width           : 'full',
    disabled        : false,
    onChange        : null,
    fieldType       : 'input',
    required        : false,
    type            : 'text',
    icon            : null,
    iconColor       : null,
    onButton        : null,
    getErrorMessage : null,
    message         : '',
    noAutoComplete  : false,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      focused      : false,
      errorMessage : '',
    };
  }
  
  onFocus = () => {
    this.setState({
      focused      : true,
      errorMessage : null,
    });
  }

  onBlur = () => {
    this.setState({
      focused      : false,
      errorMessage : this.props.getErrorMessage(),
    });
  }

  render() {
    const {
      value,
      placeholder,
      name,
      label,
      width,
      disabled,
      onChange,
      fieldType,
      required,
      type,
      icon,
      iconColor,
      onButton,
      message,
      noAutoComplete,
    } = this.props;
    const Field = fieldType;
    
    const { errorMessage } = this.state;

    return (
      <div
        styleName={`field-wrap field_duty_${
          errorMessage ? 'error' : 'normal'
        } field_width_${
          width
        } ${
          this.state.focused ? 'field_focused' : ''
        } ${
          value ? 'field_filled' : ''
        } ${
          required ? 'field_required' : ''
        } field__${
          fieldType
        }`}
      >
        <p styleName="field__label">{label}</p>
        <Field
          styleName="field"
          placeholder={placeholder}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          disabled={disabled}
          autoComplete={noAutoComplete ? 'new-password' : 'on'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <p styleName="field__message">{errorMessage || message}</p>
        { icon &&
          <Button
            icon={icon}
            iconColor={iconColor}
            onClick={onButton}
            shape="flat"
            size="sm"
          />
        }
      </div>
    );
  }
}

export default withFormsy(TextField);
