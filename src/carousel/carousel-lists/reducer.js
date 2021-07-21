import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  offers: [],
  attributions: [],
  total: 0,
  currentPage: 0,
  isFetchingOffers: false,
  isFetchingAttributions: false,
};

export default createReducer(initialState, {
  [actions.setOffers]: createSetter('offers'),
  [actions.setAttributions]: createSetter('attributions'),
  [actions.setTotal]: createSetter('total'),
  [actions.setCurrentPage]: createSetter('currentPage'),
  [actions.setIsFetchingOffers]: createSetter('isFetchingOffers'),
  [actions.setIsFetchingAttributions]: createSetter('isFetchingAttributions'),
  [actions.reset]: () => initialState,
});
