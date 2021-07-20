import { combineReducers } from 'redux';

import * as authentication from '../../authentication';
import * as carouseLists from '../../carousel/carousel-lists';

const rootReducer = combineReducers({
  [authentication.NAME]: authentication.reducer,
  [carouseLists.NAME]: carouseLists.reducer,
});

export default rootReducer;
