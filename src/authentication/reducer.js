import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  apiKey: null,
  apiSecret: false,
  externalUserId: false,
};

export default createReducer(initialState, {
  [actions.setApiKey]: createSetter('apiKey'),
  [actions.setApiSecret]: createSetter('apiSecret'),
  [actions.setExternalUserId]: createSetter('externalUserId'),
});
