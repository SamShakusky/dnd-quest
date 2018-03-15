import React, { Component } from 'react';
import './App.css';
import './reset.css';
import { Text } from './Text';
import { Quest } from './Quest'
import { QuestList } from './QuestList'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term  : '',
      items : []
    };
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Text size="lg">Header</Text>
        </header>
        <main>
          <form className="form" onSubmit={this.onSubmit}>
            <input placeholder="Title" value={this.state.term} onChange={this.onChange} />
            <button>Go</button>
          </form>
          <QuestList items={this.state.items} />
        </main>
      </div>
    );
  }
}
