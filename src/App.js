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
      formVisibility : false
    };
  }

  toggleForm = () => {
    let visibility = this.state.formVisibility;

    if(visibility) { visibility = false; }
    else           { visibility = true; }

    this.setState({ formVisibility: visibility });
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
        title: '',
        description: '',
        goal: '',
        items: [...this.state.items,
          {
            title: this.state.title,
            description: this.state.description,
            goal: this.state.goal
          }
        ],
        formVisibility: false
      });
    } else {
      alert('Введите заголовок!');
    }
  }

  onEdit = (id) => {
    const data = this.state.items[id];
    this.setState({
      title: data.title,
      description: data.description,
      goal: data.goal
    });
    this.toggleForm();
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
            onFormToggle={this.toggleForm}
            className={this.state.formVisibility ? 'active' : ''}
          />
          <QuestList
            items={this.state.items}
            onEdit={this.onEdit}
          />
          <button className="activate-form" onClick={this.toggleForm}>New</button>
        </main>
      </div>
    );
  }
}
