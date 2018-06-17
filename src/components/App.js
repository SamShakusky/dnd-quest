import React, { PureComponent } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import QuestManager from './QuestManager';
import Spec from './Spec';
import Main from './Main';
import Menu from './Menu';
import Button from './Button';
import SlidingPanel from './SlidingPanel';

import '../css/App.css';

const html = document.getElementById('html');

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      menuVisibility  : false,
      readyForInstall : false,
      prompt          : null,
    };
  }
  
  componentDidMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.setState({
        prompt          : e,
        readyForInstall : true
      });
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
  
  install = () => {
    const { prompt } = this.state;
    prompt.prompt();
    prompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // console.log('User accepted the A2HS prompt');
        } else {
          // console.log('User dismissed the A2HS prompt');
        }
        this.setState({
          prompt : null,
        });
      });
  }
  
  render() {
    const { readyForInstall } = this.state;
    
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
              <Button size="sm" label={readyForInstall} onClick={this.install} />
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
