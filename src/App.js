import React, { useState, useEffect } from 'react';
import './App.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatListItem from './components/ChatListItem/index';
import ChatIntro from './components/ChatIntro/index';
import ChatWindow from './components/ChatWindow/index';
import NewChat from './components/NewChat/index';
import Login from './components/Login';
import Api from './services/Api';

function App() {

  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(true)
  };

  const handleLoginData = async (user) => {
    let newUser = {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }
  if (user === null) {
    return (< Login onReceive={handleLoginData} />);
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat chatlist={chatList} user={user} show={showNewChat} setShow={setShowNewChat} />
        <header>
          <img className="header--avatar" src={user.avatar} alt="user-avatar" />
          <div className="header--btn">
            <div className="header--btn--area">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div onClick={handleNewChat} className="header--btn--area">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className="header--btn--area">
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon style={{ color: '#919191', fontSize: '24px' }} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>
        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="content-area">
        {activeChat.chatId !== undefined &&
          <ChatWindow user={user}
            data={activeChat} />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}
export default App;