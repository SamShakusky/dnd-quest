import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import TextField from './TextField';
import Button from './Button';

import '../css/QuestForm.css';

export default class QuestForm extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    goal        : PropTypes.string,
    reward      : PropTypes.string,
    editing     : PropTypes.string,
    onSubmit    : PropTypes.func.isRequired,
    onChange    : PropTypes.func.isRequired,
    onDelete    : PropTypes.func.isRequired,
    onClose     : PropTypes.func.isRequired
  };
  
  static defaultProps = {
    description : '',
    goal        : '',
    reward      : '',
    editing     : ''
  };
  
  render() {
    const {
      title,
      description,
      goal,
      reward,
      editing,
      onSubmit,
      onChange,
      onDelete,
      onClose
    } = this.props;
    
    return (
      <Formsy onValidSubmit={onSubmit} styleName="quest-form">
        <TextField label="Title" name="title" value={title} onChange={onChange} required />
        <TextField label="Goal" name="goal" value={goal} onChange={onChange} />
        <TextField label="Reward" name="reward" value={reward} onChange={onChange} />
        <TextField fieldType="textarea" label="Description" name="description" value={description} onChange={onChange} />
        <div className="form_buttons">
          <Button type="submit" label={editing ? 'Edit' : 'Create'} shape="flat" size="sm" />
          {(editing ?
            <Button label="Delete" shape="flat" size="sm" duty="danger" onClick={onDelete} />
            :
            <Button label="Cancel" shape="flat" size="sm" duty="danger" onClick={onClose} />
          )}
        </div>
      </Formsy>
    );
  }
}
