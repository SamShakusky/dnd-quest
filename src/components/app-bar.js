import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Button from './Button';
import SlidingPanel from './SlidingPanel';

import '../css/app-bar.css';

const modalRoot = document.getElementById('modal-root');

export default class AppBar extends PureComponent {
  static propTypes = {
    title      : PropTypes.string,
    modeIcon   : PropTypes.string,
    modeChange : PropTypes.func,
  };
  
  static defaultProps = {
    title      : '',
    modeIcon   : '',
    modeChange : null,
    
  };
  
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  
  state = {
    menuVisibility : false,
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  get bar() {
    const {
      title,
      modeIcon,
      modeChange
    } = this.props;
    const { menuVisibility } = this.state;
    
    return (
      <header styleName="bar">
        <Button
          onClick={this.toggleMenu}
          icon="menu"
          iconSize={36}
          iconColor="#fff"
          shape="flat"
          noActive
        />
        <p>{title}</p>
        <div styleName="bar__actions">
          { modeChange && <Button
            icon={modeIcon}
            onClick={modeChange}
            iconSize={24}
            iconColor="#fff"
            shape="flat"
            noActive
          />}
        </div>
        <SlidingPanel
          isShown={menuVisibility}
          onClose={this.toggleMenu}
        >
          <Menu closeMenu={this.toggleMenu} />
        </SlidingPanel>
      </header>
    );
  }
  
  toggleMenu = () => {
    this.setState({
      menuVisibility : !this.state.menuVisibility
    });
  }
  
  render() {
    return ReactDOM.createPortal(
      this.bar,
      this.el
    );
  }
}
