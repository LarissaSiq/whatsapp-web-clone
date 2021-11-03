import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import MessageItem from '../MessageItem/index';
import Api from '../../services/Api';

export function ChatWindow({
    user,
    data
}) {

    const body = useRef();
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, [list]);

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }
    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }
    const handleSendClick = () => {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }
    const handleInputKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSendClick();
        }
    }
    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--header--info">
                    <img className="chatWindow--avatar" src={data.image} alt="user-avatar" />
                    <div className="chatWindow--name">{data.title}</div>
                </div>
                <div className="chatWindow--header--btn">
                    <div className="chatWindow--btn">
                        <SearchIcon style={{ color: '919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{ color: '919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{ color: '919191' }} />
                    </div>
                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                {list.map((item, key) => (
                    <MessageItem key={key} data={item} user={user} />
                ))}
            </div>
            <div className="chatWindow--emoji-area" style={{
                height: emojiOpen ? '200px' : '0px'
            }}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker />
            </div>
            <div className="chatWindow--footer">
                <div className="chatWindow--pre">
                    <div className="chatWindow--btn" onClick={handleCloseEmoji}
                        style={{ width: emojiOpen ? 40 : 0 }}>
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn" onClick={handleOpenEmoji}>
                        <InsertEmoticonIcon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
                    </div>
                </div>
                <div className="chatWindow--input--area">
                    <input className="chatWindow--input" value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                        type="text" placeholder="Digite uma mensagem" />
                </div>
                <div className="chatWindow--pos">
                    <div className="chatWindow--btn">
                        <SendIcon onClick={handleSendClick} style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;