import {
	GET_AUTHORS,
	GET_BOOKS,
	GET_USERS,
	SET_BOOKS,
	SET_USERS,
} from '../actions/actionTypes';

const initialState = {
	books: [],
	users: { count: null, rows: [] },
	authors: [],
};

const data = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOOKS:
			return {
				...state,
				books: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case GET_AUTHORS:
			return {
				...state,
				authors: action.payload,
			};
		case SET_BOOKS:
			return {
				...state,
				books: action.payload,
			};
		case SET_USERS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};

export default data;
