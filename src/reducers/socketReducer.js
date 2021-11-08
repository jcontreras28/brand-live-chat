export const socketReducer = (state = [], action) => {
	// TODO: Your code here...
	switch (action.type) {
		case 'MESSAGE ERROR': {
			console.log('error!');
			return 'error';
		}
		case 'MESSAGE SENT': {
			console.log('message sent: ', state);
			return state
		}
		default: {
			console.log('message: ', state);
			return state
		}
	}
}