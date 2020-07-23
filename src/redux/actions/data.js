import axios from '../../axios';
import {
	GET_BOOKS,
	GET_BOOK,
	GET_AUTHORS,
	GET_AUTHOR,
	GET_USERS,
	GET_USER,
} from './actionTypes';

export const getData = (data, type) => {
	switch (type) {
		case GET_BOOKS:
			return {
				type: type,
				payload: data,
			};
		case GET_AUTHORS:
			return {
				type: type,
				payload: data,
			};
		case GET_USERS:
			return {
				type: type,
				payload: data,
			};
		case GET_BOOK:
			return {
				type: type,
				payload: data,
			};
		case GET_AUTHOR:
			return {
				type: type,
				payload: data,
			};
		case GET_USER:
			return {
				type: type,
				payload: data,
			};
		default:
			throw new Error('[data(Actions)]');
	}
};

export const fetchGetData = (url, type) => (dispatch) => {
	try {
		axios.get(url).then(({ data }) => dispatch(getData(data, type)));
	} catch (err) {
		throw new Error(err.message);
	}
};
