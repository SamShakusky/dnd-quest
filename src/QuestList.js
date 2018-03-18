import React from 'react';
import { Quest } from './Quest'

export const QuestList = props => (
  <div className="quest-list">
    {
      props.items.map((item,index) => (
          <Quest
            title={item.title}
            description={item.description}
            goal={item.goal}
            key={index}
            id={index}
            onEdit={props.onEdit}
          />
        )
      )
    }
  </div>
);
