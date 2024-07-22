import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../model/user.model';
import { Timer } from '../../model/Timer.model';
import { updateCurrentUser } from '../../Redux/User/userAction';



const TimerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
  const [currentTimer, setCurrentTimer] = useState<Timer | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
debugger
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
  }, [currentTimer]);

  const handleStartTimer = () => {
    const timer: Timer = {
      id: "123", // ניתן לייצר id ייחודי אחר אם נדרש
      startTime: new Date(),
    };
    setCurrentTimer(timer);
  };

  const handleStopTimer = () => {
    if (currentTimer) {
      const updatedTimer: Timer = {
        ...currentTimer,
        endTime: new Date(),
        duration: new Date().getTime() - currentTimer.startTime.getTime(),
      };

      // שמירת הטיימר במערך הטיימרים של המשתמש הנוכחי ב-RDX
      const updatedUser = {
        // ...currentUser,
        // workLog: [...currentUser.workLog, updatedTimer],
      };
      // dispatch(updateCurrentUser(updatedUser));

      // אתחול הטיימר
      setCurrentTimer(null);

      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null); // ניקוי ה-interval
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
        onClick={currentTimer ? handleStopTimer : handleStartTimer}
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
    </Box>
  );
};

export default TimerComponent;


// import React, { useState, useEffect } from 'react';
// import { Button, Typography, Box, Paper } from '@mui/material';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
// import { Timer } from '../../model/Timer.model';
// import { User } from '../../model/user.model';
// import { useSelector } from 'react-redux';

// const TimerComponent: React.FC = () => {
//   const [currentTimer, setCurrentTimer] = useState<Timer | null>(null);
//   const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
//   const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
//   console.log(currentUser.id);

//   debugger
//   useEffect(() => {
//     if (currentTimer && currentTimer.startTime && !currentTimer.endTime) {
//       const id = setInterval(() => {
//         setCurrentTimer(prevTimer => {
//           if (prevTimer && prevTimer.startTime) {
//             const now = new Date();
//             const duration = now.getTime() - prevTimer.startTime.getTime();
//             return {
//               ...prevTimer,
//               duration: duration,
//             };
//           }
//           return prevTimer;
//         });
//       }, 1000);

//       setIntervalId(id);

//       return () => {
//         if (id) {
//           clearInterval(id);
//         }
//       };
//     } else if (intervalId) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//   }, [currentTimer]);

//   const handleStartTimer = () => {
//     const timer: Timer = {
//       id: "123",
//       startTime: new Date(),
//     };
//     setCurrentTimer(timer);
//   };

//   const handleStopTimer = () => {
//     if (currentTimer) {
//       const updatedTimer: Timer = {
//         ...currentTimer,
//         endTime: new Date(),
//         duration: new Date().getTime() - currentTimer.startTime.getTime(),
//       };
//       setCurrentTimer(updatedTimer);

//       if (intervalId) {
//         clearInterval(intervalId);
//         setIntervalId(null);
//       }
//     }
//   };

//   const formatDuration = (duration: number | undefined) => {
//     if (duration === undefined) return '0:00';
//     const totalSeconds = Math.floor(duration / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 2
//       }}
//     >
//       <Button
//         variant="contained"
//         color={currentTimer ? 'secondary' : 'primary'}
//         onClick={currentTimer ? handleStopTimer : handleStartTimer}
//         sx={{
//           borderRadius: '50%',
//           width: 50,
//           height: 50,
//           minWidth: 0,
//           padding: 0,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: 30
//         }}
//       >
//         {currentTimer ? <PauseIcon /> : <PlayArrowIcon />}
//       </Button>
//       <Box sx={{ marginLeft: 2 }}>
//         <Typography variant="h6">
//           {formatDuration(currentTimer?.duration)}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default TimerComponent;
