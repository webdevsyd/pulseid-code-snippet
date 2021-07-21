import { createAction, createSetterActions } from '@pulse/redux/src/action';

import { NAME } from './constants';

export const [setIsShowPopup] = createSetterActions(NAME, ['isShowPopup']);

export const reset = createAction(`${NAME}/RESET`);

export default {};
