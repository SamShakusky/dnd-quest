import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Campaign from './campaign';

import '../css/QuestList.css';

export default class CampaignList extends PureComponent {
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
            <Campaign
              title={item.title}
              description={item.description}
              goal={item.goal}
              reward={item.reward}
              key={item.id}
              id={item.id}
              onEdit={onEdit}
            />
            ))
        }
      </div>
    );
  }
}
