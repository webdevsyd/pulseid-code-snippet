import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [getApiKey, getApiSecret, getExternalUserId] = createSelectors(NAME, [
  'apiKey',
  'apiSecret',
  'externalUserId',
]);

export default {};
