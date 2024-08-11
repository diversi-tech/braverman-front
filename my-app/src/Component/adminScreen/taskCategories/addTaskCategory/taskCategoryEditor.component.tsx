import { useState, useEffect } from "react";
import { addCategory, updateCategory } from "../../../../api/taskCategory.api";
import { TaskCategory } from "../../../../model/taskCategory.model";
import './taskCategoryEditor.css';
import React from "react";
import { User } from "../../../../model/user.model";
import { getUserById, getUsers } from "../../../../api/user.api";

export const TaskCategoriesEditor: React.FC<{
  onCategoryAdded: () => void,
  onClose: () => void,
  editCategory: TaskCategory | null,

}> = ({ onCategoryAdded, onClose, editCategory }) => {

  const [categoryName, setCategoryName] = useState('');
  const [weeksRequired, setWeeksRequired] = useState<number | undefined>(undefined);
  const [isMandatory, setIsMandatory] = useState(true);
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [userId, setUserId] = useState<string|undefined>("");
  const [workers, setWorkers] = useState<User[]>([])

  useEffect(() => {
    async function getData() {

      try {
        const usersResult = await getUsers()
        setWorkers(usersResult.filter((user) => user.userType.description === "עובד"));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (editCategory) {
      setCategoryName(editCategory.categoryName);
      setWeeksRequired(editCategory.daysForExecution);
      setIsMandatory(editCategory.sortOrder !== null);
      setUserId(editCategory.userId || "");
    }
  }, [editCategory]);

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
      setMessage('מספר ימים נדרש ,חייב להיות מספר שאינו שלילי');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
      return;
    }

    const mandatoryValue = isMandatory ? 0 : -1;

    try {
      const categoryData: TaskCategory = {
        taskCategoryId: editCategory ? editCategory.taskCategoryId : "",
        categoryName: categoryName,
        daysForExecution: weeksRequired,
        sortOrder: editCategory ? isMandatory ? editCategory.sortOrder != null ? editCategory.sortOrder : mandatoryValue : mandatoryValue : mandatoryValue,
        stageId: editCategory ? editCategory.stageId : "",
        userId: userId
      }

      if (editCategory) {
        await updateCategory(categoryData.taskCategoryId, categoryData);
        setMessage(`קטגוריה "${categoryData.categoryName}" עודכנה בהצלחה!`);
      } else {
        const result = await addCategory(categoryData);
        setMessage(`קטגוריה "${result.categoryName}" נוספה בהצלחה!`);
      }

      setCategoryName('');
      setWeeksRequired(undefined);
      setIsMandatory(true);
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
      <h1 id="title">{editCategory ? 'עריכת קטגוריה' : 'הוספת קטגוריה'}</h1>
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
          <label htmlFor="weeksRequired" className="input-label">מס' ימים נדרש לביצוע:</label>
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
        <div className="form-group">
          <label htmlFor="workerSelect" className="input-label">בחר עובד:</label>
          <div className="input-wrapper">
            <select
              id="workerSelect"
              value={(workers.find((w)=>w.id===userId))?.firstName+" "+(workers.find((w)=>w.id===userId))?.lastName}
              onChange={(e) => setUserId((workers.find((w)=>w.firstName+" "+w.lastName===e.target.value))?.id)}
              
            >
              <option value="">בחר עובד</option>
              {workers.map(worker => (
                <option key={worker.id} value={worker.firstName+" "+worker.lastName}>{worker.firstName+" "+worker.lastName}</option>
              ))}
            </select>
          </div>
        </div>
        <button id="buttonSubmit" type="submit" className="submit-button">{editCategory ? 'עדכן קטגוריה' : 'הוסף קטגוריה'}</button>
      </form>

      {isMessageVisible && <p className="message">{message}</p>}
    </div>
  );
};
