import React, { Component } from 'react';

export default class Spec extends Component {
  render() {
    return (
      <main className="page-spec">
        <h1>Spec</h1>
        <nav>
          <a className="link-light" href="#colors">Colors</a>
          <a className="link-light" href="#buttons">Buttons</a>
        </nav>
        <div className="container">
          <section id="colors" className="section">
            <h2 className="section-header">Colors</h2>
            <div className="section-content"></div>
          </section>
          <section id="buttons" className="section">
            <h2 className="section-header">Buttons</h2>
          </section>
        </div>
      </main>
    );
  }
}
