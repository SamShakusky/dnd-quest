import React, { PropTypes } from 'react';
import Quest from './Quest';

import '../css/QuestList.css';

export default function QuestList(props) {
  return (
    <div className="quest-list">
      {
        props.items.map(item => (
          <Quest
            title={item.title}
            description={item.description}
            goal={item.goal}
            key={item._id}
            id={item._id}
            onEdit={props.onEdit}
          />
          ))
      }
    </div>
  );
}

QuestList.propTypes = {
  // items  : PropTypes.arrayOf(React.PropTypes.string).isRequired,
  // onEdit : PropTypes.func.isRequired
};
