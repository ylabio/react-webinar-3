import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config = {}) {
  const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
      combineReducers(reducers),
      undefined,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument(services)))
  );

  return store;
}
