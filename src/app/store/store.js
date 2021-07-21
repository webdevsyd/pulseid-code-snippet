import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from '../history';
import rootReducer from '../reducer';

const middlewares = [routerMiddleware(history), thunkMiddleware.withExtraArgument({ history })];

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
