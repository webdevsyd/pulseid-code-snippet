import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [
  isFetchingOffers,
  isFetchingAttributions,
  getOffers,
  getTotal,
  getCurrentPage,
  getAttributions,
] = createSelectors(NAME, [
  'isFetchingOffers',
  'isFetchingAttributions',
  'offers',
  'total',
  'currentPage',
  'attributions',
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
