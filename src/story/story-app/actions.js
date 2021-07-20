import { createAction, createSetterActions } from '@pulse/redux/src/action';

import * as authentication from '../../authentication';
import * as api from '../../offers-api';

import { NAME, DURATION_IN_MS } from './constants';

export const [
  setIsSaving,
  setIsStoryStarted,
  setIsPause,
  setIsSwiping,
  setPauseStoryId,
  setBackgroundColor,
  setStartTime,
  setDuration,
  setActiveStory,
  setActiveStoryIndex,
  setActiveStoryItem,
  setActiveStoryItemIndex,
] = createSetterActions(NAME, [
  'isSaving',
  'isStoryStarted',
  'isPause',
  'isSwiping',
  'pauseStoryId',
  'backgroundColor',
  'startTime',
  'duration',
  'activeStory',
  'activeStoryIndex',
  'activeStoryItem',
  'activeStoryItemIndex',
]);

export const reset = createAction(`${NAME}/RESET`);

export const resetDuration = () => dispatch => {
  dispatch(setDuration(DURATION_IN_MS));
};

export const resetPause = () => dispatch => {
  dispatch(setIsPause(false));
  dispatch(setPauseStoryId(''));
};

export const postOfferAttribution = ({ offerId, action }) => async (dispatch, getState) => {
  const state = getState();
  const apiKey = authentication.getApiKey(state);
  const apiSecret = authentication.getApiSecret(state);
  const externalUserId = authentication.getExternalUserId(state);

  try {
    await api.postOfferAttribution({ offerId, action, apiKey, apiSecret, externalUserId });
  } catch (e) {
    throw new Error(e);
  }
};

export default {};
