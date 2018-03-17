import React, { Component } from 'react';
import './App.css';
import './reset.css';
import { Text } from './Text';
import { QuestList } from './QuestList'
import { QuestForm } from './QuestForm';

const quests = [
  {
    title: 'The great Invasion',
    goal: 'Kill the orcs'
  },
  {
    title: 'Show me',
    goal: 'Save the princess'
  }
]

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title  : '',
      description: '',
      goal: '',
      items : [],
      formVisibility : false
    };
  }

  activateForm = () => {
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
            onFormClose={this.activateForm}
            className={this.state.formVisibility ? 'active' : ''}
          />
          <QuestList items={this.state.items} />
          <button className="activate-form" onClick={this.activateForm}>New</button>
        </main>
      </div>
    );
  }
}
