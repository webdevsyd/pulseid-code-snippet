import { createAction, createSetterActions } from '@pulse/redux/src/action';

import { NAME } from './constants';

export const [setIsDetailsPopupOpen] = createSetterActions(NAME, ['isDetailsPopupOpen']);

export const reset = createAction(`${NAME}/RESET`);

export default {};
