import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import * as reducers from './exports';
import { thunk, withExtraArgument } from 'redux-thunk';

export default function createStoreRedux(services, config = {}) {
  return createStore(
    combineReducers(reducers),
    undefined,
    composeWithDevTools(applyMiddleware(withExtraArgument(services))),
  );
}
