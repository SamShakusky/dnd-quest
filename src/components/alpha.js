import React, { PureComponent } from 'react';

import '../css/alpha.css';

export default class Alpha extends PureComponent {
    state = {
      ass : false,
    }
    
    render() {
      return (
        <main
          styleName="container"
        >
          <h1 styleName="title">
            Adventure Companion
            <span styleName="sign">α</span>
          </h1>
        </main>
      );
    }
}
