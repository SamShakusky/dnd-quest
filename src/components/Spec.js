import React, { PureComponent } from 'react';
import Formsy from 'formsy-react';
import Button from './Button';
import FloatingButton from './FloatingButton';
import TextField from './TextField';

import '../css/Spec.css';

/* eslint-disable react/prefer-stateless-function */
export default class Spec extends PureComponent {
  render() {
    return (
      <main styleName="page-spec">
        <h1>Spec</h1>
        {/* <nav>
          <a href="#colors">Colors</a>
          <a href="#typography">Typography</a>
          <a href="#shadows">Shadows</a>
          <a href="#buttons">Buttons</a>
        </nav> */}
        <div>
          <section styleName="colors section">
            <h2 styleName="section--header">Colors</h2>
            <div styleName="section--content">
              <span styleName=" color white">$white</span>
              <span styleName=" color grey_light">$grey_light</span>
              <span styleName=" color grey">$grey</span>
              <span styleName=" color grey_dark">$grey_dark</span>
              <span styleName=" color color_main_light">$color_main_light</span>
              <span styleName=" color color_main">$color_main</span>
              <span styleName=" color color_main_dark">$color_main_dark</span>
              <span styleName=" color color_secondary_light">$color_secondary_light</span>
              <span styleName=" color color_secondary">$color_secondary</span>
              <span styleName=" color color_secondary_dark">$color_secondary_dark</span>
              <span styleName=" color color_success">$color_success</span>
              <span styleName=" color color_danger">$color_danger</span>
              <span styleName=" color color_warning">$color_warning</span>
            </div>
          </section>

          <section styleName="typography section">
            <h2 styleName="section--header">Typography</h2>
            <div styleName="section--content">
              <div styleName="head">
                <h2 styleName="h1">Heading 1</h2>
                <h2 styleName="h2">Heading 2</h2>
                <h3 styleName="h3">Heading 3</h3>
                <h3 styleName="h4">Heading 4</h3>
              </div>
              <div styleName="body">
                <p styleName="xl">Paragraph xl</p>
                <p styleName="l">Paragraph l</p>
                <p styleName="m">Paragraph m</p>
                <p styleName="s">Paragraph s</p>
                <p styleName="xs">Paragraph xs</p>
              </div>
              <div styleName="link">
                <p>Here is some text with a <a href="google.com" >link</a> for you.</p>
                <p styleName="dark">Here is some text with a <a href="google.com" >link</a> for you.</p>
              </div>
            </div>
          </section>

          <section styleName="shadows section">
            <h2 styleName="section--header">Shadows</h2>
            <div styleName="section--content">
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </section>

          <section styleName="buttons section">
            <h2 styleName="section--header">Buttons</h2>
            <div styleName="section--content">
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
                  <FloatingButton />
                </div>
              </div>
            </div>
          </section>

          <section styleName="section">
            <h2 styleName="section--header">Inputs</h2>
            <div styleName="section--content">
              <Formsy>
                <TextField label="label" name="name" />
                <TextField label="label2" name="name1" />
              </Formsy>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
