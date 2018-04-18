import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unfolded : true
    };
  }
  
  render() {
    return (
        <div>
          {
            this.state.unfolded && 
            <ul className="menu">
              <li><NavLink className="link-light" exact to="/">Home</NavLink></li>
              <li><NavLink className="link-light" to="/quest-manager">Quest Manager</NavLink></li>
              <li><NavLink className="link-light" to="/spec">Spec</NavLink></li>
            </ul>
          }
        </div>
    );
  }
}
