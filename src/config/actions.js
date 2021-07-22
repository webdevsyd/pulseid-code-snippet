import { createSetterActions } from '@pulse/redux/src/action';

import { NAME } from './constants';

export const [setConfig] = createSetterActions(NAME, ['config']);

export const initialize = config => dispatch => {
  dispatch(setConfig(config));
};
