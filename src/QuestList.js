import React from 'react';
// import PropTypes from 'prop-types';
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
          />
        )
      )
    }
  </div>
);
