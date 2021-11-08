
import { useState, useEffect, useContext, useRef } from 'react';
import { SessionContext } from "../contexts/session";
import Username from "../components/Username";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { setLocalStorage, getLocalStoage } from '../lib/storage';
import Room from '../data/settings';

import './Chat.scss';

const Chat = () => {
    const socket = useContext(SessionContext)
    // TODO: Your code here...
    const [messageList, setMessageList] = useState([]);

    const isToday = (theDate) => {
        const today = new Date();
        const res = theDate.getDate() == today.getDate() &&
            theDate.getMonth() == today.getMonth() &&
            theDate.getFullYear() == today.getFullYear();
        return true;
    }
    const formatDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const formatMonth = (date) => {
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return month + ' ' + day;
    }

    const sendMessage = async (newMessage) => {
        const date = new Date();
        const today = isToday(date);
        const dateString = today ? formatDate(date) + ', Today' : formatDate(date) + ', '+formatMonth(date);
        if (newMessage !== "") {
            const messageData = {
                room: Room.Room,
                time: dateString,
                ...newMessage
            };
            await socket.emit("message", messageData);
            await setMessageList((list) => [...list, messageData]);
            setLocalStorage('brandlive-messages', JSON.stringify(messageList));
        }
    }

    let userName;
    const joinRoom = () => {
        userName = getLocalStoage('brandlive-myName');
        if (userName !== "") {
            socket.emit("join-channel", Room.Room);
        }
    }

    const myRef = useRef(null)
    const scrollToBottom = () => {
        myRef.current.scrollIntoView({ behavior: "smooth" })
        console.log('in scrollToBottom');
    }

    useEffect(scrollToBottom, [messageList]);
    useEffect(() => {
        socket.on("send_to_clients", (message) => {
            setMessageList((list) => [...list, message]);
        });
    }, [socket]);

    return (
        <div className='chat-messages'>
            <Username className="username-wrap" joinRoom={joinRoom}/>
            <div className='chat-messages'>
                <div className="message-container">
                    <Message messages={messageList} userName={userName} myRef={myRef}/>
                </div>
                <MessageInput sendMessage={sendMessage} socket={socket} />
            </div>

        </div>
    )
}

export default Chat;