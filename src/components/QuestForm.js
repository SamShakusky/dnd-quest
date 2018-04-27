import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Input from './Input';
import Button from './Button';

import '../css/QuestForm.css';

export default class QuestForm extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    goal        : PropTypes.string.isRequired,
    editing     : PropTypes.string,
    onSubmit    : PropTypes.func.isRequired,
    onChange    : PropTypes.func.isRequired,
    onDelete    : PropTypes.func.isRequired
  };
  
  static defaultProps = {
    description : '',
    editing     : ''
  };
  
  render() {
    const {
      onSubmit,
      title,
      description,
      onChange,
      goal,
      editing,
      onDelete
    } = this.props;

    return (
  
      <Formsy onValidSubmit={onSubmit} className="quest-form">
        <Input label="Title" name="title" value={title} onChange={onChange} required />
        <Input label="Description" name="description" value={description} onChange={onChange} />
        <Input label="Goal" name="goal" value={goal} onChange={onChange} />
        <div className="form_buttons">
          <Button type="submit" label={editing ? 'Edit' : 'Create'} shape="flat" size="sm" />
          {(editing && <Button label="Delete" shape="flat" size="sm" duty="danger" onClick={onDelete} className="quest-delete" />)}
        </div>
      </Formsy>
    );
  }
}
