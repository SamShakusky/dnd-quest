import React, { PureComponent } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import QuestManager from './QuestManager';
import Spec from './Spec';
import Menu from './Menu';
import Button from './Button';
import SlidingPanel from './SlidingPanel';

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
            <Route exact path="/" component={QuestManager} />
            <Route path="/spec" component={Spec} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
