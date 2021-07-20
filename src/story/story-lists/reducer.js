import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  offers: [],
  attributions: [],
  total: 0,
  currentPage: 0,
  isFetching: false,
  hasRefetched: false,
};

export default createReducer(initialState, {
  [actions.setOffers]: createSetter('offers'),
  [actions.setAttributions]: createSetter('attributions'),
  [actions.setTotal]: createSetter('total'),
  [actions.setCurrentPage]: createSetter('currentPage'),
  [actions.setIsFetching]: createSetter('isFetching'),
  [actions.setHasRefetched]: createSetter('hasRefetched'),
  [actions.reset]: () => initialState,
});
