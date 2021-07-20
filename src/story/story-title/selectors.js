import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [isSaving] = createSelectors(NAME, ['isSaving']);

export default {};
