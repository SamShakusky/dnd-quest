import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

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

export default store;
