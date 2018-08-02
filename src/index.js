import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import store from './store';
import './css/reset.css';

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
