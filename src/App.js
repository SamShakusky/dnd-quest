import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import QuestManager from './QuestManager';
import Spec from './Spec';
import Main from './Main';
import Menu from './Menu';
import ButtonIcon from './ButtonIcon';
import SlidingPanel from './SlidingPanel';

import './css/App.css';
import './css/Spec.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      menuVisibility : false
    };
  }
  
  toggleMenu = () => {
    this.setState({
      menuVisibility: ! this.state.menuVisibility
    });
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="header">
            <ButtonIcon onClick={this.toggleMenu}/>
            <SlidingPanel
              isShown={this.state.menuVisibility}
              onClose={this.toggleMenu}
            >
              <Menu onClick={this.toggleMenu}/>
            </SlidingPanel>
          </header>

          <Route exact path="/" component={Main} />
          <Route path="/quest-manager" component={QuestManager} />
          <Route path="/spec" component={Spec} />
          
        </div>
      </BrowserRouter>
    );
  }
}
