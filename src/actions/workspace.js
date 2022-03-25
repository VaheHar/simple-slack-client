import * as api from '../api/index.js'

export const createWorkspace = (workspaceName) => async (dispatch) => {
	try {
		const { data } = await api.createWorkspace(workspaceName);
		if (data)
			dispatch({ type: 'CREATE', payload: data });
	} catch (error) {
		console.log(error);
	}
}

export const getWorkspace = (workspaceName) => async (dispatch) => {
	try {
		const { data } = await api.getWorkspace(workspaceName);
		if (data) {
			dispatch({ type: 'GET', payload: data });
		}
	} catch (error) {
		console.log(error);
	}
}