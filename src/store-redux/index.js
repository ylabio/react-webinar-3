import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { withExtraArgument } from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers(reducers),
    undefined,
    composeEnhancers(applyMiddleware(withExtraArgument(services))),
  );
}
