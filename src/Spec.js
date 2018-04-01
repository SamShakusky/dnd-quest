import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Button from './Button';
import FloatingButton from './FloatingButton';
import Input from './Input';

export default class Spec extends Component {
  render() {
    return (
      <main className="page-spec">
        <h1>Spec</h1>
        <nav>
          <a href="#colors">Colors</a>
          <a href="#typography">Typography</a>
          <a href="#shadows">Shadows</a>
          <a href="#buttons">Buttons</a>
        </nav>
        <div className="container">
          <section id="colors" className="section">
            <h2 className="section--header">Colors</h2>
            <div className="section--content">
              <span className=" color white">$white</span>
              <span className=" color grey_light">$grey_light</span>
              <span className=" color grey">$grey</span>
              <span className=" color grey_dark">$grey_dark</span>
              <span className=" color color_main_light">$color_main_light</span>
              <span className=" color color_main">$color_main</span>
              <span className=" color color_main_dark">$color_main_dark</span>
              <span className=" color color_secondary_light">$color_secondary_light</span>
              <span className=" color color_secondary">$color_secondary</span>
              <span className=" color color_secondary_dark">$color_secondary_dark</span>
              <span className=" color color_success">$color_success</span>
              <span className=" color color_danger">$color_danger</span>
              <span className=" color color_warning">$color_warning</span>
            </div>
          </section>

          <section id="typography" className="section">
            <h2 className="section--header">Typography</h2>
            <div className="section--content">
              <div className="head">
                <h2 className="h1">Heading 1</h2>
                <h2 className="h2">Heading 2</h2>
                <h3 className="h3">Heading 3</h3>
                <h3 className="h4">Heading 4</h3>
              </div>
              <div className="body">
                <p className="xl">Paragraph xl</p>
                <p className="l">Paragraph l</p>
                <p className="m">Paragraph m</p>
                <p className="s">Paragraph s</p>
                <p className="xs">Paragraph xs</p>
              </div>
              <div className="link">
                <p className="light">Here is some text with a <a href="google.com" >link</a> for you.</p>
                <p className="dark">Here is some text with a <a href="google.com" >link</a> for you.</p>
              </div>
            </div>
          </section>

          <section id="shadows" className="section">
            <h2 className="section--header">Shadows</h2>
            <div className="section--content">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>

          <section id="buttons" className="section">
            <h2 className="section--header">Buttons</h2>
            <div className="section--content">
              <div>
                <p>Simple</p>
                <div>
                  <Button
                    label="button"
                    size="md"
                  />
                  <Button
                    label="button"
                    size="sm"
                  />
                </div>
                <div>
                  <Button
                    label="button"
                    size="md"
                    shape="ghost"
                  />
                  <Button
                    label="button"
                    size="sm"
                    shape="ghost"
                  />
                </div>
                <div>
                  <Button
                    label="button"
                    size="md"
                    shape="flat"
                  />
                  <Button
                    label="button"
                    size="sm"
                    shape="flat"
                  />
                </div>
              </div>

              <div>
                <p>Danger</p>
                <div>
                  <Button
                    label="button"
                    size="md"
                    duty="danger"
                  />
                  <Button
                    label="button"
                    size="sm"
                    duty="danger"
                  />
                </div>
                <div>
                  <Button
                    label="button"
                    size="md"
                    shape="ghost"
                    duty="danger"
                  />
                  <Button
                    label="button"
                    size="sm"
                    shape="ghost"
                    duty="danger"
                  />
                </div>
                <div>
                  <Button
                    label="button"
                    size="md"
                    shape="flat"
                    duty="danger"
                  />
                  <Button
                    label="button"
                    size="sm"
                    shape="flat"
                    duty="danger"
                  />
                </div>
              </div>

              <div>
                <p>Success</p>
                <div>
                  <Button
                    label="button"
                    size="md"
                    duty="success"
                  />
                  <Button
                    label="button"
                    size="sm"
                    duty="success"
                  />
                </div>
                <div>
                  <Button
                    label="button"
                    size="md"
                    shape="ghost"
                    duty="success"
                  />
                  <Button
                    label="button"
                    size="sm"
                    shape="ghost"
                    duty="success"
                  />
                </div>
                <div>
                  <Button
                    label="button"
                    size="md"
                    shape="flat"
                    duty="success"
                  />
                  <Button
                    label="button"
                    size="sm"
                    shape="flat"
                    duty="success"
                  />
                </div>
              </div>
              <div>
                <p>Floating Action</p>
                <div>
                  <FloatingButton
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="inputs" className="section">
            <h2 className="section--header">Inputs</h2>
            <div className="section--content">
            <Formsy>
              <Input label="label" name="name" />
              <Input label="label2" name="name1" />
            </Formsy>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
