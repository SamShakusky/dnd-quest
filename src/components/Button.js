import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import Prompt from './prompt';

import '../css/button.css';

const confirmationShape = {
  title       : PropTypes.string,
  text        : PropTypes.string,
  confirmText : PropTypes.string,
  cancelText  : PropTypes.string,
};

export default class Button extends PureComponent {
  static propTypes = {
    label        : PropTypes.string,
    size         : PropTypes.oneOf(['sm', 'md', 'lg']),
    shape        : PropTypes.oneOf(['solid', 'ghost', 'flat', 'inline']),
    duty         : PropTypes.oneOf(['simple', 'light', 'danger', 'success']),
    onClick      : PropTypes.func,
    disabled     : PropTypes.bool,
    className    : PropTypes.string,
    icon         : PropTypes.string,
    iconColor    : PropTypes.string,
    iconSize     : PropTypes.number,
    fullWidth    : PropTypes.bool,
    sharp        : PropTypes.bool,
    type         : PropTypes.string,
    inline       : PropTypes.bool,
    confirmation : PropTypes.shape(confirmationShape),
  };

  static defaultProps = {
    label        : null,
    size         : 'md',
    shape        : 'solid',
    duty         : 'simple',
    disabled     : false,
    onClick      : null,
    className    : '',
    icon         : '',
    iconColor    : 'inherit',
    iconSize     : 18,
    fullWidth    : false,
    sharp        : false,
    type         : 'button',
    inline       : false,
    confirmation : null,
  };
  
  state = {
    promptShown : false
  }
  
  showPrompt = () => {
    this.setState({
      promptShown : true,
    });
  }
  
  hidePrompt = () => {
    this.setState({
      promptShown : false,
    });
  }
  
  confirm = () => {
    this.props.onClick();
    this.hidePrompt();
  }
  
  render() {
    const {
      label,
      size,
      shape,
      duty,
      onClick,
      disabled,
      className,
      icon,
      iconSize,
      iconColor,
      fullWidth,
      sharp,
      type,
      inline,
      confirmation,
    } = this.props;

    const { promptShown } = this.state;
    
    return (
      <Fragment>
        <button
          styleName={`button button_size_${
            size
          } button_shape_${
            shape
          } button_duty_${
            duty
          } ${
            className
          } ${
            fullWidth ? 'button_full' : ''
          } ${
            sharp ? 'button_sharp' : ''
          } ${
            icon ? 'button-icon' : ''
          } ${
            inline ? 'button_inline' : ''
          } ${
            icon && !label ? 'button-icon_pure' : ''
          }`}
          onClick={confirmation ? this.showPrompt : onClick}
          disabled={disabled}
          type={type}
        >
          {
            icon &&
            <i
              className="material-icons"
              style={{
                color    : iconColor,
                fontSize : iconSize
              }}
            >
              {icon}
            </i>
          }
          <span>{label}</span>
        </button>
        { confirmation &&
          <Prompt
            {...confirmation}
            isShown={promptShown}
            onClose={this.hidePrompt}
            onConfirm={this.confirm}
          />
        }
      </Fragment>
    );
  }
}
