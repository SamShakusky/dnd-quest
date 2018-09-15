import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/snackbar.css';

import { clearError } from '../actions/error-actions';

const modalRoot = document.getElementById('modal-root');

class Snackbar extends PureComponent {
  static propTypes = {
    message    : PropTypes.string.isRequired,
    duty       : PropTypes.oneOf(['normal', 'danger', 'success', 'warning']),
    clearError : PropTypes.func.isRequired,
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
    this.clear();
  }
  
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  get bar() {
    const { message, duty } = this.props;
    
    return (
      <div styleName="snackbar">
        <p styleName={`snackbar__text snackbar__text_${duty}`}>{message}</p>
      </div>
    );
  }
  
  clear = () => {
    setTimeout(this.props.clearError, 4000);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.bar,
      this.el
    );
  }
}

export default connect(null, { clearError })(Snackbar);
