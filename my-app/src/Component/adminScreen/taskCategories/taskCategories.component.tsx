import { useState } from "react";
import { AddTaskCategory } from "./addTaskCategory.component"
import { ShowTasksCategory } from "./showTasksCategory.component"

export const TaskCategories = () => {
    const [refreshCategories, setRefreshCategories] = useState(false);

    const handleCategoryAdded = () => {
      setRefreshCategories(!refreshCategories); // משנה את ה-state כדי להפעיל רינדור מחדש
    };
    return(<>

        <ShowTasksCategory refresh={refreshCategories}/>
        <AddTaskCategory  onCategoryAdded={handleCategoryAdded}/>
        </>
    )
}