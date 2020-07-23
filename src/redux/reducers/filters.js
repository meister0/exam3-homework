import { SET_CATEGORY, SET_SORT_BY } from '../actions/actionTypes';

const initialState = {
	category: null,
	sortBy: 'books',
};

const filters = (state = initialState, action) => {
	switch (action.type) {
		case SET_SORT_BY:
			return {
				...state,
				sortBy: action.payload,
			};
		case SET_CATEGORY:
			return {
				...state,
				category: action.payload,
			};
		default:
			return state;
	}
};

export default filters;
