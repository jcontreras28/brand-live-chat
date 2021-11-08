import { useState } from 'react';
import './Username.scss';
import { setLocalStorage } from '../lib/storage';

const Username = (props) => {
    // TODO: Your code here...
    const [userName, setUserName] = useState();
    const [haveName, setHaveName] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: Your code here...
        setLocalStorage('brandlive-myName', userName);
        props.joinRoom();
        setHaveName(true);
    }

    const handleChange = (event) => {
        setUserName(event.target.value);
    }

    return (
        <div className="user-join">
            <div className="joinTitle">Enter username to join:</div>
            <form onSubmit={onSubmit} className='username-input'>
                <input 
                    type='text' 
                    name='username' 
                    id='username' 
                    maxLength={10} 
                    onChange={handleChange} />
                <button className="username-send">Join</button>
            </form>
            { haveName && 
                <div>Welcome {userName}!!!</div>
            }
        </div>
    )
}

export default Username;