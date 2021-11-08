import { useState } from "react";
import { getLocalStoage } from '../lib/storage';
import './MessageInput.scss';
import Room from '../data/settings';
import { connection } from '../contexts/session';

const MessageInput = (props) => {
    const { sendMessage } = props;
    const [ value, setValue ] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        
        const myName = getLocalStoage('brandlive-myName');
        sendMessage({ name: myName, message: value })
    }

    const onInputChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <form onSubmit={onSubmit} className='message-input'>
            <input 
                autoFocus
                value={value}
                type="text" 
                name="message"
                onChange={onInputChange}
                id="message"/>
            <button className='message-send'>Send</button>
        </form>
    )
}

export default MessageInput;

