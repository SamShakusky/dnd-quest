import React, { PureComponent } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './helpers/private-route';
import axios from 'axios';

import QuestManager from './QuestManager';
import Spec from './Spec';
import Menu from './Menu';
import Login from './login';
import Button from './Button';
import SlidingPanel from './SlidingPanel';

import localhost from '../config/localhost';
import '../css/App.css';

const html = document.getElementById('html');

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      menuVisibility : false,
      isAuth         : false,
      accessToken    : localStorage.getItem('access_token'),
      userId         : localStorage.getItem('user_id')
    };
    this.checkAuth();
  }
  
  componentDidMount() {
  
  }
  
  checkAuth() {
    const { accessToken, userId } = this.state;
    
    if (!accessToken || !userId) return false;
    
    return axios.get(`${localhost}/api/Users/${userId}?access_token=${accessToken}`)
      .then(() => {
        this.logIn(accessToken, userId);
        return true;
      }, () => false);
  }
  
  logIn = (accessToken, userId) => {
    this.setState({
      isAuth : true,
      accessToken,
      userId
    });
  }
  
  logOut = () => {
    const { accessToken } = this.state;
    
    return axios.post(`${localhost}/api/Users/logout?access_token=${accessToken}`)
      .then(() => {
        this.setState({ isAuth : false });
        return true;
      }, () => false);
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
    const { isAuth, accessToken } = this.state;
    
    return (
      <BrowserRouter>
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
                <Menu closeMenu={this.toggleMenu} logOut={this.logOut} isAuth={isAuth} />
              </SlidingPanel>
              <div styleName="fullscreen">
                <Button size="sm" label="fullscreen" onClick={this.toggleFullscreen} />
              </div>
            </header>
          }
          
          <Switch>
            <Redirect exact from="/" to="/manager" />
            <Route path="/login" render={props => <Login {...props} isAuth={isAuth} logIn={this.logIn} />} />
            <PrivateRoute isAuth={isAuth} accessToken={accessToken} path="/manager" component={QuestManager} />
            <PrivateRoute isAuth={isAuth} path="/spec" component={Spec} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
