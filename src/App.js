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
        goal: 'The goal',
        id: '1312'
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
    event.preventDefault();
    let {title, description, goal, editing, items} = this.state;

    if(title) {
      if(editing) {
        const index = items.findIndex(item => item.id === editing);
        items[index] = {
          title: title,
          description: description,
          goal: goal,
          id: editing
        };
      }
      else {
        items = [...items,
          {
            title: title,
            description: description,
            goal: goal,
            id: +new Date()
          }
        ];
      }
      this.setState({ items: items });
      this.closeForm();
      this.clearInputs();
    } else {
      alert('Введите заголовок!');
    }
  }

  onEdit = (id) => {
    const data = this.state.items.find(x => x.id === id);

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
            editing={this.state.editing}
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
