import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from '../css/button.css';

export default class FloatingButton extends PureComponent {
  static propTypes = {
    onClick   : PropTypes.func,
    disabled  : PropTypes.bool,
    position  : PropTypes.oneOf(['left', 'right', 'inline']),
    icon      : PropTypes.string,
    iconColor : PropTypes.string,
    expanded  : PropTypes.bool,
    label     : PropTypes.string,
  };

  static defaultProps = {
    onClick   : null,
    disabled  : false,
    position  : 'right',
    icon      : 'add',
    iconColor : '#fff',
    expanded  : false,
    label     : '',
  };
  
  render() {
    const {
      onClick,
      disabled,
      position,
      icon,
      iconColor,
      expanded,
      label,
    } = this.props;

    return (
      <button
        styleName={`fab fab_position_${
          position
        }`}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${expanded ? styles.fab_expanded : ''}
        `}
      >
        <i
          className="material-icons"
          style={{ color : iconColor }}
        >
          {icon}
        </i>
        {label && <span styleName="fab__label">{label}</span>}
      </button>
    );
  }
}
