import React, { useState } from 'react';
import './SendAnnouncement.css'; // קובץ CSS של העיצוב
import { sendEmail } from '../../api/sendEmail.api';
import { FiArrowDownLeft } from "react-icons/fi";

// הגדרת ממשק תקין עבור הפרופס
interface SendAnnouncementProps {
  nameProject: string;
}

const SendAnnouncement: React.FC<SendAnnouncementProps> = ({ nameProject }) => {
  const [message, setMessage] = useState('');

  // שינוי טיפוס האירוע ל-React.ChangeEvent
  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  // תיקון קריאה לפונקציה sendEmail ושימוש באובייקט תקין
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendEmail(`עדכון לגבי ${nameProject}`, message);


    console.log('הודעה נשלחה:', message);
    alert("👍👍 הצלחה בשליחת המייל! 😆😆👍👍");
    setMessage('');
  };

  return (
    <div className="contact-form">
      <div className="title"> דברו איתי  <FiArrowDownLeft /> </div>
      <div className="subtitle">השאירו לי הודעה:</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="message-input"
          placeholder="הקלידו הודעה חופשית..."
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit" className="submit-button">
          שליחת הודעה <FiArrowDownLeft />
        </button>
      </form>
    </div>
  );
};

export default SendAnnouncement;
