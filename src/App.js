import React, { Component } from 'react';
import './App.css';
import './reset.css';
import { Text } from './Text';
import { Quest } from './Quest'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Text size="lg">Header</Text>
        </header>
        <main>
          <Quest
            title="Throador the Keeper"
            description="The allmighty Throador the keeper of the Sun Temple is threatening your village!"
            goal="Slain Throador"
          />
        </main>
      </div>
    );
  }
}

export default App;
