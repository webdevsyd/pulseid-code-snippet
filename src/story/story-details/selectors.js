import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [isDetailsPopupOpen] = createSelectors(NAME, ['isDetailsPopupOpen']);

export default {};
