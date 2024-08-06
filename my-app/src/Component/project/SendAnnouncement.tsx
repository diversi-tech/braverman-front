import React, { useState } from 'react';
import './SendAnnouncement.css'; // קובץ CSS של העיצוב
import { sendEmailToRivky } from '../../api/sendannouncment.api';

export const SendAnnouncement = (nameProject:any) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
  
    await sendEmailToRivky(`mail from:${nameProject}`,message);
    // כאן תוכל להוסיף לוגיקה לשליחת המייל, לדוגמה fetch או קריאה לפונקציה שתעטוף שליחת מייל
    console.log('הודעה נשלחה:', message);
    alert("👍👍sucsses sending  Email😆😆👍👍")
    setMessage('');
  };

  return (
    
    <div className="contact-form">
      <div className="arrow-icon"></div>
      <div className="title">דברו איתי</div>
      <div className="subtitle">השאירו לי הודעה:</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="message-input"
          placeholder="הקלידו הודעה חופשית.."
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit" className="submit-button">
שליחת הודעה          <span className="arrow-right"></span>
        </button>
      </form>
    </div>
  );
};


