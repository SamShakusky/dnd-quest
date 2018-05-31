import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

export default class FloatingButton extends PureComponent {
  static propTypes = {
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    position  : PropTypes.oneOf(['left', 'right', 'inline']),
    icon      : PropTypes.string,
    iconColor : PropTypes.string,
  };

  static defaultProps = {
    onClick   : null,
    disabled  : false,
    position  : 'right',
    icon      : 'add',
    iconColor : '#fff'
  };
  
  render() {
    const {
      onClick,
      disabled,
      position,
      icon,
      iconColor,
    } = this.props;

    return (
      <button
        styleName={`floating-button floating-button_position_${
          position
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        <i
          className="material-icons"
          style={{ color : iconColor }}
        >
          {icon}
        </i>
      </button>
    );
  }
}
