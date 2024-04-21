import { get } from 'lodash';
import common from './common';

export const pageSelectors = {
	common,
};

export const getSelector = path => get(pageSelectors, path);

export default pageSelectors;
