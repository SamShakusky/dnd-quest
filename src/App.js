import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import QuestManager from "./QuestManager";
import Spec from "./Spec";
import Main from "./Main";
import { Text } from './Text';

import './css/App.css';
import './css/reset.css';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <Text size="lg">Header</Text>
            <ul className="menu">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/quest-manager">Quest Manager</NavLink></li>
              <li><NavLink to="/spec">Spec</NavLink></li>
            </ul>
          </header>

          <Route exact path="/" component={Main} />
          <Route path="/quest-manager" component={QuestManager} />
          <Route path="/spec" component={Spec} />

        </div>
      </HashRouter>
    );
  }
}
