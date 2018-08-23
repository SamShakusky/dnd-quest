import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Checkbox from './checkbox';

import '../css/Quest.css';

export default class Quest extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    reward      : PropTypes.shape({}),
    id          : PropTypes.string.isRequired,
    onEdit      : PropTypes.func.isRequired
  };

  static defaultProps = {
    description : '',
    reward      : {}
  };
  
  constructor(props) {
    super(props);
    
    this.checkbox = React.createRef();
  }
  
  onEdit = (e) => {
    console.log(e.target, this.checkbox.current);
    if (e.target === this.checkbox.current) return false;
    
    this.props.onEdit(this.props.id);
  }
  
  render() {
    const {
      title,
      description,
      reward,
      id
    } = this.props;
    
    return (
      <div styleName="quest__wrapper">
        <button onClick={this.onEdit} styleName="quest">
          <span>
            <div styleName="quest-edit">
              {/* <Button
                icon="edit"
                size="sm"
                shape="flat"
                onClick={this.onEdit}
              /> */}
            </div>
            <h3 styleName="quest-title">{title}</h3>
            { description && <p styleName="quest-description">{description}</p> }
            <div styleName="bottom-panel">
              {/* {goal && <p styleName="quest-goal">Goal: {goal}</p>} */}
              <div styleName="quest-reward">
                {reward.gold && <p styleName="coin coin__gold">{reward.gold}</p>}
                {reward.silver && <p styleName="coin coin__silver">{reward.silver}</p>}
                {reward.copper && <p styleName="coin coin__bronze">{reward.copper}</p>}
                {reward.items && reward.items[0] && <p styleName="reward__item">{reward.items.length}</p>}
              </div>
            </div>
          </span>
        </button>
        <div styleName="checkbox__wrapper">
          <Checkbox id={id} size="lg" round />
        </div>
      </div>
    );
  }
}
