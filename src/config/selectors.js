import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [getConfig] = createSelectors(NAME, ['config']);

export default {};
