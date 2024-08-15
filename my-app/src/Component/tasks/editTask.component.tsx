import React, { useEffect, useState } from 'react';
import './editTask.css';
import { Task } from '../../model/task.model';
import { Project } from '../../model/project.model';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CircleIcon from '@mui/icons-material/Circle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import { User } from '../../model/user.model';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; import Documents from './document';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { IconButton, ListItemIcon, Menu, MenuItem, Select } from '@mui/material';
import { getTaskStatusChanges, UpDateTask } from '../../api/task.api';
import { Enum } from '../../model/enum.model';
import { importFile } from '../../api/upFileTDrive';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import { TaskStatusChanges } from './TaskStatusChanges.component';
import { logs } from '../../model/logs.model';
import './info.css';
interface editTask {
  selectedTaskId: string;
  tasks: Task[];
  project: Project[];
  users: User[];
  levelUrgencyStatus: Enum[];
  setRef: React.Dispatch<React.SetStateAction<Boolean>>;
}
interface Task2 {
  description: string;
  files: File[];
}


const TaskEdit: React.FC<editTask> = ({ selectedTaskId, tasks, project, users, levelUrgencyStatus, setRef }) => {

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [task, setTask] = useState<Task2>({ description: '', files: [] });
  const [logData, setLogData] = useState<logs[] | null>(null); // אתחול ל-null

  const open3 = Boolean(anchorEl2);
  const open2 = Boolean(anchorEl);


  const drive=async () =>{
    await importFile(task.files[0])
   }
   
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickUsers = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const fetchTaskLogsData = async () => {
      try {
          
          const response = await getTaskStatusChanges(selectedTaskId);
          console.log(response);
          setLogData(response);
      } catch (error) {
          console.error('Error fetching task data:', error);
      }
  };

  useEffect(() => {
      if (logData !== null) { 
          Swal.fire({
              title: 'פרטי שינויי סטטוסים',
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
  const updateLevel = (level: string) => {
    handleClose()
    let t = findTaskById();
    if (t != null) {
      t.levelUrgencyStatus = level;
      UpDateTask(t);
    }
    setRef(true);
  }

  const updateUser = (user: string) => {
    handleClose2()
    let t = findTaskById();
    if (t != null) {
      t.assignedTo = user;
      UpDateTask(t);
    }
    setRef(true)
  }

  const findTaskById = () =>
    tasks.find(t => t.taskId === selectedTaskId)

  const convertDateTimeToDate = (date: any) => {
    if (date == null)
      return;
    if (typeof date === 'string')
      if (date.includes('-')) {
        date = new Date(date);
      } else {
        return date;
      }
    if (isNaN(date))
      return date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setTask((prevTask) => ({ ...prevTask, files: [...prevTask.files, ...newFiles] }));
      drive();
    }
  };

  return (<>
    <div id='pupProp'>
      <div id='upDateW'>
        <h1>עדכון משימה</h1>
        {tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId)}
        <h2>{tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId && t.taskName)}</h2>
        <div id='prop'>
          <div className='prop'>אחראית :<p>   </p>
            <React.Fragment>
              <IconButton onClick={handleClickUsers}><AccountCircleOutlinedIcon style={{ color: "#ccc" }} /></IconButton>
              <Menu
                anchorEl={anchorEl2}
                open={open3}
                onClose={handleClose}
                onClick={handleClose2}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0x 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                {users && users.length && users.map(u => (
                  u.userType.id === '66979b192031c6931ddaa99b' &&
                  <MenuItem key={u.id} value={u.id} onClick={() => updateUser(u.id)}>
                    {u.firstName} {u.lastName}
                  </MenuItem>
                ))}
              </Menu>
              {users && users.length && users.map(u => u.id === findTaskById()!.assignedTo && u.firstName)}
              {users && users.length && users.map(u => u.id === findTaskById()!.assignedTo && "  ")}
              {users && users.length && users.map(u => u.id === findTaskById()!.assignedTo && u.lastName)}
            </React.Fragment>
            <p>        </p>
          </div>

      
          <div>רמת דחיפות</div>
          <div className='prop'>
            <p>        </p>
            <React.Fragment>
              <IconButton onClick={handleClick}>
                {tasks && tasks.length && tasks.map(t => (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 1) && <CircleIcon style={{ color: "green" }} /> ||
                  (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 2) && <PlayArrowRoundedIcon style={{ color: "lightblue" }} /> ||
                  (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 3) && <StarRoundedIcon style={{ color: "yellow" }} /> ||
                  (t.taskId === selectedTaskId && +t.levelUrgencyStatus == 4) && <AssistantPhotoIcon style={{ color: "red" }} />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0x 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem onClick={() => updateLevel("1")}>
                  <CircleIcon style={{ color: "green" }} /> נמוך
                </MenuItem>
                <MenuItem onClick={() => updateLevel("2")}>
                  <PlayArrowRoundedIcon style={{ color: "lightblue" }} /> רגיל
                </MenuItem>
                <MenuItem onClick={() => updateLevel("3")}>
                  <ListItemIcon>
                    <StarRoundedIcon style={{ color: "yellow" }} />חשוב
                  </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={() => updateLevel("4")}>
                  <ListItemIcon>
                    <AssistantPhotoIcon style={{ color: "red" }} />
                  </ListItemIcon>דחוף
                </MenuItem>
              </Menu>
            </React.Fragment>
            <p>        </p>
          </div>
          <div className='prop'>
            <div>תאריך:</div>
            <p>   </p>
            {tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId && convertDateTimeToDate(t.startDate))}
          </div>
          <div className='prop'>
          <button className="info-button" onClick={showTaskModal}>
            !
        </button>
          </div>
        </div>
        <br />
        <div id='descreption'>
          {tasks && tasks.length && tasks.map(t => t.taskId === selectedTaskId && t.description)}
        </div>
        <br />
        <div id='files'>
          {/* <div><AttachFileRoundedIcon /></div>
          <div>העלאת קבצים נוספים:</div> */}
          <form onSubmit={(e) => e.preventDefault()}>
        <div id="ab">
          <label htmlFor="file-upload" className="upload-label">
          <AttachFileRoundedIcon />
            <span > :העלאת קבצים נוספים</span>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          <div id="aaa">
            {/* <h3>קבצים מצורפים :</h3> */}
          </div>
        </div>
     
      </form>
        </div>
      </div>
      {/* <div className='document'><Documents></Documents></div> */}
    </div >
  </>);
};

export default TaskEdit;