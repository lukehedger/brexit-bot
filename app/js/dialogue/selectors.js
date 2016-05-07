import { name } from './constants';

export const getAll = state => state[name];
export const getMessagesByUser = state => state[name].get('messagesByUser');
export const hasVisited = state => state[name].get('visited');
