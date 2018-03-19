import React, { Component } from 'react';
import './App.css';
import './reset.css';
import { Text } from './Text';
import { QuestList } from './QuestList'
import { QuestForm } from './QuestForm';

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
        goal: 'The goal'
      }],
      formVisibility : false,
      editing : null
    };
  }

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      goal: '',
    });
  }

  openForm = () => {
    this.setState({
      formVisibility: true
    });
  }

  closeForm = () => {
    
    console.log()
    if(this.state.editing !== null) {
      this.setState({
        editing: null,
        title: '',
        description: '',
        goal: ''
      });
    }
    this.setState({
      formVisibility: false
    });
  }

  toggleForm = () => {
    let { formVisibility, editing } = this.state;
    console.log(editing);
    if(formVisibility) {
      formVisibility = false;
      // editing = null;
    }
    else           { formVisibility = true; }

    this.setState({
      formVisibility: formVisibility,
      editing: editing
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
    event.preventDefault();
    if(this.state.title) {
      this.setState({
        items: [...this.state.items,
          {
            title: this.state.title,
            description: this.state.description,
            goal: this.state.goal
          }
        ],
      });
      this.clearInputs();
      this.closeForm();
    } else {
      alert('Введите заголовок!');
    }
  }

  onEdit = (id) => {
    const data = this.state.items[id];
    this.setState({
      title: data.title,
      description: data.description,
      goal: data.goal,
      editing: id,
    });
    this.openForm();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Text size="lg">Header</Text>
        </header>
        <main>
          <QuestForm
            title={this.state.title}
            description={this.state.description}
            goal={this.state.goal}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onFormClose={this.closeForm}
            className={this.state.formVisibility ? 'active' : ''}
          />
          <QuestList
            items={this.state.items}
            onEdit={this.onEdit}
          />
          <button className="activate-form" onClick={this.openForm}>New</button>
        </main>
      </div>
    );
  }
}
