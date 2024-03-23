import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './exports';

export default function createStoreRedux(services, config = {}) {
  return createStore(
    combineReducers(reducers),
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk.withExtraArgument(services)))
  );
}
