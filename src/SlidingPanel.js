import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './css/SlidingPanel.css';

const modalRoot = document.getElementById('modal-root');

export default class SlidingPanel extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  
  static propTypes = {
    isShown : PropTypes.bool,
    side    : PropTypes.oneOf(['left', 'right']),
    onClose : PropTypes.func
  };
  
  static defaultProps = {
    isShown : false,
    side    : 'left'
  };
  
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  render() {
    const {
      isShown,
      side,
      onClose
    } = this.props;
    
    const SlidingPanel = (
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
    )
    
    return ReactDOM.createPortal(
      SlidingPanel,
      this.el
    );
  }
}
