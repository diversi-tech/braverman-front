
import { useSelector } from "react-redux"
import {Task} from '../../model/task.model'
import React from 'react';
export const Tasks = () => {
    return (
        <p>tasks</p>)
}

const TTask = () => {
    const currentUserType = useSelector((state: {
        user:
        { currentUser: { UserEmail: string, UserPassword: string, UserType: string } }
    }) =>
        state.user.currentUser.UserType);



    const isAuthenticated = useSelector
        ((state: { user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);
    const currentUser = useSelector
        ((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) =>
            state.user.currentUser);
}

interface User {
    user_id: string;
    user_type: 1 | 2;
}

interface TaskListProps {
    tasks: Task[];
    user: User;
}


const TaskList: React.FC<TaskListProps> = ({ tasks, user }) => {
    const filteredTasks = user.user_type === 1
        ? tasks
        : tasks.filter(task => task.assigned_to === user.user_id);

    return (
        <div>
            <h1>Task List</h1>
            {filteredTasks.length > 0 ? (
                <ul>
                    {filteredTasks.map(task => (
                        <li key={task.task_id}>
                            <h2>{task.task_name}</h2>
                            <p>Status: {task.status}</p>
                            <p>Assigned to: {task.assigned_to}</p>
                            <p>Comment: {task.comment}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;
