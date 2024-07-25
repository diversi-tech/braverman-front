import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Dialog, DialogTitle, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { User } from '../../model/user.model';
import { Project } from '../../model/project.model';
import { Timer } from '../../model/Timer.model';
import { getProject } from '../../api/project.api';
import { setAllProject } from '../../Redux/Project/projectAction';
import { addTimer } from '../../api/Timer.api';

const TimerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
  const projectState = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);

  const [currentTimer, setCurrentTimer] = useState<Timer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    
    if (currentTimer && currentTimer.startTime && !currentTimer.endTime) {
      const id = setInterval(() => {

        setCurrentTimer(prevTimer => {
          if (prevTimer && prevTimer.startTime) {
            const now = new Date();
            const duration = now.getTime() - prevTimer.startTime.getTime();
            return {
              ...prevTimer,
              duration: duration,
            };
          }
          return prevTimer;
        });
      }, 1000); // Update every second

      setIntervalId(id);

      return () => {
        if (id) {
          clearInterval(id);
        }
      };
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      
    }
    fetchDataProject();
  }, [currentTimer]);

  const fetchDataProject = async () => {
    try {
      let data;
      console.log('Fetching projects...', projectState.allProject);
      if (projectState.allProject.length) {
        data = projectState.allProject;
      } else {
        const resAllproject = await getProject();
        data = resAllproject.data;
        console.log('Fetched projects:', data);
        dispatch(setAllProject(resAllproject));
      }
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  
  // Add console logs to check if the project list is correct
  console.log('Projects in state:', projects);
  
  const handleStartTimer = (projectId: string) => {
    const timer: Timer = {
      timerId: "", // ניתן לייצר id ייחודי אחר אם נדרש
      startTime: new Date(),
      projectId: projectId,
      userId: currentUser.id
    };
    setCurrentTimer(timer);
    setProjectDialogOpen(false);
  };

  const handleStopTimer = () => {
    if (currentTimer) {
      const updatedTimer: Timer = {
        ...currentTimer,
        endTime: new Date(),
        duration: new Date().getTime() - currentTimer.startTime.getTime(),
      };
      addTimer(updatedTimer)
        .then((x) => 
        {
         currentTimer.timerId = x.data
         console.log(x.data);
          
        })
      // Add the current timer to the user's workLog in Redux
      // const updatedUser = {
      //   ...currentUser,
      //   workLog: [...currentUser.workLog, updatedTimer],
      // };
      // dispatch(updateCurrentUser(updatedUser));
      setCurrentTimer(null);

      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  const formatDuration = (duration: number | undefined) => {
    if (duration === undefined) return '0:00:00';
    const totalSeconds = Math.floor(duration / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const openProjectDialog = () => {
    setProjectDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setProjectDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Button
        variant="contained"
        color={currentTimer ? 'secondary' : 'primary'}
        onClick={currentTimer ? handleStopTimer : openProjectDialog}
        sx={{
          borderRadius: '50%',
          width: 50,
          height: 50,
          minWidth: 0,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30
        }}
      >
        {currentTimer ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="h6">
          {formatDuration(currentTimer?.duration)}
        </Typography>
      </Box>
      <Dialog open={isProjectDialogOpen} onClose={closeProjectDialog}>
  <DialogTitle>Select a Project</DialogTitle>
  <List>
    {projects.map(project => (
      <ListItemButton
        key={project.projectId}
        onClick={() => handleStartTimer(project.projectId)}
        sx={{ marginBottom: 1 }}
      >
        <ListItemText primary={project.businessName} />
      </ListItemButton>
    ))}
  </List>
</Dialog>     
    </Box>
  );
};

export default TimerComponent;

