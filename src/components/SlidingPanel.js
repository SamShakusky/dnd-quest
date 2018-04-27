import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/SlidingPanel.css';

const modalRoot = document.getElementById('modal-root');

export default class SlidingPanel extends Component {
  static propTypes = {
    isShown   : PropTypes.bool,
    side      : PropTypes.oneOf(['left', 'right']),
    onClose   : PropTypes.func,
    noOverlay : PropTypes.bool,
    children  : PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
  };
  
  static defaultProps = {
    isShown   : false,
    side      : 'left',
    noOverlay : false,
    onClose   : null,
    children  : null
  };
  
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el);
    
    document.onkeydown = (event) => {
      const { onClose, isShown } = this.props;
      const isEscape = (event.keyCode === 27);

      if (isEscape && isShown) {
        onClose();
      }
    };
  }
  
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  render() {
    const {
      isShown,
      side,
      onClose,
      noOverlay
    } = this.props;
    
    const Panel = (
      <div className={`sliding-panel sliding-panel_side_${
        side
      } ${
        isShown ? 'sliding-panel_active' : ''
      } ${
        noOverlay ? 'sliding-panel_no-overlay' : ''
      }`}
      >
        <div className="sliding-panel_body">
          {this.props.children}
        </div>
        { <div onClick={onClose} className="sliding-panel_overlay" /> }
      </div>
    );
    
    return ReactDOM.createPortal(
      Panel,
      this.el
    );
  }
}
