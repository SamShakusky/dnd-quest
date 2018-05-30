import React, { PureComponent } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import QuestManager from './QuestManager';
import Spec from './Spec';
import Main from './Main';
import Menu from './Menu';
import Button from './Button';
import SlidingPanel from './SlidingPanel';

import logo from '../icons/burger.svg';
import '../css/App.css';

const html = document.getElementById('html');

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      menuVisibility : false
    };
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
    return (
      <BrowserRouter>
        <div className="App">
          <header styleName="header">
            <Button
              onClick={this.toggleMenu}
              icon="menu"
              iconSize="36px"
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

          <Route exact path="/" component={Main} />
          <Route path="/quest-manager" component={QuestManager} />
          <Route path="/spec" component={Spec} />
          
        </div>
      </BrowserRouter>
    );
  }
}
