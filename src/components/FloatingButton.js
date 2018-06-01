import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from '../css/Button.css';

export default class FloatingButton extends PureComponent {
  static propTypes = {
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    position  : PropTypes.oneOf(['left', 'right', 'inline']),
    icon      : PropTypes.string,
    iconColor : PropTypes.string,
    active    : PropTypes.bool,
  };

  static defaultProps = {
    onClick   : null,
    disabled  : false,
    position  : 'right',
    icon      : 'add',
    iconColor : '#fff',
    active    : false,
  };
  
  render() {
    const {
      onClick,
      disabled,
      position,
      icon,
      iconColor,
      active,
    } = this.props;

    return (
      <button
        styleName={`floating-button floating-button_position_${
          position
        }`}
        onClick={onClick}
        disabled={disabled}
        className={active ? styles['floating-button_active'] : ''}
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
