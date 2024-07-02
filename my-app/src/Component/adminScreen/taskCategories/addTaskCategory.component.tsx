import { useState } from "react";
import { addCategory } from "../../../api/taskCategory.api";
import { TaskCategory } from "../../../model/taskCategory.model";

export const AddTaskCategory: React.FC<{ onCategoryAdded: () => void }> = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const [weeksRequired, setWeeksRequired] = useState<number | undefined>(undefined);
  const [isMandatory, setIsMandatory] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName.length < 2) {
      setMessage('Category name must be at least 2 characters long');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
      return;
    }

    if (weeksRequired === undefined || weeksRequired < 0) {
      setMessage('Weeks required must be a non-negative number');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
      return;
    }

    const mandatoryValue = isMandatory ? 0 : -1;

    try {
      const newCategory: TaskCategory = {
        taskCategoryId:"",
        categoryName:categoryName,
        weeksForExecution:weeksRequired,
        stageId:mandatoryValue
      }
      const result = await addCategory(newCategory);
      setMessage(`Category "${result.categoryName}" added successfully with ID ${result.taskCategoryId}!`);
      setCategoryName('');
      setWeeksRequired(undefined);
      setIsMandatory(false);
      setIsMessageVisible(true);
      onCategoryAdded();
    } catch (error:any) {
      setMessage('Error adding category :'+error.response.data);
      
      setIsMessageVisible(true);
    }
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  return (
    <div>
      <h1>Add Task Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="weeksRequired">Weeks Required:</label>
          <input
            type="number"
            id="weeksRequired"
            value={weeksRequired !== undefined ? weeksRequired : ''}
            onChange={(e) => setWeeksRequired(Number(e.target.value))}
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="isMandatory">Is Mandatory:</label>
          <input
            type="checkbox"
            id="isMandatory"
            checked={isMandatory}
            onChange={(e) => setIsMandatory(e.target.checked)}
          />
        </div>
        <button type="submit">Add Category</button>
      </form>

      {isMessageVisible && <p>{message}</p>}
    </div>
  );
};
