import { createSetterActions } from '@pulse/redux/src/action';

import { NAME } from './constants';

export const [setApiKey, setApiSecret, setExternalUserId] = createSetterActions(NAME, [
  'apiKey',
  'apiSecret',
  'externalUserId',
]);

export const initialize = ({ apiKey, apiSecret, externalUserId }) => dispatch => {
  dispatch(setApiKey(apiKey));
  dispatch(setApiSecret(apiSecret));
  dispatch(setExternalUserId(externalUserId));
};
