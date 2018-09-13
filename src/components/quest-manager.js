import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestList from './quest-list';
import QuestForm from './quest-form';
import FloatingButton from './floating-button';
import SlidingPanel from './sliding-panel';
import AppBar from './app-bar';

import {
  readQuests,
  createQuest,
  updateQuest,
  deleteQuest,
} from '../actions/quest-actions';

import '../css/quest-manager.css';

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
    accessToken     : PropTypes.string.isRequired,
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
      title             : '',
      description       : '',
      items             : [],
      formVisibility    : false,
      archiveVisibility : false,
      editing           : null,
      reward            : { items : [] },
    };
    
    this.formRef = React.createRef();
    this.url = `/api/Campaigns/${props.currentCampaign}/changes?_format=event-stream&access_token=${props.accessToken}`;
    this.source = new EventSource(this.url);
  }
  
  componentDidMount() {
    const { readQuests: showQuests, currentCampaign } = this.props;
    if (!currentCampaign) this.props.history.push('/campaigns');
    
    showQuests();
    
    this.source.addEventListener('data', (msg) => {
      const data = JSON.parse(msg.data);
      console.log(data.data.title);
    });
  }
  
  componentWillUnmount() {
    this.source.close();
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
      reward,
      editing,
    } = this.state;
    
    const { quests } = this.props;
    
    const quest = {
      title,
      description,
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
      reward      : data.reward,
      editing     : id,
    });
    this.openForm();
  }
  
  deleteQuest = () => {
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
  
  toggleArchive = () => {
    const { archiveVisibility } = this.state;
    
    this.setState({ archiveVisibility : !archiveVisibility });
  }
  
  fabSubmit = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this.formRef.current.submitRef.current);
    node.click();
  }
  
  render() {
    const { formVisibility, archiveVisibility } = this.state;
    
    return (
      <main styleName="page-manager">
        <AppBar
          title={archiveVisibility ? 'Completed Quests' : 'Active Quests'}
          modeChange={this.toggleArchive}
          modeIcon={archiveVisibility ? 'assignment' : 'assignment_turned_in'}
        />
        <SlidingPanel
          isShown={this.state.formVisibility}
          onClose={this.closeForm}
          side="right"
        >
          <QuestForm
            title={this.state.title}
            description={this.state.description}
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
        { archiveVisibility ?
          <QuestList
            isArchive
            items={this.props.quests}
            onEdit={this.onEdit}
          />
          :
          <QuestList
            items={this.props.quests}
            onEdit={this.onEdit}
          />
        }
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
  accessToken     : state.user.credentials.accessToken,
});

export default withRouter(connect(mapStateToProps, {
  readQuests,
  createQuest,
  updateQuest,
  deleteQuest,
})(QuestManager));
