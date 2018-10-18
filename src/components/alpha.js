import React, { PureComponent } from 'react';

import Formsy from 'formsy-react';

import Button from './button';
import TextField from './text-field';

import '../css/alpha.css';

export default class Alpha extends PureComponent {
    state = {
      ass : false,
    }
    
    render() {
      return (
        <main
          styleName="container"
        >
          <div styleName="title__wrap">
            <p styleName="title">Adventure</p>
            <p styleName="title">
              Companion
              <span styleName="sign">α</span>
            </p>
            
          </div>
          <div styleName="form__wrap">
            <div styleName="form__title">
              <p>Join</p>
              <p>Closed Alpha</p>
            </div>
            <p styleName="party__title">Create a party</p>
            <Formsy
              styleName="form"
            >
              <div>
                <TextField
                  label="Username"
                  name="username"
                  validations={{
                    minLength      : 4,
                    maxLength      : 20,
                    isAlphanumeric : true
                  }}
                  validationErrors={{
                    minLength      : 'Must be between 4 and 20 characters',
                    maxLength      : 'Must be between 4 and 20 characters',
                    isAlphanumeric : 'Must only contain letters or numbers'
                  }}
                  message="Only letters and numbers"
                  required
                />
              </div>
              <Button label="Submit" type="submit" shape="ghost" />
            </Formsy>
          </div>
        </main>
      );
    }
}
