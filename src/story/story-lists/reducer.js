import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import * as actions from './actions';

const initialState = {
  offers: [],
  viewedOffers: [],
  enrolledOffers: [],
  total: 0,
  currentPage: 0,
  isFetching: false,
  hasRefetched: false,
  hasError: false,
};

export default createReducer(initialState, {
  [actions.setOffers]: createSetter('offers'),
  [actions.setViewedOffers]: createSetter('viewedOffers'),
  [actions.setEnrolledOffers]: createSetter('enrolledOffers'),
  [actions.setTotal]: createSetter('total'),
  [actions.setCurrentPage]: createSetter('currentPage'),
  [actions.setIsFetching]: createSetter('isFetching'),
  [actions.setHasRefetched]: createSetter('hasRefetched'),
  [actions.setHasError]: createSetter('hasError'),
  [actions.reset]: () => initialState,
});
