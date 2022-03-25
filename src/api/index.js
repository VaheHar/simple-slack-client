import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
	}
	return req;
})

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);
export const createWorkspace = (workspaceName) => API.post('/workspace', { name: workspaceName });
export const getSuggestions = (workspaceName) => API.post('workspace/suggest', { name: workspaceName });
export const getWorkspace = (workspaceName) => API.post('/workspace/find', { name: workspaceName });

