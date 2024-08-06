import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chat } from '../../model/chat.nodel';

const ChatTable = () => {
    const [messages, setMessages] = useState<Chat[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        debugger
        axios.get(`https://localhost:7119/${sessionStorage.getItem("userId")}`)
            .then(response => {
                setMessages(response.data);
            });
    }, []);

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        let userId2;
        if(sessionStorage.getItem("userType")=="מנהל")
            userId2="fghjkl";
        else
           userId2=sessionStorage.getItem("userId")
        const message = {id: '' , sender:sessionStorage.getItem("userType"), content: newMessage ,Timestamp: new Date().toISOString(), userId:userId2};
        axios.post('https://localhost:7119/api/Chat', message)
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            });
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatTable;
