import './Message.scss';
import SingleMessage from './SingleMessage';

const Message = (props) => {
    // TODO: Your code here...
    return (
        <div className="message-list-wrap">
            <p className="messagesTitle">Messages:</p>
            <div className="message-list">
                {props.messages.map((message, index) => (
                    <SingleMessage message={message} key={index}/>
                ))}
            </div>
            <div ref={props.myRef} id="dummydiv"/>
        </div>
    );
}

export default Message;