import React, { useState } from 'react';
import './editTask.css'
interface Task {
  description: string;
  files: File[];
}

const TaskEdit: React.FC = () => {
  const [task, setTask] = useState<Task>({ description: '', files: [] });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, description: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTask({ ...task, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // כאן ניתן להוסיף לוגיקה לשמירת המשימה
    console.log(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">תיאור משימה:</label>
        <textarea
          id="description"
          value={task.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label htmlFor="file-upload">העלאת קבצים:</label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">שמור</button>
    </form>
  );
};

export default TaskEdit;
