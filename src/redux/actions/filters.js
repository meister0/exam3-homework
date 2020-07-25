import { SET_CATEGORY, SET_SORT_BY } from './actionTypes';

export const setSortBy = (type) => ({
	type: SET_SORT_BY,
	payload: type,
});

export const setCategory = (catIndex) => ({
	type: SET_CATEGORY,
	payload: catIndex,
});
