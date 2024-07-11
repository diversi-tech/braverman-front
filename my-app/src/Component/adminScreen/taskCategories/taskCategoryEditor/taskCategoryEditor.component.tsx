import { useState, useEffect } from "react";
import { addCategory, updateCategory } from "../../../../api/taskCategory.api"; // ודא שיש לך פונקציה לעדכון קטגוריה ב-API
import { TaskCategory } from "../../../../model/taskCategory.model";
import './taskCategoryEditor.css';

export const AddTaskCategory: React.FC<{
  onCategoryAdded: () => void,
  onClose: () => void,
  editCategory: TaskCategory | null
}> = ({ onCategoryAdded, onClose, editCategory }) => {

  const [categoryName, setCategoryName] = useState('');
  const [weeksRequired, setWeeksRequired] = useState<number | undefined>(undefined);
  const [isMandatory, setIsMandatory] = useState(true);
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    if (editCategory) {
      setCategoryName(editCategory.categoryName);
      setWeeksRequired(editCategory.weeksForExecution);
      setIsMandatory(editCategory.sortOrder !== null);
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
      setMessage('מספר שבועות נדרש חייב להיות מספר שאינו שלילי');
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
        weeksForExecution: weeksRequired,
        sortOrder: editCategory ? isMandatory ? editCategory.sortOrder != null ? editCategory.sortOrder : mandatoryValue : mandatoryValue : mandatoryValue,
        stageId: editCategory ? editCategory.stageId : ""
      }

      if (editCategory) {
        console.log("update");
        console.log(categoryData);


        await updateCategory(categoryData.taskCategoryId, categoryData); // ודא שיש לך פונקציה כזו ב-API
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
      <h1>{editCategory ? 'עריכת קטגוריה' : 'הוספת קטגוריה'}</h1>
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

        <button type="submit" className="submit-button">{editCategory ? 'עדכן קטגוריה' : 'הוסף קטגוריה'}</button>
      </form>

      {isMessageVisible && <p className="message">{message}</p>}
    </div>
  );
};
