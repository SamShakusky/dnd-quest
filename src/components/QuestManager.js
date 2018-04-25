import React, { Component } from 'react';

import { QuestList } from './QuestList'
import { QuestForm } from './QuestForm';
import FloatingButton from './FloatingButton';
import SlidingPanel from './SlidingPanel';

import '../css/QuestManager.css';

const localhost = 'http://192.168.0.90:8000';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title  : '',
      description: '',
      goal: '',
      items : [],
      formVisibility : false,
      editing : null
    };
  }
  
  componentWillMount() {
    this.getQuests();
  }
  
  getQuests = () => {
    const requestOptions = {
      method: 'GET'
    }
    
    fetch(`${localhost}/quests`, requestOptions)
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            items: data
          });
        });
      }
    );
  }
  
  postQuest = (payload) => {
    const data = JSON.stringify(payload);
    const requestOptions = {
      method  : 'POST',
      body    : data,
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    
    fetch(`${localhost}/quests`, requestOptions)
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            items: [
              ...this.state.items,
              { ...data }
            ]
          });
          console.log(data);
        });
      }
    );
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
    }
    
    fetch(`${localhost}/quests/${editing}`, requestOptions)
      .then((response) => {
        response.json().then((data) => {
          items[index] = {
            ...data,
            _id: editing
          }
          this.setState({
            items
          });
        });
      }
    );
  }
  
  deleteQuest = (event) => {
    event.preventDefault();
    let { editing, items } = this.state;
    const requestOptions = {
      method  : 'DELETE'
    }
    
    fetch(`${localhost}/quests/${editing}` + editing, requestOptions)
      .then((response) => {
        response.json().then((data) => {
          items = items.filter(item => item._id !== editing);
          this.setState({ items });
          this.closeForm();
          this.clearInputs();
        });
      }
    );
  }
  
  clearInputs = () => {
    setTimeout(() => {
      this.setState({
        title: '',
        description: '',
        goal: '',
        editing: ''
      });
    }, 400);
  }

  openForm = () => {
    this.setState({
      formVisibility: true
    });
  }

  closeForm = () => {
    if(this.state.editing !== null) {
      this.clearInputs();
    }
    this.setState({
      formVisibility: false
    });
  }

  onChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  onSubmit = (event) => {
    let {title, description, goal, editing, items} = this.state;
    const item = {
      title       : title,
      description : description,
      goal        : goal
    };
    
    if(editing) {
      const index = items.findIndex(item => item._id === editing);
      this.updateQuest(item, index);
    }
    else {
      this.postQuest(item);
    }
    this.closeForm();
    this.clearInputs();
  }
  
  onEdit = (_id) => {
    const data = this.state.items.find(x => x._id === _id);
    
    this.setState({
      title: data.title,
      description: data.description,
      goal: data.goal,
      editing: _id,
    });
    this.openForm();
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
        <FloatingButton onClick={this.openForm}/>
      </main>
    );
  }
}
