import React, { Component } from 'react';

export default class Spec extends Component {
  render() {
    return (
      <main className="page-spec">
        <h1>-</h1>
        <nav>
          <a className="link-light" href="#ass">Colors</a>
          <a className="link-light" href="#ass2">Buttons</a>
        </nav>
        <div className="container">
          <div id="ass"></div>
          <div id="ass2"></div>
        </div>
      </main>
    );
  }
}
