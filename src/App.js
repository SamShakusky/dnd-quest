import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import QuestManager from "./QuestManager";
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
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/quest-manager">Quest Manager</NavLink></li>
              <li><NavLink to="/spec">Spec</NavLink></li>
            </ul>
          </header>
          <main className="content">
            <Route path="/" component={QuestManager}/>
          </main>
        </div>
      </HashRouter>
    );
  }
}
