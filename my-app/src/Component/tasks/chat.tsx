import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chat } from '../../model/chat.nodel';
import { Directions } from '@mui/icons-material';
import './chat.css'
interface Files {
   
    files: File[];
  }
  
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
    const [file, setTask] = useState<Files>({  files: [] });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setTask((prevTask) => ({ ...prevTask, files: [...prevTask.files, ...newFiles] }));
      }
    };
  
    const handleDeleteFile = (index: number) => {
      setTask((prevTask) => {
        const newFiles = [...prevTask.files];
        newFiles.splice(index, 1);
        return { ...prevTask, files: newFiles };
      });
    };
    return (
        <div>
            <h2>Chat Room</h2>
            <div id='massage'>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
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