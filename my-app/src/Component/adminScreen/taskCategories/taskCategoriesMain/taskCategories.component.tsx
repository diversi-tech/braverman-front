
import { useState } from "react";
import { AddTaskCategory } from "../addTaskCategory/addTaskCategory.component";
import { ShowTasksCategory } from "../showTaskCategories/showTasksCategory.component";
import './taskCategories.css';

export const TaskCategories = () => {
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const toggleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  const handleCategoryAdded = () => {
    setRefreshCategories(!refreshCategories);
    setShowAddCategory(false); 
  };

  return (
    <>
      <ShowTasksCategory refresh={refreshCategories} onAddCategoryClick={toggleAddCategory} />
      {showAddCategory && <AddTaskCategory onCategoryAdded={handleCategoryAdded} onClose={toggleAddCategory} />}
    </>
  );
};
