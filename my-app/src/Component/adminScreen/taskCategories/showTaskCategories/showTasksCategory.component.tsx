import { useEffect, useState } from "react";
import { TaskCategory } from "../../../../model/taskCategory.model";
import { getTaskCategories } from "../../../../api/taskCategory.api";
import './ShowTasksCategory.css';
import React from "react";
import { User } from "../../../../model/user.model";
import { getUserById, getUsers } from "../../../../api/user.api";

export const ShowTasksCategory: React.FC<{ 
  refresh: boolean, 
  onAddCategoryClick: () => void, 
  onEditCategoryClick: (category: TaskCategory) => void 
}> = ({ refresh, onAddCategoryClick, onEditCategoryClick }) => {
    const [tasksCategories, setTasksCategories] = useState<TaskCategory[]>([]);
    const [usersDetails,setUsersDetails]=useState<User[]>([]);
    useEffect(() => {
        async function getData() {
            try {
                const data = await getTaskCategories();
                const users=await getUsers()
                const sortedData = data.sort((a, b) => {
                    if (a.sortOrder === null) return 1;
                    if (b.sortOrder === null) return -1;
                    return a.sortOrder - b.sortOrder;
                });          
                      setTasksCategories(sortedData);
                setUsersDetails(users.filter((worker)=>worker.userType.description==="עובד"));                 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, [refresh]);

    return (
        <div id="bodyContainer">
            <div className="table-container-categories">
                <h1>קטגוריות משימות</h1>
                <table className="styled-table">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col/>
                        <col className="col-edit" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>שם הקטגוריה</th>
                            <th>מס' ימים נדרש לביצוע</th>
                            <th>מספר שלב</th>
                            <th>מבצעת</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {tasksCategories.map((category, index) => {
                            const worker = usersDetails.find((worker) => worker.id === category.userId);
                            return (
                                <tr key={index}>
                                    <td>{category.categoryName}</td>
                                    <td>{category.daysForExecution}</td>
                                    <td>{category.sortOrder !== null ? category.sortOrder : ''}</td>
                                    <td>{worker ? `${worker.firstName} ${worker.lastName}` : ''}</td>
                                    <td className="edit-icon-cell">
                                        <button onClick={() => onEditCategoryClick(category)}>
                                            <i className="material-icons edit-icon">edit</i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    
                        <tr>
                            <td colSpan={4} id="tdAddCategory">
                                <span id="addCategoryButton" onClick={onAddCategoryClick}>+</span> 
                                <span id="textAddCategory">להוספת קטגוריה</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
