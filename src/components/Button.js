import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

export default class Button extends PureComponent {
  static propTypes = {
    label     : PropTypes.string,
    size      : PropTypes.oneOf(['sm', 'md', 'lg']),
    shape     : PropTypes.oneOf(['solid', 'ghost', 'flat']),
    duty      : PropTypes.oneOf(['simple', 'danger', 'success']),
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    className : PropTypes.string,
    icon      : PropTypes.string,
    iconColor : PropTypes.string,
    iconSize  : PropTypes.string,
    noActive  : PropTypes.bool,
    fullWidth : PropTypes.bool,
    sharp     : PropTypes.bool
  };

  static defaultProps = {
    label     : '',
    size      : 'md',
    shape     : 'solid',
    duty      : 'simple',
    disabled  : false,
    onClick   : null,
    className : '',
    icon      : '',
    iconColor : 'inherit',
    iconSize  : '',
    noActive  : false,
    fullWidth : false,
    sharp     : false
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
      noActive,
      iconColor,
      fullWidth,
      sharp
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
          label ? 'button_labeled' : ''
        } ${
          noActive ? 'button_no-active' : ''
        } ${
          fullWidth ? 'button_full' : ''
        } ${
          sharp ? 'button_sharp' : ''
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
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
      </button>
    );
  }
}
