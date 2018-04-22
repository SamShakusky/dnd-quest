import React, { Component } from 'react';

import { QuestList } from './QuestList'
import { QuestForm } from './QuestForm';
import FloatingButton from './FloatingButton';

import './css/QuestManager.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title  : '',
      description: '',
      goal: '',
      items : [{
        title: 'The title',
        description: '',
        goal: 'The goal',
        _id: '1312'
      }],
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
    
    fetch('http://localhost:8000/quests', requestOptions)
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
        // 'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }
    
    fetch('http://localhost:8000/quests', requestOptions)
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
    
    fetch('http://localhost:8000/quests/' + editing, requestOptions)
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
    
    if(title) {
      if(editing) {
        const index = items.findIndex(item => item._id === editing);
        this.updateQuest(item, index);
      }
      else {
        this.postQuest(item);
      }
      this.closeForm();
      this.clearInputs();
    } else {
      alert('Введите заголовок!');
    }
  }
  
  onDelete = (event) => {
    event.preventDefault();
    let {items, editing} = this.state;
    
    items = items.filter(item => item._id !== editing);
    
    this.setState({ items: items });
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
        <QuestForm
          title={this.state.title}
          description={this.state.description}
          goal={this.state.goal}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          onFormClose={this.closeForm}
          className={this.state.formVisibility ? 'active' : ''}
          editing={this.state.editing}
        />
        <QuestList
          items={this.state.items}
          onEdit={this.onEdit}
        />
        <FloatingButton onClick={this.openForm}/>
      </main>
    );
  }
}
