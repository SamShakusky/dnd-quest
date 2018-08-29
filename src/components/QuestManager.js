import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestList from './QuestList';
import QuestForm from './QuestForm';
import FloatingButton from './FloatingButton';
import SlidingPanel from './SlidingPanel';

import {
  readQuests,
  createQuest,
  updateQuest,
  deleteQuest,
} from '../actions/quest-actions';
import '../css/QuestManager.css';

const scrollMap = {
  true  : 'hidden',
  false : 'auto'
};

const rewardShape = {
  items  : PropTypes.arrayOf(PropTypes.string),
  gold   : PropTypes.number,
  silver : PropTypes.number,
  copper : PropTypes.number,
};

const questShape = {
  title       : PropTypes.string.isRequired,
  id          : PropTypes.string.isRequired,
  description : PropTypes.string,
  goal        : PropTypes.string,
  reward      : PropTypes.shape(rewardShape),
};

class QuestManager extends PureComponent {
  static propTypes = {
    quests          : PropTypes.arrayOf(PropTypes.shape(questShape)),
    createQuest     : PropTypes.func.isRequired,
    readQuests      : PropTypes.func.isRequired,
    updateQuest     : PropTypes.func.isRequired,
    deleteQuest     : PropTypes.func.isRequired,
    currentCampaign : PropTypes.string,
    history         : PropTypes.shape({
      push : PropTypes.func.isRequired,
    }).isRequired,
  };
  
  static defaultProps = {
    quests          : [],
    currentCampaign : '',
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      title          : '',
      description    : '',
      goal           : '',
      items          : [],
      formVisibility : false,
      editing        : null,
      reward         : { items : [] },
    };
    
    this.formRef = React.createRef();
  }
  
  componentWillMount() {
    if (!this.props.currentCampaign) this.props.history.push('/campaigns');
    
    this.props.readQuests();
  }
  
  onChange = (event) => {
    const { target } = event;
    const { name } = target;
    
    this.setState({
      [name] : target.value
    });
  }
  
  onChangeCoins = (event) => {
    const { target } = event;
    const { name } = target;
    
    this.setState({
      ...this.state,
      reward : {
        ...this.state.reward,
        [name] : +target.value
      }
    });
  }
  
  onChangeItems = (event, index) => {
    const { target } = event;
    const { reward } = this.state;
    
    const items = [...this.state.reward.items];
    items[index] = target.value;
    
    this.setState({
      reward : {
        ...reward,
        items
      }
    });
  }
  
  onSubmit = () => {
    const {
      title,
      description,
      goal,
      reward,
      editing,
    } = this.state;
    
    const { quests } = this.props;
    
    const quest = {
      title,
      description,
      goal,
      reward : {
        ...reward,
        items : reward.items.filter(el => el.length)
      },
      id : editing || null,
    };
    
    if (editing) {
      this.props.updateQuest(quest, quests);
    } else {
      this.props.createQuest(quest);
    }
    this.closeForm();
  }
  
  onEdit = (id) => {
    const data = this.props.quests.find(x => x.id === id);
    
    this.setState({
      title       : data.title,
      description : data.description,
      goal        : data.goal,
      reward      : data.reward,
      editing     : id,
    });
    this.openForm();
  }
  
  deleteQuest = (event) => {
    event.preventDefault();
    const { editing } = this.state;
    const { quests } = this.props;
    
    this.props.deleteQuest(editing, quests);
    this.closeForm();
  }
  
  openForm = () => {
    this.setState({
      formVisibility : true
    }, this.toggleScroll(true));
  }
  
  closeForm = () => {
    let inputs;
    
    if (this.state.editing !== null) {
      inputs = {
        title       : '',
        description : '',
        goal        : '',
        reward      : { items : [] },
        editing     : ''
      };
    }
    this.setState({
      formVisibility : false,
      ...inputs
    }, this.toggleScroll(false));
  }
  
  addItem = () => {
    const { reward } = this.state;
    
    this.setState({
      reward : {
        ...reward,
        items : [
          ...reward.items,
          ''
        ]
      }
    });
  }
  
  removeItem = (i) => {
    const { reward } = this.state;
    
    const newItemsList = [
      ...reward.items.slice(0, i),
      ...reward.items.slice(i + 1)
    ];
    
    this.setState({
      reward : {
        ...reward,
        items : [
          ...newItemsList
        ]
      }
    });
  }
  
  toggleScroll = (bool) => {
    document.body.style.overflow = scrollMap[bool];
  }
  
  fabSubmit = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this.formRef.current.submitRef.current);
    node.click();
  }
  
  render() {
    const { formVisibility } = this.state;
    
    return (
      <main styleName="page-manager">
        <SlidingPanel
          isShown={this.state.formVisibility}
          onClose={this.closeForm}
          side="right"
        >
          <QuestForm
            title={this.state.title}
            description={this.state.description}
            goal={this.state.goal}
            reward={this.state.reward}
            onChange={this.onChange}
            onChangeCoins={this.onChangeCoins}
            onChangeItems={this.onChangeItems}
            onSubmit={this.onSubmit}
            onDelete={this.deleteQuest}
            onClose={this.closeForm}
            addItem={this.addItem}
            removeItem={this.removeItem}
            editing={this.state.editing}
            ref={this.formRef}
          />
        </SlidingPanel>
        <QuestList
          items={this.props.quests}
          onEdit={this.onEdit}
        />
        <p>-------------------------</p>
        <QuestList
          items={this.props.quests}
          onEdit={this.onEdit}
          isArchive
        />
        {
          formVisibility && <FloatingButton
            onClick={this.fabSubmit}
            icon="save"
          />
        }
        {
          !formVisibility && <FloatingButton
            onClick={this.openForm}
            icon="add"
          />
        }
      </main>
    );
  }
}

const mapStateToProps = state => ({
  quests          : state.quests.items,
  currentCampaign : state.campaigns.currentCampaign,
});

export default withRouter(connect(mapStateToProps, {
  readQuests,
  createQuest,
  updateQuest,
  deleteQuest,
})(QuestManager));
