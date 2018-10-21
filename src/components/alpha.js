import React, { PureComponent } from 'react';

import Formsy from 'formsy-react';

import Button from './button';
import TextField from './text-field';

import '../css/alpha.css';

const rpClasses = [
  'mightyfighter',
  'agileranger',
  'nerfedwizard',
  'trickyrogue',
  'lawfulpaladin',
  'charismaticbard',
  'kindcleric',
  'ragingbarbarian',
  'calmmonk',
  'arcanesorcerer',
  'homelessdruid',
  'lovecraftianwarlock',
];

export default class Alpha extends PureComponent {
    state = {
      members : 1,
    }
    
    getTextFields = () => {
      const { members } = this.state;
      const fields = [];
      
      for (let i = 0; i < members; i += 1) {
        const cls = i < 12 ? rpClasses[i] : 'wowsomanyfriends';
        fields.push(<TextField
          key={`email-${i}`}
          name={`email-${i}`}
          validations="isEmail"
          placeholder={`${cls}@example.com`}
        />);
      }
      
      return fields;
    }
    
    addMember = () => {
      const { members } = this.state;
      
      this.setState({
        members : members + 1
      });
    }
    
    render() {
      return (
        <main
          styleName="container"
        >
          <div styleName="title__wrap">
            <div>
              <p styleName="title">Adventure</p>
              <p styleName="title">
                Companion
                <span styleName="sign">α</span>
              </p>
            </div>
            <div>
              <p styleName="disclaimer">
                These emails will never be shared with any 3rd parties,
                such as evil cults of all sorts or advertisement-mongers.
                Nor will it be used with any intention other than informing
                on the Closed Alpha&apos;s status and ranting about the
                meaninglessness of a pineapple pizza.
              </p>
              <p styleName="disclaimer">
                All user-created data may probably be lost at the end of the Closed Alpha
                in a bizzare accident of some kind or by the will of the God of Removal (aka Rm-Rf).
              </p>
            </div>
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
              <div styleName="fields-container">
                {this.getTextFields()}
                <Button
                  label="Add member"
                  shape="flat"
                  duty="success"
                  size="sm"
                  icon="add"
                  onClick={this.addMember}
                />
              </div>
              <Button
                duty="success"
                label="Send"
                type="submit"
                shape="solid"
              />
            </Formsy>
          </div>
        </main>
      );
    }
}
