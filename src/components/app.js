import React, { PureComponent } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PrivateRoute from './helpers/private-route';

import AdminPanel from './admin-panel';
import CampaignManager from './campaign-manager';
import QuestManager from './quest-manager';
import Spec from './spec';
import Login from './login';
import Alpha from './alpha';
import SetPass from './set-password';
import Snackbar from './snackbar';

import store from '../store';
import { checkUser } from '../actions/user-actions';

import {
  setCampaign,
} from '../actions/campaign-actions';

class App extends PureComponent {
  static propTypes = {
    isAuth      : PropTypes.bool.isRequired,
    credentials : PropTypes.shape({
      accessToken  : PropTypes.string,
      tokenCreated : PropTypes.number,
      userId       : PropTypes.string,
    }),
    checkUser       : PropTypes.func.isRequired,
    currentCampaign : PropTypes.string,
    error           : PropTypes.string.isRequired,
  };
  
  static defaultProps = {
    credentials     : {},
    currentCampaign : '',
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      menuVisibility : false,
    };
    this.checkAuth();
  }
  
  getBasicRedirect = () => {
    const { currentCampaign } = this.props;
    const redirectTo = currentCampaign ? '/quests' : '/campaigns';
    
    return redirectTo;
  }
  
  checkAuth() {
    const { accessToken, userId } = this.props.credentials;
    if (!accessToken || !userId) return false;
    
    return this.props.checkUser();
  }
  
  toggleMenu = () => {
    this.setState({
      menuVisibility : !this.state.menuVisibility
    });
  }
  
  render() {
    const { isAuth, credentials, error } = this.props;
    
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Switch>
              <Redirect exact from="/" to={this.getBasicRedirect()} />
              <Route path="/login" render={props => <Login {...props} isAuth={isAuth} />} />
              <Route path="/alpha" component={Alpha} />
              <Route path="/password" component={SetPass} />
              <PrivateRoute isAuth={isAuth} credentials={credentials} path="/admin" component={AdminPanel} />
              <PrivateRoute isAuth={isAuth} credentials={credentials} path="/campaigns" component={CampaignManager} />
              <PrivateRoute isAuth={isAuth} credentials={credentials} path="/quests" component={QuestManager} />
              <PrivateRoute isAuth={isAuth} path="/spec" component={Spec} />
            </Switch>
            { error && <Snackbar duty="danger" message={error} /> }
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
  error           : state.error.error,
});

export default connect(mapStateToProps, { checkUser, setCampaign })(App);
