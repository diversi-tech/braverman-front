import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chat } from '../../model/chat.nodel';
import { BorderColor, Directions, Padding } from '@mui/icons-material';
import './chat.css'
import { backdropClasses } from '@mui/material';
import { TbBackground } from 'react-icons/tb';
import { red } from '@mui/material/colors';
import { withWidth } from '@material-ui/core';

interface Files {
    files: File[];
  }
const ChatTable = () => {
    const [messages, setMessages] = useState<Chat[]>([]);
    const [newMessage, setNewMessage] = useState('');
    // const apiUrl = process.env.REACT_APP_BRAVERMAN
    useEffect(() => {
        debugger
        axios.get(`https://braverman-back.onrender.com/${sessionStorage.getItem("userId")}`)
            .then(response => {
                setMessages(response.data);
            });
    }, []);
    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        let userId2='';
        if(sessionStorage.getItem("userType")=="מנהל")
        
            userId2="fghjkl";   
      
        else
           userId2=sessionStorage.getItem("userId")!
           const message: Chat = {
            id: '',
            sender: sessionStorage.getItem("userType")!,
            content: newMessage,
            timestamp: new Date(new Date().toISOString()),
            userId: userId2
        };
        // const message = {id: '' , sender:sessionStorage.getItem("userType"), content: newMessage ,Timestamp: new Date().toISOString(), userId:userId2};
        debugger
        axios.post(`https://braverman-back.onrender.com/api/Chat`, message)
            .then(response => {
                setMessages([...messages,message]);
                setNewMessage('');
            });
    };
    return (
        <div style={{backgroundColor:'#ffffff'}}>
            <h2>Chat Room</h2>
            <div  id='massage'>
                {messages.map((msg, index) => (
                    <div className='masg'style={{borderColor:'red',border:'30px',color:'red',padding:'50px',borderRadius:15, display: "flex",direction:'rtl', flexDirection: 'column', gap: '10px',  backgroundColor: '#F6F6F6',width:'70%',marginLeft:'12%'}}  key={index}>
                        <strong className='msan'>{  msg.sender }:
                           </strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                placeholder='כתבי תגובה'
                    type="text"
                    style={{direction:'rtl'}}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
export default ChatTable;