import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Dialog, DialogTitle, List, ListItem, ListItemText, ListItemButton, Divider, Radio } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { User } from '../../model/user.model';
import { Project } from '../../model/project.model';
import { Timer } from '../../model/Timer.model';
import { getProject } from '../../api/project.api';
import { setAllProject } from '../../Redux/Project/projectAction';
import { addTimer } from '../../api/Timer.api';
import { LuAlarmClock } from "react-icons/lu";
import { TbClockPause } from "react-icons/tb";
import { TbClockPlay } from "react-icons/tb";


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
            const duration = new Date(now.getTime() - prevTimer.startTime.getTime())
              .toISOString()
              .substr(11, 8); // פורמט hh:mm:ss
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

  const handleStartTimer = (projectId: string, projectName: string) => {
    const timer: Timer = {
      timerId: "", // ניתן לייצר id ייחודי אחר אם נדרש
      startTime: new Date(),
      projectId: projectId,
      userId: currentUser.id,
      projectName: projectName
    };
    setCurrentTimer(timer);
    setProjectDialogOpen(false);
  };

  const handleStopTimer = () => {
    if (currentTimer) {
      const endTime = new Date();
      const duration = new Date(endTime.getTime() - currentTimer.startTime.getTime())
        .toISOString()
        .substr(11, 8); // פורמט hh:mm:ss    
      const updatedTimer: Timer = {
        ...currentTimer,
        endTime: endTime,
        duration: duration,
      };
      addTimer(updatedTimer)
        .then((x) => {
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

  const formatDuration = (duration: string | undefined) => {
    return duration || '00:00:00';
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
        padding: 2,
        position: 'absolute', left: '250px', top: '20px'

      }}
    >
      <Button
      // variant="contained"
      onClick={currentTimer ? handleStopTimer : openProjectDialog}
      sx={{
        // backgroundColor: 'white',
        color: 'black',
        borderRadius: '50%',
        width: 40,
        height: 40,
        minWidth: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,

      }}
    >
      {currentTimer ? <TbClockPause /> : <TbClockPlay />}
    </Button>
      {/* <LuAlarmClock  onClick={currentTimer ? handleStopTimer : openProjectDialog}
 /> */}

      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="h6">
          {formatDuration(currentTimer?.duration)}
        </Typography>
      </Box>

<Dialog
  open={isProjectDialogOpen}
  onClose={closeProjectDialog}
  maxWidth="sm"
  fullWidth
  sx={{
    '& .MuiDialog-paper': {
      borderRadius: 4,
      padding: 2,
    },
  }}
>
  <DialogTitle
    sx={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    }}
  >
    בחר פרויקט
  </DialogTitle>
  <List sx={{ direction: 'rtl' }}>
    {projects.map((project, index) => (
      <React.Fragment key={project.projectId}>
        <ListItemButton
          onClick={() => handleStartTimer(project.projectId, project.businessName)}
          sx={{
            borderRadius: 2,
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'space-between',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
            },
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
            },
          }}
        >
          <Radio
            checked={false}
            sx={{
              marginLeft: 2,
              '&.Mui-checked': {
                color: 'primary.main',
              },
            }}
          />
          <ListItemText
            primary={project.businessName}
            sx={{ textAlign: 'right' }}
          />
          <Typography
            variant="body2"
            sx={{
              marginLeft: 2,
              alignSelf: 'center',
              fontWeight: 'bold',
              color: 'text.secondary',
            }}
          >
          </Typography>
        </ListItemButton>
      </React.Fragment>
    ))}
  </List>
</Dialog>

      {/* <Dialog open={isProjectDialogOpen} onClose={closeProjectDialog}>
        <DialogTitle>בחר פרויקט</DialogTitle>
        <List>
          {projects.map(project => (
            <ListItemButton
              key={project.projectId}
              onClick={() => handleStartTimer(project.projectId, project.businessName)}
              sx={{ marginBottom: 1 }}
            >
              <ListItemText primary={project.businessName} />
            </ListItemButton>
          ))}
        </List>
      </Dialog> */}
    </Box>
  );
};

export default TimerComponent;

