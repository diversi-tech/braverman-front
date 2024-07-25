import React, { useState } from 'react';
import './editTask.css';

// הגדרת הממשק למשימה
interface Task {
  description: string;
  files: File[];
}

const TaskEdit: React.FC = () => {
  const [task, setTask] = useState<Task>({ description: '', files: [] });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, description: e.target.value });
  };
  return (
    <div className="container">
      <div className="chat">
        <input className="input" type="text" placeholder="כתוב תגובה" />
      </div>
      <div className="content">
        <div className="header">
          <h2>מרכז כיוון</h2>
          <p>תקונים | הדרכה איך להתקדם</p>
        </div>
        <div className="tabs">
          <span>תגיות</span>
          <span>הערות</span>
          <span className="active">תשובות ופירוט</span>
          <span>היסטוריית פעולה</span>
        </div>
        <div>
          <textarea
            className="main-content"
            id="description"
            value={task.description}
            onChange={handleDescriptionChange}
          />
      </div>   
      </div>
    </div>
  );
};

export default TaskEdit;
