import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  config: {},
};

export default createReducer(initialState, {
  [actions.setConfig]: createSetter('config'),
});
