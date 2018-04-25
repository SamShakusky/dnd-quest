import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
  static propTypes = {
    onClick  : PropTypes.func
  };

  static defaultProps = {
    onClick  : null
	};
  
  render() {
    const { onClick } = this.props;
    
    return (
      <ul className="menu">
        <li><NavLink onClick={onClick} className="link-dark" exact to="/">Home</NavLink></li>
        <li><NavLink onClick={onClick} className="link-dark" to="/quest-manager">Quest Manager</NavLink></li>
        <li><NavLink onClick={onClick} className="link-dark" to="/spec">Spec</NavLink></li>
      </ul>
    );
  }
}
