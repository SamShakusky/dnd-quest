import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Quest from './quest';

import '../css/quest-list.css';

export default class QuestList extends PureComponent {
  static propTypes = {
    items     : PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit    : PropTypes.func.isRequired,
    isArchive : PropTypes.bool,
  };
  
  static defaultProps = {
    isArchive : false
  }
  
  render() {
    const { items, isArchive, onEdit } = this.props;
    
    return (
      <div styleName="quest-list">
        {
          items.map((item) => {
            if ((isArchive && item.done) || (!isArchive && !item.done)) {
              return (
                <Quest
                  title={item.title}
                  description={item.description}
                  goal={item.goal}
                  reward={item.reward}
                  done={item.done}
                  key={item.id}
                  id={item.id}
                  onEdit={onEdit}
                />
              );
            }
            return false;
          })
        }
      </div>
    );
  }
}

// QuestList.propTypes = {
//   items  : PropTypes.arrayOf(PropTypes.object).isRequired,
//   onEdit : PropTypes.func.isRequired
// };
