import { combineReducers } from 'redux';
import data from './data';
import filters from './filters';

const rootReducer = combineReducers({
	data,
	filters,
});

export default rootReducer;
