import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import Swal from 'sweetalert2';
import { Task } from '../../model/task.model';
import { Enum } from '../../model/enum.model';
import { User } from '../../model/user.model';
import { Project } from '../../model/project.model';
import { TaskCategory } from '../../model/taskCategory.model';
interface AddTaskFormProps {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleTaskAdded: (newTask: Task) => Promise<void>;
    taskStatus: Enum[];
    levelUrgencyStatus: Enum[];
    user: User[];
    project: Project[];
    taskCategory: TaskCategory[];
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ setTasks, handleTaskAdded, taskStatus, levelUrgencyStatus, user, project, taskCategory }) => {

    const [formValues, setFormValues] = useState({
        taskName: '',
        assignedTo: '',
        projectId: '',
        taskCategory: {} as TaskCategory,
        levelUrgency: levelUrgencyStatus[0] || {} as Enum, // Default value
        taskStatus: taskStatus.find(status => status.key === '1') || {} as Enum ,// Default to 'TODO'
        description: '', 
    });
    const [errors, setErrors] = useState({
        taskName: '',
        assignedTo: '',
        projectId: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>, name: keyof typeof formValues) => {
        const selectedEnum = (name === 'levelUrgency' ? levelUrgencyStatus : taskStatus).find(item => item.value === e.target.value);
        if (selectedEnum) {
            setFormValues({
                ...formValues,
                [name]: selectedEnum
            });
        }

    };

    const handleProject = (e: SelectChangeEvent<string>, name: keyof typeof formValues) => {
        const selectedProject = project.find(item => item.projectId === e.target.value);
        if (selectedProject) {
            setFormValues({
                ...formValues,
                [name]: selectedProject.projectId
            });
        }
    };

    const handleAssignedTo = (e: SelectChangeEvent<string>, name: keyof typeof formValues) => {
        const myAssignedTo = user.find(item => item.id === e.target.value);
        if (myAssignedTo) {
            setFormValues({
                ...formValues,
                [name]: myAssignedTo.id
            });
        }

    };

    const handleSelectTaskCategory = (e: SelectChangeEvent<string>, name: keyof typeof formValues) => {
        const myTaskCategory = taskCategory.find(item => item.taskCategoryId === e.target.value);
        if (myTaskCategory) {
            setFormValues({
                ...formValues,
                [name]: myTaskCategory
            });
        }

    };

    const handleAddTask = async () => {
        const { taskName, assignedTo, projectId, levelUrgency, taskStatus, taskCategory, description} = formValues;
        if (!taskName || !assignedTo || !projectId || !levelUrgency.key || !taskStatus.value || !taskCategory) {
            Swal.fire('Error', 'אנא מלא את כל השדות', 'error');
            return;
        }

        const newTask: Task = {
            taskId: '',
            taskName: taskName,
            assignedTo: assignedTo,
            projectId: projectId,
            taskCategory: taskCategory,
            startDate: new Date(),
            status: taskStatus,
            startDate: new Date(),
            canBeApprovedByManager: null,
            levelUrgencyStatus: levelUrgency.key,
            description: description,
        };

        await handleTaskAdded(newTask);
    };

    return (
        <div>
          <Rtl>
            <TextField
                dir='rtl'
                autoFocus
                margin="dense"
                name="taskName"
                label="שם משימה"
                type="text"
                fullWidth
                multiline
                value={formValues.taskName}
                error={!!errors.taskName}
                helperText={errors.taskName}
                onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense">
                <InputLabel>שם העובדת</InputLabel>
                <Select
                    name="assignedTo"
                    value={formValues.assignedTo}
                    onChange={(e) => handleAssignedTo(e, 'assignedTo')}
                >
                    {user && user.length && user.map(u => (
                        u.userType.id === '66979b192031c6931ddaa99b' &&
                        <MenuItem key={u.id} value={u.id}>
                            {u.firstName} {u.lastName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
                <InputLabel>שם הפרויקט</InputLabel>
                <Select
                    name="projectId"
                    value={formValues.projectId}
                    onChange={(e) => handleProject(e, 'projectId')}
                >
                    {project && project.length && project.map(p => (
                        <MenuItem key={p.projectId} value={p.projectId}>
                            {p.businessName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
                <InputLabel>רמת דחיפות</InputLabel>
                <Select
                    name="levelUrgency"
                    value={formValues.levelUrgency.value}
                    onChange={(e) => handleSelectChange(e, 'levelUrgency')}
                >
                    {levelUrgencyStatus.map(level => (
                        <MenuItem key={level.id} value={level.value}>
                            {level.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
                <InputLabel>קטגורית המשימה</InputLabel>
                <Select
                    name="taskCategory"
                    value={formValues.taskCategory.categoryName}
                    onChange={(e) => handleSelectTaskCategory(e, 'taskCategory')}
                >
                    {taskCategory.map(t => (
                        <MenuItem key={t.taskCategoryId} value={t.taskCategoryId}>
                            {t.categoryName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
                <InputLabel>סטטוס</InputLabel>
                <Select
                    name="taskStatus"
                    value={formValues.taskStatus.value}
                    onChange={(e) => handleSelectChange(e, 'taskStatus')}
                >
                    {taskStatus.map(status => (
                        <MenuItem key={status.id} value={status.value}>
                            {status.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="טקסט חופשי"
                dir='rtl'
                margin="dense"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                margin="normal"
            />
             </Rtl>
            <Button onClick={handleAddTask} color="primary">
                הוסף משימה
            </Button>
        </div >
    );
};

export default AddTaskForm;
