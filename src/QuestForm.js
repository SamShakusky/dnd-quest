import Formsy from 'formsy-react';
import React from 'react';
import Input from './Input';
import Button from './Button';

import './css/QuestForm.css';

export const QuestForm = props => (
  // <div className={`quest-form ${props.className}`}>
  //   <Formsy onValidSubmit={props.onSubmit}>
  //     <Input label="Title" name="title" value={props.title} onChange={props.onChange} required />
  //     <Input label="Description" name="description" value={props.description} onChange={props.onChange} />
  //     <Input label="Goal" name="goal" value={props.goal} onChange={props.onChange} />
  //     <div className="form_buttons">
  //       <Button type="submit" label={props.editing? 'Edit' : 'Create'} shape="flat" size="sm" />
  //       {(props.editing && <Button label="Delete" shape="flat" size="sm" duty="danger" onClick={props.onDelete} className="quest-delete" />)}
  //     </div>
  //   </Formsy>
  //   <div onClick={props.onFormClose} className="overlay" />
  // </div>
  
  <Formsy onValidSubmit={props.onSubmit} className="quest-form">
    <Input label="Title" name="title" value={props.title} onChange={props.onChange} required />
    <Input label="Description" name="description" value={props.description} onChange={props.onChange} />
    <Input label="Goal" name="goal" value={props.goal} onChange={props.onChange} />
    <div className="form_buttons">
      <Button type="submit" label={props.editing? 'Edit' : 'Create'} shape="flat" size="sm" />
      {(props.editing && <Button label="Delete" shape="flat" size="sm" duty="danger" onClick={props.onDelete} className="quest-delete" />)}
    </div>
  </Formsy>
);
