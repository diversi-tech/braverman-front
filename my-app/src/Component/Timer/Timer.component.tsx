// // // import React, { useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { Button, Box, Typography } from '@mui/material';
// // // // import { startTimer, stopTimer } from '../store/actions/timerActions';
// // // import { Timer } from '../../model/Timer.model';
// // // import { startTimer, stopTimer } from '../../api/Toggel.api';
// // // // import { startTimer, stopTimer } from '../../Redux/Timer/timerAction';

// import React, { useState } from 'react';
// // import { startWorkTimer } from '../../api/Toggel.api';
// // import { getTotalHours, startTimer, stopTimer } from '../../api/Toggel.api';

const TimerComponent = () => {
//   const [timeEntryId, setTimeEntryId] = useState<string | null>(null);
//   const [totalHours, setTotalHours] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);

  


//   // const handleStartTimer = async () => {
//   //   try {
//   //     const response = await startWorkTimer('Working on project');
//   //     setTimeEntryId(response.id);
//   //   } catch (error) {
//   //     setError('Error starting timer');
//   //   }
//   // };

//   const handleStopTimer = async () => {
//     // if (timeEntryId) {
//     //   try {
//     //     await stopTimer(timeEntryId);
//     //     setTimeEntryId(null);
//     //     updateTotalHours();
//     //   } catch (error) {
//     //     setError('Error stopping timer');
//     //   }
//     // }
//   };

//   const updateTotalHours = async () => {
//     // try {
//     //   const response = await getTotalHours();
//     //   const totalHours = response.reduce((acc: number, entry: any) => acc + (new Date(entry.end).getTime() - new Date(entry.start).getTime()), 0);
//     //   setTotalHours(totalHours / (1000 * 60 * 60)); // המרה לשעות
//     // } catch (error) {
//     //   setError('Error getting total hours');
//     // }
//   };

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       <button onClick={handleStartTimer}>Start Timer</button>
//       <button onClick={handleStopTimer} disabled={!timeEntryId}>Stop Timer</button>
//       <p>Total Hours: {totalHours}</p>
//     </div>
//   );
};

export default TimerComponent;


// // // const Timers = () => {
// // //   const dispatch = useDispatch();
// // //   const id = 123
// // //   // const currentTimer = useSelector((state: { Timer: { currentTimer: Timer } }) => state.Timer);
// // //   const [currentTimer, setCurrentTimer] = useState<Timer | null>(null);
// // //   const handleStart = () => {
      
// // //     startTimer("project", 123)
// // //     .then((x)=>{
// // //       setCurrentTimer(x);
// // //     })
// // //     .catch((x) => {
// // //       console.log("error",x);
      
// // //     })

// // //     // const description = "Working on a task";
// // //     // currentTimer.currentTimer.projectId = "12345";
// // //     // currentTimer.currentTimer.taskId = "67890"; 
// // //   // const [currentTimer, setCurrentTimer] = useState<Timer | null>(null);
    
// // //     // dispatch(startTimer(currentTimer.currentTimer));
// // //   };
// // //   const handleStop = () => {
// // //     // if () {
// // //     //   stopTimer(currentTimer?.id != null);
// // //     // }
// // //   };
// // //   // const handleStop = () => {
// // //   //   //  iurrentTimer?.id    
// // //   // stopTimer(currentTimer?.id)
// // //   //   .then((x) =>{
// // //   //     console.log(x);
      
// // //   //   })
// // //   //   .catch((x) => {
// // //   //     console.log("error",x);
      
// // //   //   })
// // //   //   // if (currentTimer && currentTimer.currentTimer.id) {
// // //   //     // dispatch(stopTimer(currentTimer.currentTimer));
// // //   //   }
  
// // //   return (
// // //     <Box display="flex" flexDirection="column" alignItems="center" p={2}>
// // //       <Typography variant="h6">Work Timer</Typography>
// // //       {!currentTimer ? (
// // //         <Button variant="contained" color="primary" onClick={handleStart}>
// // //           Start Work
// // //         </Button>
// // //       ) : (
// // //         <Button variant="contained" color="secondary" onClick={handleStop}>
// // //           Stop Work
// // //         </Button>
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // export default Timers;

// // import React, { useState } from 'react';
// // import { getTotalHours,  startTimer,  stopTimer } from '../../api/Toggel.api';

// // const TimerComponent: React.FC = () => {
// //   const [timeEntryId, setTimeEntryId] = useState<number | null>(null);
// //   const [totalHours, setTotalHours] = useState<number>(0);
// //   const [error, setError] = useState<string | null>(null);

// //   // const handleStartTimer = async () => {
// //   //   const response = await startTimer('Working on project');
// //   //   setTimeEntryId(response.data.id);
// //   // };
// //   const handleStartTimer = async () => {
// //     try {
// //       const response = await startTimer('Working on project');
// //       setTimeEntryId(response.data.id);
// //     } catch (error) {
// //       setError('Error starting timer');
// //     }
// //   };

// //   const handleStopTimer = async () => {
// //     if (timeEntryId) {
// //       await stopTimer(timeEntryId);
// //       setTimeEntryId(null);
// //       updateTotalHours();
// //     }
// //   };

// //   const updateTotalHours = async () => {
// //     const response = await getTotalHours('YOUR_USER_ID');
// //     const totalHours = response.data.reduce((acc: number, entry: any) => acc + (new Date(entry.stop).getTime() - new Date(entry.start).getTime()), 0);
// //     setTotalHours(totalHours / (1000 * 60 * 60)); // המרה לשעות
// //   };

// //   return (
// //     <div>
// //       <button onClick={handleStartTimer}>Start Timer</button>
// //       <button onClick={handleStopTimer} disabled={!timeEntryId}>Stop Timer</button>
// //       <p>Total Hours: {totalHours}</p>
// //     </div>
// //   );
// // };

// // export default TimerComponent;
