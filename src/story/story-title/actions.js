import { createAction, createSetterActions } from '@pulse/redux/src/action';

import * as api from '../../offers-api';
import * as authentication from '../../authentication';

import { NAME } from './constants';

export const [setIsSaving] = createSetterActions(NAME, ['isSaving']);

export const reset = createAction(`${NAME}/RESET`);

export const saveOfferAttribution = ({ offerId, action }) => async (dispatch, getState) => {
  const state = getState();

  try {
    const apiKey = authentication.getApiKey(state);
    const apiSecret = authentication.getApiSecret(state);
    const externalUserId = authentication.getExternalUserId(state);

    await api.postOfferAttribution({ offerId, action, apiKey, apiSecret, externalUserId });
  } catch (e) {
    throw new Error(e);
  }
};

export default {};
