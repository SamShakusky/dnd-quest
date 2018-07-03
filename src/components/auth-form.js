import React, { PureComponent } from 'react';
import Button from './Button';

// import localhost from '../config/localhost';
import '../css/form.css';

export default class AuthForm extends PureComponent {
  // handleClick = () => {
  //   const requestOptions = {
  //     method : 'GET'
  //   };
    
  //   fetch(`${localhost}/auth/google`, requestOptions)
  //     .then((response) => {
  //       // console.log(response);
  //     });
  // }
  
  render() {
    // const {

    // } = this.props;
    
    return (
      <div styleName="form">
        <h1 styleName="form-title">LogIn</h1>
        <div styleName="buttons">
          <Button label="google" onClick={this.handleClick} />
          <Button label="facebook" />
        </div>
      </div>
    );
  }
}
