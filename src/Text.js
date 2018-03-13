import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Text extends Component {

  static propTypes = {
		children         : PropTypes.string.isRequired,
		size          : PropTypes.oneOf(['lg', 'md', 'sm'])
  };

  static defaultProps = {
    children : 'You should add some text',
    size : 'md'
	};
  
  render() {
    const { size, children } = this.props;

    return (
      <p className={`text text-${size}`} >{children}</p>
    );
  }
}
