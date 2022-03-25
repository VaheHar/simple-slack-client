export default (workspace = null, action) => {
	switch (action.type) {
		case 'CREATE':
			return action.payload;
		case 'GET':
			return action.payload;
		default:
			return workspace;
	}
}