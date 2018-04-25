import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';
import logo from '../icons/burger.svg';

export default class ButtonIcon extends Component {
  
  static propTypes = {
    onClick  : PropTypes.func,
    disabled : PropTypes.bool
  };

  static defaultProps = {
    onClick  : null,
    disabled : false
	};
  
  render() {
    const {
      onClick,
      disabled
    } = this.props;

    return (
      <button
        className='button-icon'
        onClick={onClick}
        disabled={disabled}
      >
        <img
          src={logo}
          alt="menu"
          className='button-icon__icon'
        />
      </button>
    );
  }
}
