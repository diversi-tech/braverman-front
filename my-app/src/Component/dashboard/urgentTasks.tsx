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
import { UpDateTask } from "../../api/task.api"; // Import the update function
import Rtl from '../rtl/rtl';

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
  backgroundColor: teal[500],
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
  }, []);

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

      const now = new Date();
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(now.getDate() - 3);

      const filtered = data.filter(task => {
        const createdAtDate = new Date(task.startDate);
        return task.levelUrgencyStatus === '66864040dc2e3dffad8c7bc1' && createdAtDate < threeDaysAgo;
      });

      setFilteredTasks(filtered);
      setLoading(false);
    } catch (error) {
      setError('Error fetching tasks');
      setLoading(false);
    }
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
                <Typography variant="h6">{task.taskName}</Typography>
              </CardHeader>
              <CardContentStyled>
                <IconContainer>
                  <AccessAlarmIcon style={{ color: pink[500] }} />
                  <Typography variant="body2" style={{ direction: 'rtl' }}>
                  {task.assignedTo || 'Not assigned'}   <strong  style={{ direction: 'rtl' }}> :אחראית משימה</strong> 
                  </Typography>
                </IconContainer>
                <Typography variant="body2">
                  <strong> :תאור</strong> {task.description || 'אין תאור'}
                </Typography>
                <Typography variant="body2">
                  <strong> :פרויקט </strong> {task.projectId}
                </Typography>
                <Typography variant="body2">
                  <strong> :שם קטגוריה</strong> {task.taskCategory.categoryName}
                </Typography>
                <Typography variant="body2">
                  <strong> :סטטוס</strong> {task.levelUrgencyStatus}
                </Typography>
                <Typography variant="body2">
                  <strong> :תאריך יצירה</strong> {new Date(task.startDate).toLocaleDateString()}
                </Typography>
                {/* {task.assignedTo === '' && ( */}
                  <IconButton onClick={() => handleAssignTask(task.taskId)}>
                    <AssignmentTurnedInIcon style={{ color: teal[500] }} />
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