import React, { useState, useEffect } from 'react';
import './index.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Api from '../../services/Api';

export function NewChat({
    user,
    chatlist,
    show,
    setShow
}) {

    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results)
            };
        };
        getList();
    }, [user]);

    useEffect(() => {
    }, [list]);

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);
        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div className="newChat" style={{ left: show ? 0 : -415 }}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{ color: 'fff' }} />
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className="newChat--item" key={key}>
                        <img className="newChat--item--avatar" src={item.avatar} alt="user-avatar" />
                        <div className="newChat--item--name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewChat;