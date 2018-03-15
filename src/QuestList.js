import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Quest } from './Quest'

export const QuestList = props => (
  <div>
    {
      props.items.map((item,index) => (
          <Quest
            title={item}
            description="no descr"
            goal={index}
          />
        )
      )
    }
  </div>
);
