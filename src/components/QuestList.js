import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Quest from './Quest';

import '../css/QuestList.css';

export default class QuestList extends PureComponent {
  static propTypes = {
    items  : PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit : PropTypes.func.isRequired
  };
  
  render() {
    const { items, onEdit } = this.props;
    
    return (
      <div styleName="quest-list">
        {
          items.map(item => (
            <Quest
              title={item.title}
              description={item.description}
              goal={item.goal}
              reward={item.reward}
              key={item._id}
              id={item._id}
              onEdit={onEdit}
            />
            ))
        }
      </div>
    );
  }
}

QuestList.propTypes = {
  items  : PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit : PropTypes.func.isRequired
};
