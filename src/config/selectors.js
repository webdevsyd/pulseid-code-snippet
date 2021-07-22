import { createSelectors } from '@pulse/redux/src/selector';

import { NAME } from './constants';

export const [getConfig] = createSelectors(NAME, ['config']);

export const getConfigBackgroundColor = state => getConfig(state).backgroundColor || '';

export const getConfigBorderColor = state => getConfig(state).borderColor || '';

export const getTitle = state => getConfig(state).title || '';

export const getSubTitle = state => getConfig(state).subTitle || '';

export default {};
