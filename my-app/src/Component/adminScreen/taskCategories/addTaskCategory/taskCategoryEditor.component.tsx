import { useState, useEffect } from "react";
import { addCategory, getMandatoryOptions, updateCategory } from "../../../../api/taskCategory.api";
import { TaskCategory } from "../../../../model/taskCategory.model";
import './taskCategoryEditor.css';
import React from "react";
import { User } from "../../../../model/user.model";
import { getUsers } from "../../../../api/user.api";

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
  const [userId, setUserId] = useState<string | undefined>("");
  const [workers, setWorkers] = useState<User[]>([]);
  const [mandatoryOptions, setMandatoryOptions] = useState<number[]>([]);
  const [mandatoryValue, setMandatoryValue]=useState(0);
  const [mandatoryValue2, setMandatoryValue2]=useState(0);
  let  maxOption;
  useEffect(() => {
    async function getData() {
      try {
        const usersResult = await getUsers();
        setWorkers(usersResult.filter((user) => user.userType.description === "עובד"));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function fetchMandatoryOptions() {
      try {
          maxOption = await getMandatoryOptions();
        const options = Array.from({ length: maxOption + 1 }, (_, i) => i + 1);
        setMandatoryOptions(options);
        setMandatoryValue2(maxOption);
      } catch (error) {
        console.error('Error fetching mandatory options:', error);
      }
    }

    fetchMandatoryOptions();
  }, []);

  useEffect(() => {
    if (editCategory) {
      setCategoryName(editCategory.categoryName);
      setWeeksRequired(editCategory.daysForExecution);
      setIsMandatory(editCategory.sortOrder !== null);
      setUserId(editCategory.userId || "");
      setMandatoryValue(editCategory.sortOrder);
    } else {
      setIsMandatory(true);
    }
  }, [editCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName?.length < 2) {
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


    try {
      console.log(mandatoryValue);
      
      const categoryData: TaskCategory = {
        taskCategoryId: editCategory ? editCategory.taskCategoryId : "",
        categoryName: categoryName,
        daysForExecution: weeksRequired,
        sortOrder:  !editCategory || editCategory.sortOrder === null?mandatoryValue2:mandatoryValue,
        stageId: editCategory ? editCategory.stageId : "",
        userId: userId
      };
console.log(categoryData);
console.log("in func");

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
        {!editCategory || editCategory.sortOrder === null ? (
          <div className="form-group">
            <label htmlFor="isMandatory" className="input-label">האם לכלול כשלב חובה?</label>
            <div className="input-wrapper">
              <input
                type="checkbox"
                id="isMandatory"
                checked={isMandatory}
                onChange={(e) => setIsMandatory(e.target.checked)}
              />
              {isMandatory && (
                <select
                  id="mandatorySelect"
                  value={mandatoryValue2+1}
                  onChange={(e) => setMandatoryValue2(parseInt(e.target.value))}
                  required
                >
                  <option value="">בחר מספר שלב</option>
                  {mandatoryOptions.map(option => (
                    <option key={option} value={option.toString()}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="mandatorySelect" className="input-label">בחר מספר שלב</label>
            <div className="input-wrapper">
              <select
                id="mandatorySelect"
                value={mandatoryValue}
                onChange={(e) => setMandatoryValue(parseInt(e.target.value))}
                required
              >
                <option value="">בחר מספר שלב</option>
                
                {mandatoryOptions.slice(0, -1).map(option => (
                  <option key={option} value={option.toString()}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        )}
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
                <option key={worker.id} value={worker.id}>{worker.firstName + " " + worker.lastName}</option>
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
