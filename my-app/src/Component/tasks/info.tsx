
import ReactDOM from "react-dom";
import { TaskStatusChanges } from "./TaskStatusChanges.component";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { getTaskStatusChanges } from "../../api/task.api";
import { logs } from "../../model/logs.model";

export const Info = () => {
    const [logData, setLogData] = useState<logs[] | null>(null); // אתחול ל-null

    const fetchTaskLogsData = async () => {
        try {
            
            const response = await getTaskStatusChanges('66992914f4680179993cea67');
            console.log(response);
            setLogData(response);
        } catch (error) {
            console.error('Error fetching task data:', error);
        }
    };

    useEffect(() => {
        if (logData !== null) { 
            Swal.fire({
                title: 'פרטי המשימה',
                html: '<div id="task-modal-container"></div>',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                didOpen: () => {
                    const container = document.getElementById('task-modal-container');
                    if (container) {
                        console.log(logData);
                        ReactDOM.render(
                            <TaskStatusChanges logData={logData} />,
                            container
                        );
                    }
                },
            });
        }
    }, [logData]);

    const showTaskModal = async () => {
        await fetchTaskLogsData();
    };

    return (
        <button onClick={showTaskModal}>
            הצג פרטי משימה
        </button>
    );
};
