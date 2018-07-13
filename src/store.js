import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// import { loadToken, saveToken } from './local-storage';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxDevtools && reduxDevtools()
  )
);

// store.subscribe(() => {
//   saveToken(store.getState());
// });

export default store;
