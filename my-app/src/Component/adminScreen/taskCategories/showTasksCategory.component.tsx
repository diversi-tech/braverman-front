import { useEffect, useState } from "react";
import { TaskCategory } from "../../../model/taskCategory.model";
import { getTaskCategories } from "../../../api/taskCategory.api";

export const ShowTasksCategory: React.FC<{ refresh: boolean }> = ({ refresh }) => {
    const [tasksCategories, setTasksCategories] = useState<TaskCategory[]>([]);

    useEffect(() => {
        async function getData() {
            try {
                const data = await getTaskCategories();
                setTasksCategories(data);
             
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, [refresh]);

    return (
        <div>
            <h1>Task Categories</h1>
            <ul>
                {tasksCategories.map((category,index) => (
                    <li key={index}>
                        <div>
                            <strong>Name:</strong> {category.categoryName}
                        </div>
                        <div>
                            <strong>Weeks for Execution:</strong> {category.weeksForExecution}
                        </div>
                        {category.stageId!==null&&<div>
                            <strong>Stage Id:</strong> {category.stageId }
                        </div>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
