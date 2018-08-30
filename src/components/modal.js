import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/modal.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends PureComponent {
  static propTypes = {
    isShown  : PropTypes.bool,
    onClose  : PropTypes.func,
    children : PropTypes.node
  };
  
  static defaultProps = {
    isShown  : false,
    onClose  : null,
    children : null
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
  
  get modal() {
    const {
      isShown,
      onClose,
    } = this.props;
    
    return (
      <div styleName={`modal ${
        isShown ? 'modal_active' : ''
      }`}
      >
        <div styleName="modal__body">
          {this.props.children}
        </div>
        { <div onClick={onClose} styleName="modal__overlay" /> }
      </div>
    );
  }
  
  render() {
    return ReactDOM.createPortal(
      this.modal,
      this.el
    );
  }
}
