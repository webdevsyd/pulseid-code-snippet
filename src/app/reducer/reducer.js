import { combineReducers } from 'redux';

import * as authentication from '../../authentication';
import * as carouseLists from '../../carousel/carousel-lists';
import * as storyApp from '../../story/story-app';
import * as storyLists from '../../story/story-lists';
import * as storyEnrolledPopup from '../../story/story-enrolled-popup';
import * as storyTitle from '../../story/story-title';
import * as storyDetails from '../../story/story-details';

const rootReducer = combineReducers({
  [authentication.NAME]: authentication.reducer,
  [carouseLists.NAME]: carouseLists.reducer,
  [storyApp.NAME]: storyApp.reducer,
  [storyLists.NAME]: storyLists.reducer,
  [storyEnrolledPopup.NAME]: storyEnrolledPopup.reducer,
  [storyTitle.NAME]: storyTitle.reducer,
  [storyDetails.NAME]: storyDetails.reducer,
});

export default rootReducer;
