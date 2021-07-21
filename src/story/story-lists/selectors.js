import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [
  isFetching,
  getOffers,
  getTotal,
  getCurrentPage,
  getAttributions,
  hasRefetched,
] = createSelectors(NAME, [
  'isFetching',
  'offers',
  'total',
  'currentPage',
  'attributions',
  'hasRefetched',
]);

export const getEnrolledOffers = state => {
  return getOffers(state)
    .filter(a => a.enroll)
    .map(a => a.offerId);
};

export const getViewedOffers = state => {
  return getOffers(state)
    .filter(a => a.view)
    .map(a => a.offerId);
};

export default {};
