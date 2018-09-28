import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from './checkbox';

import { updateQuest } from '../actions/quest-actions';

import '../css/quest.css';

class Quest extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    reward      : PropTypes.shape({}),
    id          : PropTypes.string.isRequired,
    onEdit      : PropTypes.func.isRequired,
    done        : PropTypes.bool.isRequired,
    updateQuest : PropTypes.func.isRequired,
  };

  static defaultProps = {
    description : '',
    reward      : {}
  };
  
  constructor(props) {
    super(props);
    
    this.checkbox = React.createRef();
  }
  
  state = {
    collapsed : false,
  }
  
  onEdit = (e) => {
    if (e.target === this.checkbox.current) return false;
    
    return this.props.onEdit(this.props.id);
  }
  
  doneQuest = () => {
    const { done } = this.props;
    
    this.setState({
      collapsed : true
    }, this.doneRequest(done));
  }
  
  doneRequest = (done) => {
    const {
      title, description, reward, id
    } = this.props;
    
    const data = {
      done : !done,
      title,
      description,
      reward,
      id
    };
    setTimeout(() => {
      this.props.updateQuest(data);
    }, 500);
  }
  
  render() {
    const {
      title,
      description,
      reward,
      id,
      done,
    } = this.props;
    
    const { collapsed } = this.state;
    
    return (
      <div styleName={`quest__wrapper ${collapsed ? 'quest_collapsed' : ''}`}>
        <button onClick={this.onEdit} styleName="quest">
          <span>
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
          <Checkbox
            onChange={this.doneQuest}
            checked={done}
            id={id}
            size="lg"
            round
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { updateQuest })(Quest);
