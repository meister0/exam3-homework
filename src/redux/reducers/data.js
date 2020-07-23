import {
	GET_BOOKS,
	GET_AUTHORS,
	GET_USERS,
	GET_BOOK,
	GET_AUTHOR,
	GET_USER,
} from '../actions/actionTypes';

const initialState = {
	books: [],
	book: {},
	users: [],
	user: {},
	authors: [],
	author: {},
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
		case GET_BOOK:
			return {
				...state,
				book: action.payload,
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
			};
		case GET_AUTHOR:
			return {
				...state,
				author: action.payload,
			};
		default:
			return state;
	}
};

export default data;
