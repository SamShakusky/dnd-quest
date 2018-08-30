import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from './modal';
import Button from './button';

import '../css/prompt.css';

export default class Prompt extends PureComponent {
  static propTypes = {
    isShown     : PropTypes.bool,
    onClose     : PropTypes.func.isRequired,
    onConfirm   : PropTypes.func.isRequired,
    title       : PropTypes.string.isRequired,
    text        : PropTypes.string,
    confirmText : PropTypes.string,
    cancelText  : PropTypes.string,
  };
  
  static defaultProps = {
    isShown     : false,
    text        : '',
    confirmText : 'Confirm',
    cancelText  : 'Cancel',
  };
  
  render() {
    const {
      title,
      text,
      confirmText,
      cancelText,
      onConfirm,
      onClose,
      isShown
    } = this.props;
    
    return (
      <Modal
        onClose={onClose}
        isShown={isShown}
      >
        <div styleName="prompt">
          <h3 styleName="prompt__title">{title}</h3>
          <p styleName="prompt__text">{text}</p>
          <div styleName="prompt__buttons">
            <Button
              label={cancelText}
              onClick={onClose}
              shape="flat"
              size="sm"
            />
            <Button
              label={confirmText}
              onClick={onConfirm}
              shape="flat"
              size="sm"
            />
          </div>
        </div>
      </Modal>
    );
  }
}
