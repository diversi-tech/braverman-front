import { useState } from "react";
import { addCategory } from "../api/taskCategory.api";

export const AddTaskCategory : React.FC<{ onCategoryAdded: () => void }>= ( { onCategoryAdded }) => {
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const result = await addCategory(categoryName);
        setMessage(`Category "${result.description}" added successfully with ID ${result.id}!`);
        setCategoryName('');
        setIsMessageVisible(true);
        onCategoryAdded();

       
      } catch (error) {
        setMessage('Error adding category');
        setIsMessageVisible(true);
       
      }
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 2000);
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
                <button type="submit">Add Category</button>
            </form>
            
            {isMessageVisible && <p>{message}</p>}
        </div>
    );
};