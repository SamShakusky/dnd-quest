import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../actions/user-actions';
import '../css/menu.css';

class Menu extends PureComponent {
  static propTypes = {
    signOut   : PropTypes.func.isRequired,
    closeMenu : PropTypes.func.isRequired
  };
  
  state = {
    readyForInstall : false,
    prompt          : null,
  };
  
  componentDidMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.setState({
        prompt          : e,
        readyForInstall : true
      });
    });
  }
  
  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
    this.props.closeMenu();
  }
  
  install = (e) => {
    e.preventDefault();
    
    const { prompt } = this.state;
    prompt.prompt();
    prompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt'); // eslint-disable-line
        } else {
          console.log('User dismissed the A2HS prompt'); // eslint-disable-line
        }
        this.setState({
          prompt          : null,
          readyForInstall : false,
        });
      });
  }
  
  render() {
    const { closeMenu } = this.props;
    const { readyForInstall } = this.state;
    
    return (
      <ul styleName="menu">
        <li><NavLink onClick={closeMenu} className="link-dark" to="/campaigns">Campaign Manager</NavLink></li>
        <li><NavLink onClick={closeMenu} className="link-dark" to="/manager">Quest Manager</NavLink></li>
        <li><NavLink onClick={closeMenu} className="link-dark" to="/spec">Spec</NavLink></li>
        { readyForInstall && <li><a onClick={this.install} href="/install" className="link-dark">Install</a></li> }
        <li><a onClick={this.signOut} href="/signout" className="link-dark">Signout</a></li>
      </ul>
    );
  }
}

export default connect(null, {
  signOut
})(Menu);
