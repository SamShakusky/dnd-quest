import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Input from './Input';
import Button from './Button';

import '../css/QuestForm.css';

export default function QuestForm(props) {
  return (
    <Formsy onValidSubmit={props.onSubmit} className="quest-form">
      <Input label="Title" name="title" value={props.title} onChange={props.onChange} required />
      <Input label="Description" name="description" value={props.description} onChange={props.onChange} />
      <Input label="Goal" name="goal" value={props.goal} onChange={props.onChange} />
      <div className="form_buttons">
        <Button type="submit" label={props.editing ? 'Edit' : 'Create'} shape="flat" size="sm" />
        {(props.editing && <Button label="Delete" shape="flat" size="sm" duty="danger" onClick={props.onDelete} className="quest-delete" />)}
      </div>
    </Formsy>
  );
}

QuestForm.propTypes = {
  title       : PropTypes.string.isRequired,
  description : PropTypes.string,
  goal        : PropTypes.string.isRequired,
  editing     : PropTypes.string,
  onSubmit    : PropTypes.func.isRequired,
  onChange    : PropTypes.func.isRequired,
  onDelete    : PropTypes.func.isRequired
};

QuestForm.defaultProps = {
  description : '',
  editing     : ''
};
