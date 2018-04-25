import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import QuestManager from './QuestManager';
import Spec from './Spec';
import Main from './Main';
import Menu from './Menu';

import './css/App.css';
import './css/Spec.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="header">
            <Menu />
          </header>

          <Route exact path="/" component={Main} />
          <Route path="/quest-manager" component={QuestManager} />
          <Route path="/spec" component={Spec} />

        </div>
      </BrowserRouter>
    );
  }
}
