import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../actions/user-actions';
import '../css/Menu.css';

class Menu extends PureComponent {
  static propTypes = {
    signOut   : PropTypes.func.isRequired,
    closeMenu : PropTypes.func.isRequired,
    isAuth    : PropTypes.bool,
  };

  static defaultProps = {
    isAuth : false,
  };
  
  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
    this.props.closeMenu();
  }
  
  render() {
    const { closeMenu, isAuth } = this.props;
    
    return (
      <ul styleName="menu">
        <li><NavLink onClick={closeMenu} className="link-dark" to="/manager">Quest Manager</NavLink></li>
        <li><NavLink onClick={closeMenu} className="link-dark" to="/spec">Spec</NavLink></li>
        {isAuth && <li><a onClick={this.signOut} href="/signout" className="link-dark">Signout</a></li>}
      </ul>
    );
  }
}

export default connect(null, {
  signOut
})(Menu);
