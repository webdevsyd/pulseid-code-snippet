import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [isShowPopup] = createSelectors(NAME, ['isShowPopup']);

export default {};
