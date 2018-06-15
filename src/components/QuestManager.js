import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

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
      const index = items.findIndex(i => i._id === editing);
      this.updateQuest(item, index);
    } else {
      this.postQuest(item);
    }
    this.closeForm();
  }
  
  onEdit = (_id) => {
    const data = this.state.items.find(x => x._id === _id);
    
    this.setState({
      title       : data.title,
      description : data.description,
      goal        : data.goal,
      reward      : data.reward,
      editing     : _id,
    });
    this.openForm();
  }
  
  getQuests = () => {
    const requestOptions = {
      method : 'GET'
    };
    
    fetch(`${localhost}/quests`, requestOptions)
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            items : data
          });
        });
      });
  }
  
  postQuest = (payload) => {
    const data = JSON.stringify(payload);
    const requestOptions = {
      method  : 'POST',
      body    : data,
      headers : {
        'Content-Type' : 'application/json'
      }
    };
    
    fetch(`${localhost}/quests`, requestOptions)
      .then((response) => {
        response.json().then((resp) => {
          this.setState({
            items : [
              ...this.state.items,
              { ...resp }
            ]
          });
        });
      });
  }
  
  updateQuest = (payload, index) => {
    const { editing, items } = this.state;
    const data = JSON.stringify(payload);
    const requestOptions = {
      method  : 'PUT',
      body    : data,
      headers : {
        'Content-Type' : 'application/json'
      }
    };
    
    fetch(`${localhost}/quests/${editing}`, requestOptions)
      .then((response) => {
        response.json().then((resp) => {
          const newItems = [...items];
          
          newItems[index] = {
            ...resp,
            _id : editing
          };
          
          this.setState({
            items : [
              ...newItems
            ]
          });
        });
      });
  }
  
  deleteQuest = (event) => {
    event.preventDefault();
    let { items } = this.state;
    const { editing } = this.state;
    const requestOptions = {
      method : 'DELETE'
    };
    
    fetch(`${localhost}/quests/${editing}`, requestOptions)
      .then((response) => {
        response.json().then(() => {
          items = items.filter(item => item._id !== editing);
          this.setState({ items });
          this.closeForm();
        });
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
    }, () => console.log(reward.items));
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
