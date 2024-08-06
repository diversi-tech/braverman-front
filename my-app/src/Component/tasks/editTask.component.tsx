import React from 'react';
import './editTask.css';
import { Task } from '../../model/task.model';
import { Project } from '../../model/project.model';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CircleIcon from '@mui/icons-material/Circle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import { User } from '../../model/user.model';
import { AccountCircle } from '@mui/icons-material';
import Documents from './document';

interface editTask {
  selectedTaskId: string;
  tasks: Task[];
  project: Project[];
  users: User[];
  currentTask: Task;
}

const TaskEdit: React.FC<editTask> = ({ selectedTaskId, tasks, project, users, currentTask }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
    {tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId)}
    {tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId && t.taskName)}
    <div id='pupProp'>
      <div>אחראית :</div>
      <div><AccountCircle style={{ color: "GrayText" }} /></div>

      {tasks && tasks.length > 0 && tasks.map((t) => {
        return users && users.map((u) => {
          if (t.assignedTo === selectedTaskId && t.assignedTo === u.id)
            return <div>
              {u.firstName}
            </div>
        })
      })}

      <div>רמת דחיפות</div>
      <div>{tasks && tasks.length && tasks.map(t => (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 1) && <CircleIcon style={{ color: "green" }} /> ||
        (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 2) && <PlayArrowRoundedIcon style={{ color: "lightblue" }} /> ||
        (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 3) && <StarRoundedIcon style={{ color: "yellow" }} /> ||
        (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 4) && <AssistantPhotoIcon style={{ color: "red" }} />
      )}</div>
      <div>{tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId && t.levelUrgencyStatus)}</div>
      <Documents></Documents>
    </div>
  </>);
};

export default TaskEdit;
