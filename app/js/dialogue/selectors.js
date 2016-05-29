import { name } from './constants';

export const getAll = state => state.get(name);
export const getMessagesByUser = state => state.getIn([name, 'messagesByUser']);
export const hasVisited = state => state.getIn([name, 'visited']);
