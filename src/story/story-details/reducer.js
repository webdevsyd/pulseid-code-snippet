import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  isDetailsPopupOpen: false,
};

export default createReducer(initialState, {
  [actions.setIsDetailsPopupOpen]: createSetter('isDetailsPopupOpen'),
  [actions.reset]: () => initialState,
});
