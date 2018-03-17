import React from 'react';

export const QuestForm = props => (
  <div className={`quest-form ${props.className}`}>
    <form onSubmit={props.onSubmit}>
      <input placeholder="Title" name="title" value={props.title} onInput={props.onChange} />
      <input placeholder="Description" name="description" value={props.description} onInput={props.onChange} />
      <input placeholder="Goal" name="goal" value={props.goal} onInput={props.onChange} />
      <button>Go</button>
    </form>
    <div onClick={props.onFormClose} className="overlay" />
  </div>
);
