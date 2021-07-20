import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  isShowPopup: false,
};

export default createReducer(initialState, {
  [actions.setIsShowPopup]: createSetter('isShowPopup'),
  [actions.reset]: () => initialState,
});
