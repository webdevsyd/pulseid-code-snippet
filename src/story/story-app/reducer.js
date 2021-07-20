import { createReducer, createSetter } from '@pulse/redux/src/reducer';

import { DURATION_IN_MS } from './constants';
import * as actions from './actions';

const initialState = {
  isSaving: false,
  isPause: false,
  isStoryStarted: false,
  isSwiping: false,
  pauseStoryId: '',
  backgroundColor: '',
  startTime: null,
  duration: DURATION_IN_MS,
  activeStory: {},
  activeStoryIndex: 0,
  activeStoryItem: {},
  activeStoryItemIndex: 0,
};

export default createReducer(initialState, {
  [actions.setIsSaving]: createSetter('isSaving'),
  [actions.setIsPause]: createSetter('isPause'),
  [actions.setIsStoryStarted]: createSetter('isStoryStarted'),
  [actions.setIsSwiping]: createSetter('isSwiping'),
  [actions.setPauseStoryId]: createSetter('pauseStoryId'),
  [actions.setBackgroundColor]: createSetter('backgroundColor'),
  [actions.setStartTime]: createSetter('startTime'),
  [actions.setDuration]: createSetter('duration'),
  [actions.setActiveStory]: createSetter('activeStory'),
  [actions.setActiveStoryIndex]: createSetter('activeStoryIndex'),
  [actions.setActiveStoryItem]: createSetter('activeStoryItem'),
  [actions.setActiveStoryItemIndex]: createSetter('activeStoryItemIndex'),
  [actions.reset]: () => initialState,
});
