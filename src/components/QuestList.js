import React from 'react';
import { Quest } from './Quest'

import '../css/QuestList.css';

export const QuestList = props => (
  <div className="quest-list">
    {
      props.items.map((item,index) => (
          <Quest
            title={item.title}
            description={item.description}
            goal={item.goal}
            key={item._id}
            id={item._id}
            onEdit={props.onEdit}
          />
        )
      )
    }
  </div>
);
