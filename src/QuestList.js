import React from 'react';
import './css/QuestList.css';
import { Quest } from './Quest'

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
