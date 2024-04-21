import { get } from 'lodash';
import page from './sample';

export const fixtures = {
	page,
};

export const getFixture = path => get(fixtures, path);

export default fixtures;
