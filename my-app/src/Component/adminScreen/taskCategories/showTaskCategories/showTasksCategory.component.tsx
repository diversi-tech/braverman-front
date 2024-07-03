import { useEffect, useState } from "react";
import { TaskCategory } from "../../../../model/taskCategory.model";
import { getTaskCategories } from "../../../../api/taskCategory.api";
import './ShowTasksCategory.css';

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
        <div className="table-container">
            <h1>קטגוריות משימות</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>שם הקטגוריה</th>
                        <th>מס' שבועות נדרש לביצוע</th>
                        <th>מספר שלב</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksCategories.map((category, index) => (
                        <tr key={index}>
                            <td>{category.categoryName}</td>
                            <td>{category.weeksForExecution}</td>
                            <td>{category.stageId !== null ? category.stageId : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
