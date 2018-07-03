import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import QuestList from './QuestList';
import QuestForm from './QuestForm';
import FloatingButton from './FloatingButton';
import SlidingPanel from './SlidingPanel';

import localhost from '../config/localhost';
import '../css/QuestManager.css';

const scrollMap = {
  true  : 'hidden',
  false : 'auto'
};

export default class App extends PureComponent {
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
    this.getQuests();
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
        [name] : target.value
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
      items
    } = this.state;
    
    const item = {
      title,
      description,
      goal,
      reward : {
        ...reward,
        items : reward.items.filter(el => el.length)
      }
    };
    
    if (editing) {
      const index = items.findIndex(i => i.id === editing);
      this.updateQuest(item, index);
    } else {
      this.postQuest(item);
    }
    this.closeForm();
  }
  
  onEdit = (id) => {
    const data = this.state.items.find(x => x.id === id);
    
    this.setState({
      title       : data.title,
      description : data.description,
      goal        : data.goal,
      reward      : data.reward,
      editing     : id,
    });
    this.openForm();
  }
  
  getQuests = () => {
    axios.get(`${localhost}/api/quests`)
      .then((response) => {
        this.setState({
          items : response.data
        });
      });
  }
  
  postQuest = (questData) => {
    const requestOptions = {
      method  : 'POST',
      url     : `${localhost}/api/quests`,
      data    : JSON.stringify(questData),
      headers : { 'Content-Type' : 'application/json' }
    };
    
    axios.request(requestOptions).then((response) => {
      this.setState({
        items : [
          ...this.state.items,
          { ...response.data }
        ]
      });
    });
  }
  
  updateQuest = (questData, index) => {
    const { editing, items } = this.state;
    const requestOptions = {
      method  : 'PUT',
      url     : `${localhost}/api/quests/${editing}`,
      data    : JSON.stringify(questData),
      headers : { 'Content-Type' : 'application/json' }
    };
    
    axios.request(requestOptions).then((response) => {
      const newItems = [...items];
      
      newItems[index] = {
        ...response.data,
        id : editing
      };
      
      this.setState({
        items : [
          ...newItems
        ]
      });
    });
  }
  
  deleteQuest = (event) => {
    event.preventDefault();
    let { items } = this.state;
    const { editing } = this.state;
    
    axios.delete(`${localhost}/api/quests/${editing}`).then(() => {
      items = items.filter(item => item.id !== editing);
      this.setState({ items });
      this.closeForm();
    });
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
          items={this.state.items}
          onEdit={this.onEdit}
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
