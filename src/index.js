import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import registerServiceWorker from './registerServiceWorker';

import store from './store';
import './css/reset.css';
import './css/fonts.css';

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
