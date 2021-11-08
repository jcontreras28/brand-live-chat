import { createContext, useEffect, useReducer } from "react";
// version socket-io.client@2.2.0
import io from 'socket.io-client';

export const SessionContext = createContext();
export const socket = io.connect('http://localhost:3001' );

function sessionReducer(state, action) {
	// TODO: Your code here...
	switch (action.type) {
		case 'MESSAGE ERROR': {
			console.log('error!');
			return 'error';
		}
		case 'MESSAGE SENT': {
			console.log('message sent: ', state);
			return { ...state }
		}
		default: {
			console.log('message: ', state);
			return { ...state }
		}
	}
}

const Provider = ({ children }) => {
	// TODO: Your code here...
	const [state, dispatch] = useReducer(sessionReducer, {});
	const [messageList, setMessageList] = useState([]);
	const values = { state, dispatch }

	useEffect(() => {
		console.log('in useEffect');
		socket.on("send_to_clients", (data) => {
			console.log('data:', data);
			dispatch('MESSAGE SENT', data);
		});
	}, [socket]);

	return (
		<SessionContext.Provider value={values}>
			{children}
		</SessionContext.Provider>
	)
}

export default { Provider: Provider, Consumer: SessionContext.Consumer }