import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  isSaving: false,
};

export default createReducer(initialState, {
  [actions.setIsSaving]: createSetter('isSaving'),
  [actions.reset]: () => initialState,
});
