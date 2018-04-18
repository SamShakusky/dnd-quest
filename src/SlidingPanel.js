import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/SlidingPanel.css';

export default class SlidingPanel extends Component {
  static propTypes = {
    isShown : PropTypes.bool,
    side    : PropTypes.oneOf(['left', 'right']),
    onClose : PropTypes.func
  };
  
  static defaultProps = {
    isShown : false,
    side    : 'left'
  };
  
  render() {
    const {
      isShown,
      side,
      onClose
    } = this.props;
    
    return (
      <div className={`sliding-panel sliding-panel_side_${
        side
      } ${
        isShown ? 'sliding-panel_active' : ''
      }`}>
        <div className="sliding-panel_body">
          {this.props.children}
        </div>
        <div onClick={onClose} className="sliding-panel_overlay" />
      </div>
    );
  }
}
