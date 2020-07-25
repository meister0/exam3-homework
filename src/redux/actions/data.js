import axios from '../../axios';
import {
	GET_BOOKS,
	GET_AUTHORS,
	GET_USERS,
	SET_BOOKS,
	SET_USERS,
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
		default:
			throw new Error('[data(Actions)]');
	}
};

export const setData = (data, type) => {
	switch (type) {
		case SET_BOOKS:
			return {
				type: type,
				payload: data,
			};
		case SET_USERS:
			return {
				type: type,
				payload: data,
			};
		default:
			throw new Error('[data(Actions)]');
	}
};

export const getDataThunk = (url, type) => (dispatch) => {
	try {
		axios.get(url).then(({ data }) => dispatch(getData(data, type)));
	} catch (err) {
		throw new Error(err.message);
	}
};

export const patchDataThunk = (
	url,
	data,
	type,
	store,
	setIsEditable,
	count
) => (dispatch) => {
	try {
		axios.patch(url, data).then((resp) => {
			if (resp.statusText === 'OK') {
				let updItems = [];
				if (count) {
					updItems = {
						count: count,
						rows: store.map((item) =>
							item.id === resp.data.id ? resp.data : item
						),
					};
				} else {
					updItems = store.map((item) =>
						item.id === resp.data.id ? resp.data : item
					);
					dispatch(getAllData());
				}
				dispatch(setData(updItems, type));
				setIsEditable(false);
			} else throw new Error(resp.message);
		});
	} catch (err) {
		throw new Error(err.message);
	}
};

export const postDataThunk = (url, data, push) => (dispatch) => {
	try {
		axios.post(url, data).then(() => {
			dispatch(getAllData());
			push(`/${url}`);
		});
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getAllData = () => (dispatch) => {
	dispatch(getDataThunk('/author', GET_AUTHORS));
	dispatch(getDataThunk('/user', GET_USERS));
	dispatch(getDataThunk('/book', GET_BOOKS));
};
