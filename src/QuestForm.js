import React from 'react';

export const QuestForm = props => (
  <div className={`quest-form ${props.className}`}>
    <form onSubmit={props.onSubmit}>
      <input placeholder="Title" name="title" value={props.title} onChange={props.onChange} />
      <input placeholder="Description" name="description" value={props.description} onChange={props.onChange} />
      <input placeholder="Goal" name="goal" value={props.goal} onChange={props.onChange} />
      <button>Go</button>
    </form>
    <div onClick={props.onFormClose} className="overlay" />
  </div>
);
