
// import { useEffect, useState } from "react";
// import { TaskCategory } from "../../../../model/taskCategory.model";
// import { getTaskCategories } from "../../../../api/taskCategory.api";
// import './ShowTasksCategory.css';

// export const ShowTasksCategory: React.FC<{ refresh: boolean, onAddCategoryClick: () => void }> = ({ refresh, onAddCategoryClick }) => {
//     const [tasksCategories, setTasksCategories] = useState<TaskCategory[]>([]);

//     useEffect(() => {
//         async function getData() {
//             try {
//                 const data = await getTaskCategories();
//                 setTasksCategories(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }
//         getData();
//     }, [refresh]);

//     return (
//         <div id="bodyContainer">
//         <div className="table-container">
//             <h1>קטגוריות משימות</h1>
//             <table className="styled-table">
//                 <thead>
//                     <tr>
//                         <th>שם הקטגוריה</th>
//                         <th>מס' שבועות נדרש לביצוע</th>
//                         <th>מספר שלב</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tasksCategories.map((category, index) => (
//                         <tr key={index}>
//                             <td>{category.categoryName}</td>
//                             <td>{category.weeksForExecution}</td>
//                             <td>{category.stageId !== null ? category.stageId : ''}</td>
//                         </tr>
//                     ))}
//                     <tr>
//                         <td colSpan={3} id="tdAddCategory">
//                             <span id="addCategoryButton" onClick={onAddCategoryClick}>+</span> 
//                             <span id="textAddCategory">להוספת קטגוריה</span>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         </div>
//     );
// };
import { useEffect, useState } from "react";
import { TaskCategory } from "../../../../model/taskCategory.model";
import { getTaskCategories } from "../../../../api/taskCategory.api";
import './ShowTasksCategory.css';

export const ShowTasksCategory: React.FC<{ 
  refresh: boolean, 
  onAddCategoryClick: () => void, 
  onEditCategoryClick: (category: TaskCategory) => void 
}> = ({ refresh, onAddCategoryClick, onEditCategoryClick }) => {
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
        <div id="bodyContainer">
            <div className="table-container">
                <h1>קטגוריות משימות</h1>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>שם הקטגוריה</th>
                            <th>מס' שבועות נדרש לביצוע</th>
                            <th>מספר שלב</th>
                            <th>עריכה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasksCategories.map((category, index) => (
                            <tr key={index}>
                                <td>{category.categoryName}</td>
                                <td>{category.weeksForExecution}</td>
                                <td>{category.stageId !== null ? category.stageId : ''}</td>
                                <td>
                                    <button onClick={() => onEditCategoryClick(category)}>ערוך</button>
                                </td>
                            </tr>
                        ))}
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
