import React, { useState } from 'react';
import './SendAnnouncement.css'; // קובץ CSS של העיצוב
import { sendEmail } from '../../api/sendEmail.api';
import { FiArrowDownLeft } from "react-icons/fi";
export const SendAnnouncement = (nameProject:any) => {
  const [message, setMessage] = useState('');
  const handleMessageChange = (event:any) => {
    setMessage(event.target.value);
  };
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    await sendEmail(`mail from:${nameProject}`,message);
    // כאן תוכל להוסיף לוגיקה לשליחת המייל, לדוגמה fetch או קריאה לפונקציה שתעטוף שליחת מייל
    console.log('הודעה נשלחה:', message);
    alert(":+1::+1:sucsses sending  Email:laughing::laughing::+1::+1:")
    setMessage('');
  };
  return (
    <div className="contact-form">
      <div className="title"> דברו איתי  <FiArrowDownLeft /> </div>
      <div className="subtitle">השאירו לי הודעה:</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="message-input"
          placeholder="הקלידו הודעה חופשית.."
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit" className="submit-button">
שליחת הודעה          <FiArrowDownLeft ></FiArrowDownLeft>
        </button>
      </form>
    </div>
  );
};






