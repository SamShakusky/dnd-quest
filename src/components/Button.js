import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

export default class Button extends Component {
  
  static propTypes = {
		label    : PropTypes.string.isRequired,
    size     : PropTypes.oneOf(['sm', 'md']),
    shape    : PropTypes.oneOf(['solid','ghost','flat']),
    duty     : PropTypes.oneOf(['simple','danger','success']),
    onClick  : PropTypes.func,
    disabled : PropTypes.bool
  };

  static defaultProps = {
    size     : 'md',
    shape    : 'solid',
    duty     : 'simple',
    disabled : false,
    onClick  : null
	};
  
  // onEdit = id => {
  //   this.props.onEdit(this.props.id);
  // }

  render() {
    const { label, size, shape, duty, onClick, disabled } = this.props;

    return (
      <button
        className={`button button_size_${
          size
        } button_shape_${
          shape
        } button_duty_${
          duty
        }`}
        onClick={onClick}
        disabled={disabled}
      >
      {label}
      </button>
    );
  }
}
