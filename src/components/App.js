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
        this.logIn();
        return true;
      }, () => false);
  }
  
  logIn = () => {
    this.setState({ isAuth : true });
  }
  
  logOut = () => {
    this.setState({ isAuth : false });
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
    const { isAuth } = this.state;
    
    return (
      <BrowserRouter>
        <div className="App">
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
              <Menu onClick={this.toggleMenu} />
            </SlidingPanel>
            <div styleName="fullscreen">
              <Button size="sm" label="fullscreen" onClick={this.toggleFullscreen} />
            </div>
          </header>
          <Switch>
            <Redirect exact from="/" to="/manager" />
            <PrivateRoute isAuth={isAuth} path="/manager" component={QuestManager} />
            <Route path="/login" render={() => <Login isAuth={isAuth} logIn={this.logIn} />} />
            <Route path="/spec" component={Spec} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
