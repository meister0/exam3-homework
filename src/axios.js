import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5555/apiV1',
	headers: { 'Content-Type': 'application/json' },
	responseType: 'json',
});

export default instance;
