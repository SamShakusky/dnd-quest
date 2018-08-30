import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/button.css';

export default class Button extends PureComponent {
  static propTypes = {
    label     : PropTypes.string,
    size      : PropTypes.oneOf(['sm', 'md', 'lg']),
    shape     : PropTypes.oneOf(['solid', 'ghost', 'flat', 'inline']),
    duty      : PropTypes.oneOf(['simple', 'danger', 'success']),
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    className : PropTypes.string,
    icon      : PropTypes.string,
    iconColor : PropTypes.string,
    iconSize  : PropTypes.number,
    fullWidth : PropTypes.bool,
    sharp     : PropTypes.bool,
    type      : PropTypes.string,
    inline    : PropTypes.bool,
  };

  static defaultProps = {
    label     : null,
    size      : 'md',
    shape     : 'solid',
    duty      : 'simple',
    disabled  : false,
    onClick   : null,
    className : '',
    icon      : '',
    iconColor : 'inherit',
    iconSize  : 18,
    fullWidth : false,
    sharp     : false,
    type      : 'button',
    inline    : false,
  };
  
  render() {
    const {
      label,
      size,
      shape,
      duty,
      onClick,
      disabled,
      className,
      icon,
      iconSize,
      iconColor,
      fullWidth,
      sharp,
      type,
      inline,
    } = this.props;

    return (
      <button
        styleName={`button button_size_${
          size
        } button_shape_${
          shape
        } button_duty_${
          duty
        } ${
          className
        } ${
          fullWidth ? 'button_full' : ''
        } ${
          sharp ? 'button_sharp' : ''
        } ${
          icon ? 'button-icon' : ''
        } ${
          inline ? 'button_inline' : ''
        } ${
          icon && !label ? 'button-icon_pure' : ''
        }`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {
          icon &&
          <i
            className="material-icons"
            style={{
              color    : iconColor,
              fontSize : iconSize
            }}
          >
            {icon}
          </i>
        }
        <span>{label}</span>
      </button>
    );
  }
}
