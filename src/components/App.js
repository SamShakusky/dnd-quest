import React, { PureComponent } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';

import PrivateRoute from './helpers/private-route';


import QuestManager from './QuestManager';
import Spec from './Spec';
import Menu from './Menu';
import Login from './login';
import Button from './Button';
import SlidingPanel from './SlidingPanel';

import store from '../store';
import localhost from '../config/localhost';
import '../css/App.css';

const html = document.getElementById('html');

class App extends PureComponent {
  static propTypes = {
    isAuth      : PropTypes.bool,
    credentials : PropTypes.shape({
      accessToken  : PropTypes.string,
      tokenCreated : PropTypes.number,
      userId       : PropTypes.string,
    }),
  };
  
  static defaultProps = {
    isAuth      : false,
    credentials : {}
  };
  
  constructor(props) {
    super(props);
    
    const userCredentials = JSON.parse(localStorage.getItem('user_credentials'));
    
    this.state = {
      menuVisibility : false,
      isAuth         : false,
      credentials    : userCredentials ? {
        accessToken : userCredentials.accessToken,
        userId      : userCredentials.userId,
      } : undefined,
    };
    this.checkAuth();
  }
  
  componentDidUpdate(prevProps) {
    const { credentials, isAuth } = this.props;
    
    if (credentials !== prevProps.credentials) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        credentials,
        isAuth
      });
    }
  }
  
  checkAuth() {
    const { credentials } = this.state;
    if (!credentials) return false;
    
    const { accessToken, userId } = credentials;
    
    return axios.get(`${localhost}/api/Users/${userId}?access_token=${accessToken}`)
      .then(() => {
        this.logIn();
        return true;
      }, () => false);
  }
  
  logIn = () => {
    this.setState({
      isAuth : true,
    });
  }
  
  toggleMenu = () => {
    this.setState({
      menuVisibility : !this.state.menuVisibility
    });
  }
  
  toggleFullscreen = () => {
    if (!document.webkitFullscreenElement) html.webkitRequestFullScreen();
    else document.webkitCancelFullScreen();
  }
  
  render() {
    const { isAuth, credentials } = this.state;
    
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            {isAuth &&
              <header styleName="header">
                <Button
                  onClick={this.toggleMenu}
                  icon="menu"
                  iconSize={36}
                  iconColor="#fff"
                  shape="flat"
                  noActive
                />
                <SlidingPanel
                  isShown={this.state.menuVisibility}
                  onClose={this.toggleMenu}
                >
                  <Menu closeMenu={this.toggleMenu} isAuth={isAuth} />
                </SlidingPanel>
                <div styleName="fullscreen">
                  <Button size="sm" label="fullscreen" onClick={this.toggleFullscreen} />
                </div>
              </header>
            }
            
            <Switch>
              <Redirect exact from="/" to="/manager" />
              <Route path="/login" render={props => <Login {...props} isAuth={isAuth} />} />
              <PrivateRoute isAuth={isAuth} credentials={credentials} path="/manager" component={QuestManager} />
              <PrivateRoute isAuth={isAuth} path="/spec" component={Spec} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  credentials : state.user.credentials,
  isAuth      : state.user.isAuth,
});

export default connect(mapStateToProps)(App);
