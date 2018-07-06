import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../css/Menu.css';

export default class Menu extends PureComponent {
  static propTypes = {
    closeMenu : PropTypes.func,
    logOut    : PropTypes.func,
    isAuth    : PropTypes.bool,
  };

  static defaultProps = {
    closeMenu : null,
    logOut    : null,
    isAuth    : false,
  };
  
  handleLogOut = (e) => {
    e.preventDefault();
    this.props.logOut();
    this.props.closeMenu();
  }
  
  render() {
    const { closeMenu, isAuth } = this.props;
    
    return (
      <ul styleName="menu">
        <li><NavLink onClick={closeMenu} className="link-dark" to="/manager">Quest Manager</NavLink></li>
        <li><NavLink onClick={closeMenu} className="link-dark" to="/spec">Spec</NavLink></li>
        {isAuth && <li><a onClick={this.handleLogOut} href="/logout" className="link-dark">Logout</a></li>}
      </ul>
    );
  }
}
