import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import '../css/Quest.css';

export default class Quest extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    goal        : PropTypes.string,
    reward      : PropTypes.shape({}),
    id          : PropTypes.string.isRequired,
    onEdit      : PropTypes.func.isRequired
  };

  static defaultProps = {
    description : '',
    goal        : '',
    reward      : {}
  };
  
  onEdit = () => {
    this.props.onEdit(this.props.id);
  }

  render() {
    const {
      title,
      description,
      goal,
      reward
    } = this.props;
    
    return (
      <div styleName="quest">
        <div styleName="quest-edit">
          <Button
            label="edit"
            size="sm"
            shape="flat"
            onClick={this.onEdit}
          />
        </div>
        <h3 styleName="quest-title">{title}</h3>
        <p styleName="quest-description">{description}</p>
        <div styleName="bottom-panel">
          <p styleName="quest-goal">Цель: {goal}</p>
          <div styleName="quest-reward">
            {reward.gold && <p styleName="coin coin__gold">{reward.gold}</p>}
            {reward.silver && <p styleName="coin coin__silver">{reward.silver}</p>}
            {reward.copper && <p styleName="coin coin__bronze">{reward.copper}</p>}
            {reward.items && <p styleName="reward__item">{reward.items.length}</p>}
          </div>
        </div>
      </div>
    );
  }
}
