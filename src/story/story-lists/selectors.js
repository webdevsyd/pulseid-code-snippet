import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [
  isFetching,
  getOffers,
  getTotal,
  getCurrentPage,
  getViewedOffers,
  getEnrolledOffers,
  hasRefetched,
  hasError,
] = createSelectors(NAME, [
  'isFetching',
  'offers',
  'total',
  'currentPage',
  'viewedOffers',
  'enrolledOffers',
  'hasRefetched',
  'hasError',
]);

export default {};
