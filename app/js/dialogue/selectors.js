import { name } from './constants';

export const getAll = state => state.get(name);
export const getMessages = state => state.getIn([name, 'messages']);
export const hasVisited = state => state.getIn([name, 'visited']);
