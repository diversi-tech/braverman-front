import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, IconButton, Snackbar, Alert } from '@mui/material';
import { Task } from '../../model/task.model';
import { useDispatch, useSelector } from "react-redux";
import { getAllTaskFromServer } from "../../api/task.api";
import { setAllTask } from "../../Redux/tasx/taskAction";
import { styled } from '@mui/material/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { teal, pink } from '@mui/material/colors';
import { UpDateTask } from "../../api/task.api"; 
import Rtl from '../rtl/rtl';
import { Project } from '../../model/project.model';
import { getProject } from '../../api/project.api';
import { setAllProject } from '../../Redux/Project/projectAction';

const CardContainer = styled(Grid)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '16px',
  padding: '16px',
});

const StyledCard = styled(Card)(({ theme }) => ({
  width: '300px',
  borderRadius: '12px',
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.2)`,
  },
}));

const CardHeader = styled('div')(({ theme }) => ({
  backgroundColor:'#00397C' ,
  color: theme.palette.common.white,
  padding: '8px 16px',
  borderRadius: '12px 12px 0 0',
  textAlign: 'center',
}));

const CardContentStyled = styled(CardContent)({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
});

const UrgentTasksCard: React.FC = () => {
  const tasksState = useSelector((state: { Task: { allTask: Task[] } }) => state.Task.allTask);
  const projectState = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);

  const [project, setProject] = useState<Project[]>([]);
  const dispatch = useDispatch();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // Function to fetch user info from session
  const getUserFromSession = () => {
    // Assume we get user info from session storage or a context
    return sessionStorage.getItem('firstName') || '';
  };

  useEffect(() => {
    fetchDataTask();
    fetchDataProject();
  }, []);

  const fetchDataProject = async () => {
    try {
        let data;
        console.log(projectState.allProject);
        if (projectState.allProject.length) {
            data = projectState.allProject;
        }
        else {
            const resAllproject = await getProject();
            data = resAllproject.data;
            console.log("resAllproject", data);
            dispatch(setAllProject(resAllproject));
        }
        setProject(data);
    }
    catch (error) {
        console.error('Error fetching task:', error);
    }
}


  const fetchDataTask = async () => {
    try {
      let data;
      if (tasksState.length) {
        data = tasksState;
      } else {
        const resAllTask = await getAllTaskFromServer();
        data = resAllTask;
        dispatch(setAllTask(resAllTask));
      }
      debugger
      const now = new Date();
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(now.getDate() - 3);

      const filtered = data.filter(task => {
        console.log("task.startDate", task.startDate);
        
        const createdAtDate = new Date(task.startDate);
        return task.levelUrgencyStatus === '4' && createdAtDate < threeDaysAgo;
      });

      setFilteredTasks(filtered);
      setLoading(false);
    } catch (error) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  const convertDateTimeToDate = (date: any) => {
    debugger
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

  const handleAssignTask = async (taskId: string) => {
    try {
      const userId = getUserFromSession();
      if (!userId) {
        setSnackbarMessage('User is not logged in');
        setSnackbarOpen(true);
        return;
      }

      // Find the task to update
      const taskToUpdate = filteredTasks.find(task => task.taskId === taskId);
      if (!taskToUpdate) {
        setSnackbarMessage('Task not found');
        setSnackbarOpen(true);
        return;
      }

      // Update the task with the new assignedTo value
      const updatedTask = { ...taskToUpdate, assignedTo: userId };
      await UpDateTask(updatedTask);
        
      // Update the state
      setFilteredTasks(prevTasks =>
        prevTasks.map(task => task.taskId === taskId ? updatedTask : task)
      );

      setSnackbarMessage('Task assigned successfully');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error assigning task');
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Rtl>
      <CardContainer container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item key={task.taskId}>
            <StyledCard>
              <CardHeader>
                <Typography variant="h6" >{task.taskName}</Typography>
              </CardHeader>
              <CardContentStyled>
                <IconContainer style={{ textAlign: 'right',direction: 'rtl'}}>
                  <AccessAlarmIcon style={{ color: pink[500] }} />
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    <strong > אחראית משימה:  </strong> {task.assignedTo || 'Not assigned'}
                  </Typography>
                </IconContainer>
                <Typography variant="body2" style={{textAlign: 'right'}}>
                  <strong>תאור: </strong> {task.description || 'אין תאור'}
                </Typography>
                <Typography variant="body2" style={{textAlign: 'right'}}>
                {project
                .filter(proj => proj.projectId === task.projectId)
                 .map(proj => (
                 <div key={proj.projectId}>
                  <strong>פרויקט: </strong>{proj.businessName}
                  </div>
                 ))}</Typography>
                <Typography variant="body2" style={{textAlign: 'right'}}>
                  <strong> שם קטגוריה: </strong> {task.taskCategory.categoryName}
                </Typography>
                <Typography variant="body2" style={{textAlign: 'right'}}>
               <strong>סטטוס:  </strong>דחוף
                </Typography>
                <Typography variant="body2" style={{textAlign: 'right'}}>
                  <strong> תאריך יצירה: </strong> {convertDateTimeToDate(task.startDate) || 'Not set'}
                </Typography>
                {/* {task.assignedTo === '' && ( */}
                  <IconButton onClick={() => handleAssignTask(task.taskId)}>
                    <AssignmentTurnedInIcon style={{ color:  '#00397C' }} />
                    <Typography variant="body2">Assign to me</Typography>
                  </IconButton>
                {/* )} */}
              </CardContentStyled>
            </StyledCard>
          </Grid>
        ))}
      </CardContainer>
      </Rtl>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UrgentTasksCard;