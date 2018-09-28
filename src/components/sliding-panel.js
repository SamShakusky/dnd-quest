import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/sliding-panel.css';

const modalRoot = document.getElementById('modal-root');

export default class SlidingPanel extends PureComponent {
  static propTypes = {
    isShown   : PropTypes.bool,
    side      : PropTypes.oneOf(['left', 'right']),
    onClose   : PropTypes.func,
    noOverlay : PropTypes.bool,
    children  : PropTypes.node
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
  
  get panel() {
    const {
      isShown,
      side,
      onClose,
      noOverlay
    } = this.props;
    
    return (
      <div styleName={`sliding-panel sliding-panel_side_${
        side
      } ${
        isShown ? 'sliding-panel_active' : ''
      } ${
        noOverlay ? 'sliding-panel_no-overlay' : ''
      }`}
      >
        <div styleName="sliding-panel_body">
          {this.props.children}
        </div>
        { <div onClick={onClose} styleName="sliding-panel_overlay" /> }
      </div>
    );
  }
  
  render() {
    return ReactDOM.createPortal(
      this.panel,
      this.el
    );
  }
}
