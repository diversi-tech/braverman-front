

import { useState } from "react";
import { addCategory } from "../../../../api/taskCategory.api";
import { TaskCategory } from "../../../../model/taskCategory.model";
import './addTaskCategory.css';

export const AddTaskCategory: React.FC<{ onCategoryAdded: () => void, onClose: () => void }> = ({ onCategoryAdded, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [weeksRequired, setWeeksRequired] = useState<number | undefined>(undefined);
  const [isMandatory, setIsMandatory] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName.length < 2) {
      setMessage('שם הקטגוריה חייב להיות לפחות 2 תווים');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
      return;
    }

    if (weeksRequired === undefined || weeksRequired < 0) {
      setMessage('מספר שבועות נדרש חייב להיות מספר שאינו שלילי');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
      return;
    }

    const mandatoryValue = isMandatory ? 0 : -1;

    try {
      const newCategory: TaskCategory = {
        taskCategoryId: "",
        categoryName: categoryName,
        weeksForExecution: weeksRequired,
        stageId: mandatoryValue
      }
      const result = await addCategory(newCategory);
      setMessage(`קטגוריה "${result.categoryName}" נוספה בהצלחה!`);
      setCategoryName('');
      setWeeksRequired(undefined);
      setIsMandatory(false);
      setIsMessageVisible(true);
      onCategoryAdded();
    } catch (error: any) {
      setMessage(error.response.data);
      setIsMessageVisible(true);
    }
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  return (
    
    <div className="form-container">
      <button id="closeAdd" onClick={onClose}><i className="material-icons">close</i></button>
      <h1>הוספת קטגוריה</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName" className="input-label">שם הקטגוריה:</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="weeksRequired" className="input-label">מס' שבועות נדרש לביצוע:</label>
          <div className="input-wrapper">
            <input
              type="number"
              id="weeksRequired"
              value={weeksRequired !== undefined ? weeksRequired : ''}
              onChange={(e) => setWeeksRequired(Number(e.target.value))}
              min="0"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="isMandatory" className="input-label">האם לכלול כשלב חובה?</label>
          <div className="input-wrapper">
            <input
              type="checkbox"
              id="isMandatory"
              checked={isMandatory}
              onChange={(e) => setIsMandatory(e.target.checked)}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">הוסף קטגוריה</button>
      </form>

      {isMessageVisible && <p className="message">{message}</p>}
    </div>
  );
};
