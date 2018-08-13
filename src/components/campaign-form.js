import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import TextField from './TextField';
import Button from './Button';

import '../css/QuestForm.css';

const hiddenSubmit = {
  pointerEvents : 'none',
  opacity       : 0
};

export default class CampaignForm extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    editing     : PropTypes.string,
    onSubmit    : PropTypes.func.isRequired,
    onChange    : PropTypes.func.isRequired,
    onDelete    : PropTypes.func.isRequired,
    onClose     : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    description : '',
    editing     : ''
  };
  
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
  }
  
  render() {
    const {
      title,
      description,
      editing,
      onSubmit,
      onChange,
      onDelete,
      onClose,
    } = this.props;
    
    return (
      <Formsy onValidSubmit={onSubmit} styleName="quest-form">
        <div styleName="form-wrap">
          <div styleName="form_buttons">
            {(editing ?
              <Button icon="delete_outline" iconSize={24} shape="flat" duty="danger" onClick={onDelete} sharp noActive />
              :
              <Button icon="close" iconSize={24} shape="flat" duty="danger" onClick={onClose} sharp noActive />
            )}
          </div>
          <p styleName="form-label">Main</p>
          <TextField label="Title" name="title" value={title} onChange={onChange} required />
          <TextField fieldType="textarea" label="Description" name="description" value={description} onChange={onChange} />
        </div>
        <button ref={this.submitRef} style={hiddenSubmit} />
      </Formsy>
    );
  }
}
