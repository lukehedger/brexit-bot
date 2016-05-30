import { name } from './constants';

export const getAll = state => state.get(name);
export const getMessages = state => state.getIn([name, 'messages']);
export const hasVisited = state => state.getIn([name, 'visited']);
export const hasBeenPolled = state => state.getIn([name, 'polled']);
export const isTheEnd = state => state.getIn([name, 'end']);
