import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

export default class FloatingButton extends PureComponent {
  static propTypes = {
    onClick  : PropTypes.func,
    disabled : PropTypes.bool,
    position : PropTypes.oneOf(['left', 'right', 'inline'])
  };

  static defaultProps = {
    onClick  : null,
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
        styleName={`floating-button floating-button_position_${
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
