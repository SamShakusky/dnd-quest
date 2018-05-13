import React, { PureComponent } from 'react';

import QuestList from './QuestList';
import QuestForm from './QuestForm';
import FloatingButton from './FloatingButton';
import SlidingPanel from './SlidingPanel';

import localhost from '../config/localhost';
import '../css/QuestManager.css';

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
    };
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
  
  onSubmit = () => {
    const {
      title,
      description,
      goal,
      editing,
      items
    } = this.state;
    
    const item = {
      title,
      description,
      goal
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
          items[index] = {
            ...resp,
            _id : editing
          };
          this.setState({
            items
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
    });
  }
  
  closeForm = () => {
    let inputs;
    
    if (this.state.editing !== null) {
      inputs = {
        title       : '',
        description : '',
        goal        : '',
        editing     : ''
      };
    }
    this.setState({
      formVisibility : false,
      ...inputs
    });
  }
  
  render() {
    return (
      <main className="page-manager">
        <SlidingPanel
          isShown={this.state.formVisibility}
          onClose={this.closeForm}
          side="right"
          noOverlay
        >
          <QuestForm
            title={this.state.title}
            description={this.state.description}
            goal={this.state.goal}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onDelete={this.deleteQuest}
            onFormClose={this.closeForm}
            editing={this.state.editing}
          />
        </SlidingPanel>
        <QuestList
          items={this.state.items}
          onEdit={this.onEdit}
        />
        <FloatingButton onClick={this.openForm} />
      </main>
    );
  }
}
