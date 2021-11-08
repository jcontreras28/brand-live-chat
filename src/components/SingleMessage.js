import './SingleMessage.scss';
import { getLocalStoage } from '../lib/storage';

const getTime = (time) => {
    return (<p className="message-time">{time}</p>)
}
const getAuthor = (author) => {
    return (<p className="message-author">{author}</p>)
}

const SingleMessage = (props) => {
    // TODO: Your code here...
    const { message } = props;
    const userName = getLocalStoage('brandlive-myName');
    return (
        <div
            className={userName === message.name ? 'message-content-me' : 'message-content-other'}
        >
            {userName === message.name ?
            <div className="message-meta">
                {getTime(message.time)}
                {getAuthor(message.name)}
            </div>
            : 
            <div className="message-meta">
                {getAuthor(message.name)}
                {getTime(message.time)}
            </div>
            }
            <div className="message-content">
                <p>{message.message}</p>
            </div>
        </div>
    );
}

export default SingleMessage;