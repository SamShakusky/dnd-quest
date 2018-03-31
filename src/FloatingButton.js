import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Button.css';

export default class FloatingButton extends Component {
  
  static propTypes = {
    onClick  : PropTypes.func.isRequired,
    disabled : PropTypes.bool
  };

  static defaultProps = {
    disabled : false
	};
  
  render() {
    const {
      onClick,
      disabled
    } = this.props;

    return (
      <button
        className={`floating-button`}
        onClick={onClick}
        disabled={disabled}
      >
      <span>+</span>
      </button>
    );
  }
}
