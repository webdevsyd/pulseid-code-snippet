import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [
  isSaving,
  isPause,
  isStoryStarted,
  isSwiping,
  pauseStoryId,
  getBackgroundColor,
  getStartTime,
  getDuration,
  getActiveStory,
  getActiveStoryIndex,
  getActiveStoryItem,
  getActiveStoryItemIndex,
] = createSelectors(NAME, [
  'isSaving',
  'isPause',
  'isStoryStarted',
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

export default {};
