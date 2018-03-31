import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Button.css';

export default class Button extends Component {
  
  static propTypes = {
		label   : PropTypes.string.isRequired,
    size    : PropTypes.oneOf(['sm', 'md', 'lg']),
    shape    : PropTypes.oneOf(['solid','ghost','flat']),
    onClick : PropTypes.func.isRequired
  };

  static defaultProps = {
    size : 'md',
    shape : 'solid'
	};
  
  // onEdit = id => {
  //   this.props.onEdit(this.props.id);
  // }

  render() {
    const { label, size, shape, onClick } = this.props;

    return (
      <button
        className={`button button_size_${
            size
          } button_shape_${
            shape
          }`
        }
        onClick={onClick}
      >
      {label}
      </button>
    );
  }
}
