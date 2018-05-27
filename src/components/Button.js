import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

export default class Button extends PureComponent {
  static propTypes = {
    label     : PropTypes.string.isRequired,
    size      : PropTypes.oneOf(['sm', 'md']),
    shape     : PropTypes.oneOf(['solid', 'ghost', 'flat']),
    duty      : PropTypes.oneOf(['simple', 'danger', 'success']),
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    className : PropTypes.string
  };

  static defaultProps = {
    size      : 'md',
    shape     : 'solid',
    duty      : 'simple',
    disabled  : false,
    onClick   : null,
    className : ''
  };

  render() {
    const {
      label,
      size,
      shape,
      duty,
      onClick,
      disabled,
      className
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
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
}
