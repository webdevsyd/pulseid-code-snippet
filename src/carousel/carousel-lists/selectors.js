import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [
  isFetchingOffers,
  isFetchingAttributions,
  getOffers,
  getTotal,
  getCurrentPage,
  getViewedOffers,
  getEnrolledOffers,
  hasError,
] = createSelectors(NAME, [
  'isFetchingOffers',
  'isFetchingAttributions',
  'offers',
  'total',
  'currentPage',
  'viewedOffers',
  'enrolledOffers',
  'hasError',
]);

export default {};
