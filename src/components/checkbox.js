import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../css/checkbox.css';

export default class Checkbox extends PureComponent {
  static propTypes = {
    label    : PropTypes.string,
    size     : PropTypes.oneOf(['sm', 'md', 'lg']),
    round    : PropTypes.bool,
    onClick  : PropTypes.func,
    disabled : PropTypes.bool,
    id       : PropTypes.string.isRequired,
  };

  static defaultProps = {
    label    : null,
    size     : 'md',
    round    : false,
    disabled : false,
    onClick  : null,
  };
  
  render() {
    const {
      label,
      size,
      round,
      onClick,
      disabled,
      id
    } = this.props;

    return (
      <label
        htmlFor={id}
        styleName={`checkbox checkbox_${
          size
        } ${
          round ? 'checkbox_round' : ''
        }`
      }
      >
        <input styleName="checkbox__input" id={id} type="checkbox" />
        { label && <span styleName="checkbox__label">{label}</span> }
        <div styleName="box">
          <i className="material-icons">check</i>
        </div>
      </label>
    );
  }
}
