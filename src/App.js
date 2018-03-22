import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import QuestManager from './QuestManager';
import Spec from './Spec';
import Main from './Main';
import { Text } from './Text';

import './css/App.css';
import './css/Spec.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="header">
            <Text size="lg">Header</Text>
            <ul className="menu">
              <li><NavLink className="link-light" exact to="/">Home</NavLink></li>
              <li><NavLink className="link-light" to="/quest-manager">Quest Manager</NavLink></li>
              <li><NavLink className="link-light" to="/spec">Spec</NavLink></li>
            </ul>
          </header>

          <Route exact path="/" component={Main} />
          <Route path="/quest-manager" component={QuestManager} />
          <Route path="/spec" component={Spec} />

        </div>
      </BrowserRouter>
    );
  }
}
