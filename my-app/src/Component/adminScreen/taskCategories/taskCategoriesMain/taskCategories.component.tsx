import { useState } from "react";
import { AddTaskCategory } from "../taskCategoryEditor/taskCategoryEditor.component";
import { ShowTasksCategory } from "../showTaskCategories/showTasksCategory.component";
import './taskCategories.css';
import { TaskCategory } from "../../../../model/taskCategory.model";
import React from "react";

export const TaskCategories = () => {
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState<TaskCategory|null>(null);

  const toggleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
    setEditCategory(null);
  };

  const handleCategoryAdded = () => {
    setRefreshCategories(!refreshCategories);
    setShowAddCategory(false); 
    setEditCategory(null);
  };

  const handleEditCategory = (category:TaskCategory) => {
    setEditCategory(category);
    setShowAddCategory(true);
  };

  return (
    <>
      <ShowTasksCategory 
        refresh={refreshCategories} 
        onAddCategoryClick={toggleAddCategory} 
        onEditCategoryClick={handleEditCategory} 
      />
      {showAddCategory && 
        <AddTaskCategory 
          onCategoryAdded={handleCategoryAdded} 
          onClose={toggleAddCategory} 
          editCategory={editCategory} 
        />}
    </>
  );
};
