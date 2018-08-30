import React, { PureComponent } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PrivateRoute from './helpers/private-route';

import CampaignManager from './campaign-manager';
import QuestManager from './quest-manager';
import Spec from './spec';
import Login from './login';

import store from '../store';
import { checkUser } from '../actions/user-actions';

import {
  setCampaign,
} from '../actions/campaign-actions';

const html = document.getElementById('html');

class App extends PureComponent {
  static propTypes = {
    isAuth      : PropTypes.bool,
    credentials : PropTypes.shape({
      accessToken  : PropTypes.string,
      tokenCreated : PropTypes.number,
      userId       : PropTypes.string,
    }),
    checkUser       : PropTypes.func.isRequired,
    currentCampaign : PropTypes.string,
  };
  
  static defaultProps = {
    isAuth          : false,
    credentials     : {},
    currentCampaign : '',
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
        isAuth,
      });
    } else if (isAuth !== prevProps.isAuth) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        isAuth,
      });
    }
  }
  
  checkAuth() {
    const { credentials } = this.state;
    if (!credentials) return false;
    
    return this.props.checkUser();
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
            {/* {isAuth &&
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
                <p>{currentCampaign}</p>
                <div styleName="fullscreen">
                  <Button size="sm" label="fullscreen" onClick={this.toggleFullscreen} />
                </div>
              </header>
            } */}
            
            <Switch>
              <Redirect exact from="/" to="/manager" />
              <Route path="/login" render={props => <Login {...props} isAuth={isAuth} />} />
              <PrivateRoute isAuth={isAuth} credentials={credentials} path="/campaigns" component={CampaignManager} />
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
  credentials     : state.user.credentials,
  isAuth          : state.user.isAuth,
  currentCampaign : state.campaigns.currentCampaign,
});

export default connect(mapStateToProps, { checkUser, setCampaign })(App);
