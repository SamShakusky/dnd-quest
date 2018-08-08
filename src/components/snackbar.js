import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../css/snackbar.css';

const modalRoot = document.getElementById('modal-root');

export default class Snackbar extends PureComponent {
  static propTypes = {
    message : PropTypes.string.isRequired,
    duty    : PropTypes.oneOf(['normal', 'danger', 'success', 'warning']),
  };
  
  static defaultProps = {
    duty : 'normal',
  };
  
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  get bar() {
    const { message, duty } = this.props;
    
    return (
      <div styleName={`snackbar snackbar_${duty}`}>
        <p styleName="snackbar__text">{message}</p>
      </div>
    );
  }
  
  render() {
    return ReactDOM.createPortal(
      this.bar,
      this.el
    );
  }
}
