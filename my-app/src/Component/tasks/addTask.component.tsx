import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import Swal from 'sweetalert2';
import { Task } from '../../model/task.model';
import { Enum } from '../../model/enum.model';
import Rtl from '../rtl/rtl';

interface AddTaskFormProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleTaskAdded: (newTask: Task) => Promise<void>;
    taskStatus: Enum[];
    levelUrgencyStatus: Enum[];
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ tasks, setTasks, handleTaskAdded, taskStatus, levelUrgencyStatus }) => {
    const [formValues, setFormValues] = useState({
        taskName: '',
        assignedTo: '',
        projectId: '',
        comment: '',
        description: '',
        levelUrgency: levelUrgencyStatus[0] || {} as Enum, // Default value
        taskStatus: taskStatus.find(status => status.value === 'TODO') || {} as Enum // Default to 'TODO'
    });
    const [errors, setErrors] = useState({
        taskName: '',
        assignedTo: '',
        projectId: '',
        comment: '',
        description: '',
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
    const validateFields = () => {
        const newErrors = {
            taskName: formValues.taskName ? '' : 'שדה חובה',
            assignedTo: formValues.assignedTo ? '' : 'שדה חובה',
            projectId: formValues.assignedTo ? '' : 'שדה חובה',
            comment: formValues.comment ? '' : 'שדה חובה',
            description: formValues.description ? '' : 'שדה חובה',
        };
        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const handleAddTask = async () => {
        const { taskName, assignedTo, projectId, comment, description, levelUrgency, taskStatus } = formValues;
        if (!validateFields()) {
            return;
        }
        if (!taskName || !assignedTo || !projectId || !comment || !description || !levelUrgency.value || !taskStatus.value) {
            Swal.fire('Error', 'אנא מלא את כל השדות', 'error');
            return;
        }

        const newTask: Task = {
            taskId: '',
            taskName,
            assignedTo,
            comment,
            projectId,
            description,
            taskCategory: {
                taskCategoryId: "668d06b4825153a8af0254fd",
                categoryName: "תשלום 1/3 מקדמה",
                daysForExecution: 0,
                stageId: null,
                userId: sessionStorage.getItem('userId'),
                sortOrder: 0
            },
            startDate: new Date(),
            status: taskStatus,
            canBeApprovedByManager: null,
            levelUrgencyStatus: levelUrgency.key,
        };

        try {
            await handleTaskAdded(newTask);
        } catch (error) {
            Swal.fire('Error', 'שגיאה בהוספת המשימה', 'error');
        }
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
            <TextField
                dir='rtl'
                margin="dense"
                name="assignedTo"
                label="שם העובדת"
                type="text"
                fullWidth
                multiline
                value={formValues.assignedTo}
                error={!!errors.assignedTo}
                helperText={errors.assignedTo}
                onChange={handleInputChange}
            />
            <TextField
                dir='rtl'
                margin="dense"
                name="projectId"
                label="שם הפרויקט"
                type="text"
                fullWidth
                multiline
                value={formValues.projectId}
                error={!!errors.projectId}
                helperText={errors.projectId}
                onChange={handleInputChange}
            />
            <TextField
                dir='rtl'
                margin="dense"
                name="comment"
                label="הערה"
                type="text"
                fullWidth
                multiline
                value={formValues.comment}
                error={!!errors.comment}
                helperText={errors.comment}
                onChange={handleInputChange}
            />
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
                dir='rtl'
                margin="dense"
                name="description"
                label="תאור"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={formValues.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
            />
             </Rtl>
            <Button onClick={handleAddTask} color="primary">
                הוסף משימה
            </Button>
        </div>
    );
};

export default AddTaskForm;
