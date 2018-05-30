import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

export default class Button extends PureComponent {
  static propTypes = {
    label     : PropTypes.string,
    size      : PropTypes.oneOf(['sm', 'md']),
    shape     : PropTypes.oneOf(['solid', 'ghost', 'flat']),
    duty      : PropTypes.oneOf(['simple', 'danger', 'success']),
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    className : PropTypes.string,
    icon      : PropTypes.string,
    noActive  : PropTypes.bool,
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
    noActive  : false,
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
      noActive
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
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
        {icon && <img
          src={icon}
          alt="menu"
          styleName="button__icon"
        />}
      </button>
    );
  }
}
