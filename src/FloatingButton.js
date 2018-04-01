import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Button.css';

export default class FloatingButton extends Component {
  
  static propTypes = {
    onClick  : PropTypes.func.isRequired,
    disabled : PropTypes.bool,
    position : PropTypes.oneOf(['left','right','inline'])
  };

  static defaultProps = {
    disabled : false,
    position : 'right'
	};
  
  render() {
    const {
      onClick,
      disabled,
      position
    } = this.props;

    return (
      <button
        className={`floating-button floating-button_position_${
          position
        }`}
        onClick={onClick}
        disabled={disabled}
      >
      <span>+</span>
      </button>
    );
  }
}
