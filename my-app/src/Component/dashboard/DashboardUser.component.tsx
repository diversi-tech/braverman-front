// DashboardComponent.tsx


import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';
import { getTheAmountOfTimeForAllProjects, getTimersGroupedByUserAndProjectAsync } from '../../api/Timer.api';
import { useSelector } from 'react-redux';
import { User } from '../../model/user.model';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { time } from 'console';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartDataLabels
  );

export const Dashboardee: React.FC = () => {
    const [totalDuration, setTotalDuration] = useState('');
    const [attendanceData, setAttendanceData] = useState<any>({
        labels: [],
        datasets: [],
    });
    const [projectData, setProjectData] = useState<any>({ labels: [], datasets: [] }); const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
debugger
    useEffect(() => {
        const fetchData = async () => {
            try {
                const duration = await getTheAmountOfTimeForAllProjects();
                setTotalDuration(duration);
                const response =  (await getTimersGroupedByUserAndProjectAsync()).data;
                console.log("fvc");
                
                console.log(response);
                
                const users = response[0];
                const projects = response[1];
                const userId = currentUser.id;
                const userTimers = users[userId] || [];

                const dailyAttendance: any = {};

                userTimers.forEach((timer: any) => {
                    const start = new Date(timer.startTime);
                    const end = new Date(timer.endTime);
                    const day = start.toISOString().split('T')[0];
                    const startHour = start.getHours();
                    const endHour = end.getHours();
                    const startMinutes = start.getMinutes();
                    const endMinutes = end.getMinutes();

                    if (!dailyAttendance[day]) dailyAttendance[day] = [];
                    dailyAttendance[day].push({
                        x: day,
                        y: [startHour + startMinutes / 60, endHour + endMinutes / 60],
                        backgroundColor: 'rgba(75,192,192,0.6)',
                    });
                });

                setAttendanceData({
                    labels: Object.keys(dailyAttendance),
                    datasets: [
                        {
                            label: 'שעות עבודה',
                            data: Object.values(dailyAttendance).flat(),
                            backgroundColor: 'rgba(75,192,192,0.6)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            barThickness: 20,
                        },
                    ],
                });

                // const projectTimes = Object.keys(projects).reduce((acc: any, projectId: string) => {
                //     const projectTimers = projects[projectId];
                //     const totalProjectTime = projectTimers.reduce((sum: number, timer: any) => {
                //         return sum + ((new Date(timer.endTime || new Date()).getTime() - new Date(timer.startTime).getTime()) / 3600000); // המרה לשעות
                //     }, 0);
                //     acc[projectId] = totalProjectTime;
                //     return acc;
                // }, {});

                // setProjectData({
                //     labels: Object.keys(projectTimes),
                //     datasets: [
                //         {
                //             label: 'זמן עבודה על פרויקטים',
                //             data: Object.values(projectTimes),
                //             backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
                //             borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
                //             borderWidth: 1,
                //         },
                //     ],
                // });



                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser.id]);

    const options: any = {
        // responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'דוח נוכחות',
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `משעה ${context.raw.y[0]} עד שעה ${context.raw.y[1]}`;
                    },
                },
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'תאריך',
                },
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'dd/MM/yyyy',
                    displayFormats: {
                        day: 'dd/MM/yyyy',
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'שעות עבודה',
                },
                // ticks: {
                //     callback: function (value: any) {
                //         const hours = Math.floor((value)*23);
                //         const minutes = 0
                //         return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                //     }
                // }
                ticks: {
                    callback: function (value: any) {
                        const hours = Math.floor(value);
                        const minutes = Math.round((value - hours) * 60);
                        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                    },
                }
                // },type: 'time',
                // time: {
                //     unit: time,
                //     tooltipFormat: '00:00',
                //     displayFormats: {
                //         day: '00:00',
                //     },
                // },
                // grid: {
                //     display: true,
                // },
            },
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <Typography variant="h4" gutterBottom>
                דשבורד
            </Typography>
            <Typography variant="h6" gutterBottom>
                סכום כל הטיימרים: {totalDuration}
            </Typography>
            {!loading && (
                <Box sx={{ width: '80%', marginTop: 4 }}>
                    <Bar data={attendanceData} options={options} />
                </Box>
            )}
           
        </Box>
    );
};



{/* <Box sx={{ marginTop: 4, height: 300 }}>
<Typography variant="h6">התפלגות זמן על פרויקטים</Typography>
<Pie data={projectData} options={{ plugins: { datalabels: { display: true } } }} />
</Box> */}













// export const Dashboardee: React.FC = () => {
//     const [totalDuration, setTotalDuration] = useState('');
//     const [attendanceData, setAttendanceData] = useState<any>({
//         labels: [],
//         datasets: [],
//     });
//     const [projectData, setProjectData] = useState<any>({ labels: [], datasets: [] }); const [loading, setLoading] = useState(true);
//     const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
// debugger
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const duration = await getTheAmountOfTimeForAllProjects();
//                 setTotalDuration(duration);
//                 const response =  (await getTimersGroupedByUserAndProjectAsync()).data;
//                 console.log("fvc");
                
//                 console.log(response);
                
//                 const users = response[0];
//                 const projects = response[1];
//                 const userId = currentUser.id;
//                 const userTimers = users[userId] || [];

//                 const dailyAttendance: any = {};

//                 userTimers.forEach((timer: any) => {
//                     const start = new Date(timer.startTime);
//                     const end = new Date(timer.endTime);
//                     const day = start.toISOString().split('T')[0];
//                     const startHour = start.getHours();
//                     const endHour = end.getHours();
//                     const startMinutes = start.getMinutes();
//                     const endMinutes = end.getMinutes();

//                     if (!dailyAttendance[day]) dailyAttendance[day] = [];
//                     dailyAttendance[day].push({
//                         x: day,
//                         y: [startHour + startMinutes / 60, endHour + endMinutes / 60],
//                         backgroundColor: 'rgba(75,192,192,0.6)',
//                     });
//                 });

//                 setAttendanceData({
//                     labels: Object.keys(dailyAttendance),
//                     datasets: [
//                         {
//                             label: 'שעות עבודה',
//                             data: Object.values(dailyAttendance).flat(),
//                             backgroundColor: 'rgba(75,192,192,0.6)',
//                             borderColor: 'rgba(75,192,192,1)',
//                             borderWidth: 1,
//                             barThickness: 20,
//                         },
//                     ],
//                 });

//                 // const projectTimes = Object.keys(projects).reduce((acc: any, projectId: string) => {
//                 //     const projectTimers = projects[projectId];
//                 //     const totalProjectTime = projectTimers.reduce((sum: number, timer: any) => {
//                 //         return sum + ((new Date(timer.endTime || new Date()).getTime() - new Date(timer.startTime).getTime()) / 3600000); // המרה לשעות
//                 //     }, 0);
//                 //     acc[projectId] = totalProjectTime;
//                 //     return acc;
//                 // }, {});

//                 // setProjectData({
//                 //     labels: Object.keys(projectTimes),
//                 //     datasets: [
//                 //         {
//                 //             label: 'זמן עבודה על פרויקטים',
//                 //             data: Object.values(projectTimes),
//                 //             backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
//                 //             borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
//                 //             borderWidth: 1,
//                 //         },
//                 //     ],
//                 // });



//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [currentUser.id]);

//     const options: any = {
//         // responsive: true,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top' as const,
//             },
//             title: {
//                 display: true,
//                 text: 'דוח נוכחות',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context: any) {
//                         return `משעה ${context.raw.y[0]} עד שעה ${context.raw.y[1]}`;
//                     },
//                 },
//             },
//             datalabels: {
//                 display: false,
//             },
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'תאריך',
//                 },
//                 type: 'time',
//                 time: {
//                     unit: 'day',
//                     tooltipFormat: 'dd/MM/yyyy',
//                     displayFormats: {
//                         day: 'dd/MM/yyyy',
//                     },
//                 },
//                 grid: {
//                     display: false,
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'שעות עבודה',
//                 },
//                 // ticks: {
//                 //     callback: function (value: any) {
//                 //         const hours = Math.floor((value)*23);
//                 //         const minutes = 0
//                 //         return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
//                 //     }
//                 // }
//                 ticks: {
//                     callback: function (value: any) {
//                         const hours = Math.floor(value);
//                         const minutes = Math.round((value - hours) * 60);
//                         return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
//                     },
//                 }
//                 // },type: 'time',
//                 // time: {
//                 //     unit: time,
//                 //     tooltipFormat: '00:00',
//                 //     displayFormats: {
//                 //         day: '00:00',
//                 //     },
//                 // },
//                 // grid: {
//                 //     display: true,
//                 // },
//             },
//         },
//     };

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 padding: 2,
//             }}
//         >
           
//            <Box sx={{ marginTop: 4, height: 300 }}>
// <Typography variant="h6">התפלגות זמן על פרויקטים</Typography>
// <Pie data={projectData} options={{ plugins: { datalabels: { display: true } } }} />
// </Box> 

//         </Box>
//     );
// };



 
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//     TimeScale,
//     ChartDataLabels
// );

// const Dashboardd: React.FC = () => {
//     const [totalDuration, setTotalDuration] = useState('');
//     const [attendanceData, setAttendanceData] = useState<any>({
//         labels: [],
//         datasets: [],
//     });
//     const [loading, setLoading] = useState(true);
//     const [currentWeek, setCurrentWeek] = useState(new Date());
//     const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const duration = await getTheAmountOfTimeForAllProjects();
//                 setTotalDuration(duration);
//                 const response = (await getTimersGroupedByUserAndProjectAsync()).data;
//                 const users = response[0]
//                 const projects = response[1];
//                 const userId = currentUser.id;
//                 const userTimers = users[userId] || [];
//                 const dailyAttendance: any = {};

//                 userTimers.forEach((timer: any) => {
//                     const start = new Date(timer.startTime);
//                     const end = new Date(timer.endTime || new Date());
//                     const day = start.toISOString().split('T')[0];
//                     if (!dailyAttendance[day]) {
//                       dailyAttendance[day] = [];
//                     }
//                     dailyAttendance[day].push({
//                       x: day,
//                       y: [start.getHours() + start.getMinutes() / 60, end.getHours() + end.getMinutes() / 60],
//                       title: `From ${start.getHours()}:${start.getMinutes()} to ${end.getHours()}:${end.getMinutes()}`,
//                       backgroundColor: 'rgba(75,192,192,0.6)',
//                     });
//                   });

//                   const sortedDays = Object.keys(dailyAttendance).sort();

//                   setAttendanceData({
//                     labels: sortedDays,
//                     datasets: [
//                       {
//                         label: 'Work Hours',
//                         data: sortedDays.flatMap(day => dailyAttendance[day]),
//                         backgroundColor: sortedDays.flatMap(day => dailyAttendance[day].map((item: any) => item.backgroundColor)),
//                         borderColor: 'rgba(75,192,192,1)',
//                         borderWidth: 1,
//                         barThickness: 20,
//                       },
//                     ],
//                   });

//                   setLoading(false);
//                 } catch (error) {
//                   console.error('Error fetching data:', error);
//                   setLoading(false);
//                 }
//               };

//               fetchData();
//             }, [currentWeek]);

//             const changeWeek = (direction: 'prev' | 'next') => {
//               setCurrentWeek(prev => {
//                 const newWeek = new Date(prev);
//                 newWeek.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
//                 return newWeek;
//               });
//             };

//             const options: any = {
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                   position: 'top',
//                 },
//                 title: {
//                   display: true,
//                   text: 'Attendance Report',
//                 },
//                 tooltip: {
//                   callbacks: {
//                     label: function (context: any) {
//                       return context.raw.title;
//                     },
//                   },
//                 },
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Date',
//                   },
//                   type: 'time',
//                   time: {
//                     unit: 'day',
//                     tooltipFormat: 'dd/MM/yyyy',
//                     displayFormats: {
//                       day: 'dd/MM/yyyy',
//                     },
//                   },
//                   grid: {
//                     display: false,
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'Hours',
//                   },
//                   ticks: {
//                     callback: function(value: any) {
//                       const hours = Math.floor(value);
//                       const minutes = Math.round((value - hours) * 60);
//                       return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
//                     },
//                     stepSize: 1,
//                   },
//                   grid: {
//                     display: false,
//                   },
//                 },
//               },
//             };

//             if (loading) {
//               return <Typography>Loading...</Typography>;
//             }

//             return (
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   padding: 2,
//                   height: '100vh',
//                 }}
//               >
//                 <Typography variant="h4" gutterBottom>
//                   Dashboard
//                 </Typography>
//                 <Typography variant="h6" gutterBottom>
//                   Total Timers: {totalDuration}
//                 </Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//                   <IconButton onClick={() => changeWeek('prev')}><ChevronLeft /></IconButton>
//                   <Typography variant="h6" sx={{ marginX: 2 }}>
//                     Week of {currentWeek.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
//                   </Typography>
//                   <IconButton onClick={() => changeWeek('next')}><ChevronRight /></IconButton>
//                 </Box>
//                 <Box
//                   sx={{
//                     width: '100%',
//                     height: '400px',
//                     overflowX: 'auto',
//                     overflowY: 'hidden',
//                   }}
//                 >
//                   <Bar data={attendanceData} options={options} />
//                 </Box>
//               </Box>
//             );
//           };


// export default Dashboardd;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { getTheAmountOfTimeForAllProjects, getTimersGroupedByUserAndProjectAsync } from '../../api/Timer.api';
// import { User } from '../../model/user.model';
// import { Timer } from '../../model/Timer.model';

// import { Box, CircularProgress, Typography } from '@mui/material';
// import { Line, Pie } from 'react-chartjs-2';

// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Chart, registerables } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// Chart.register(...registerables);

// const DashboardUser: React.FC = () => {
//     const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
//     const [attendanceData, setAttendanceData] = useState<any>({ labels: [], datasets: [] });
//     const [projectData, setProjectData] = useState<any>({ labels: [], datasets: [] });
//     const [totalDuration, setTotalDuration] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             debugger
//             try {
//                 const duration = await getTheAmountOfTimeForAllProjects();
//                 setTotalDuration(duration);
//                 const users = (await getTimersGroupedByUserAndProjectAsync()).data[0];
//                 const projects = (await getTimersGroupedByUserAndProjectAsync()).data[1];
//                 const userId = currentUser.id;
//                 const userTimers = users[userId] || [];
//                 const dailyAttendance: any = {};

//                 userTimers.forEach((timer: any) => {
//                   const start = new Date(timer.startTime);
//                   const end = new Date(timer.endTime || new Date());
//                   const day = start.toISOString().split('T')[0];
//                   if (!dailyAttendance[day]) {
//                     dailyAttendance[day] = [];
//                   }
//                   dailyAttendance[day].push({
//                     x: day,
//                     y: [start.getHours() + start.getMinutes() / 60, end.getHours() + end.getMinutes() / 60],
//                     title: `משעה ${start.getHours()}:${start.getMinutes()} עד שעה ${end.getHours()}:${end.getMinutes()}`,
//                   });
//                 });

//                 const sortedDays = Object.keys(dailyAttendance).sort();

//                 setAttendanceData({
//                     labels: sortedDays,
//                     datasets: [
//                       {
//                         label: 'שעות עבודה',
//                         data: sortedDays.flatMap(day => dailyAttendance[day]),
//                         backgroundColor: 'rgba(75,192,192,0.6)',
//                         borderColor: 'rgba(75,192,192,1)',
//                         borderWidth: 1,
//                         barThickness: 20,
//                       },
//                     ],
//                   });                

//                 // const dailyAttendance = userTimers.reduce((acc: any, timer: any) => {
//                 //     const start = new Date(timer.startTime);
//                 //     const day = start.toISOString().split('T')[0];
//                 //     if (!acc[day]) acc[day] = 0;
//                 //     acc[day] += (new Date(timer.endTime || new Date()).getTime() - start.getTime()) / 3600000; // המרה לשעות
//                 //     return acc;
//                 // }, {});


//                 // setAttendanceData({
//                 //     labels: Object.keys(dailyAttendance),
//                 //     datasets: [
//                 //         {
//                 //             label: 'שעות עבודה',
//                 //             data: Object.values(dailyAttendance),
//                 //             fill: false,
//                 //             backgroundColor: 'rgba(75,192,192,0.6)',
//                 //             borderColor: 'rgba(75,192,192,1)',
//                 //             borderWidth: 1,
//                 //         },
//                 //     ],
//                 // });


//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const options: any = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'דוח נוכחות',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context: any) {
//                         return context.raw.title;
//                     },
//                 },
//             },
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'תאריך',
//                 },
//                 type: 'time',
//                 time: {
//                     unit: 'day',
//                     tooltipFormat: 'dd/MM/yyyy',
//                     displayFormats: {
//                         day: 'dd/MM/yyyy',
//                     },
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'שעות עבודה',
//                 },
//                 ticks: {
//                     beginAtZero: true,
//                     stepSize: 1,
//                 },
//             },
//         },
//     };

//     if (loading) {
//         return <CircularProgress />;
//     }

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 padding: 2,
//             }}
//         >
//             <Typography variant="h4" gutterBottom>
//                 דשבורד
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//                 סכום כל הטיימרים: {totalDuration}
//             </Typography>
//             {!loading && (
//                 <Box sx={{ width: '80%', height: '400px', marginTop: 4 }}>
//                     <Bar data={attendanceData} options={options} />
//                 </Box>
//             )}


//         </Box>
//     );
// };

// export default DashboardUser;

// <Box sx={{ padding: 2 }}>
//     <Typography variant="h5">דשבורד</Typography>
//     <Typography variant="h6">סכום כל הטיימרים: {totalDuration}</Typography>

//     <Box sx={{ marginTop: 4, height: 300 }}>
//         <Typography variant="h6">דוח נוכחות</Typography>
//         <Line data={attendanceData} options={{ plugins: { datalabels: { display: true } } }} />
//     </Box>






// const projectTimes = Object.keys(projects).reduce((acc: any, projectId: string) => {
//     const projectTimers = projects[projectId];
//     const totalProjectTime = projectTimers.reduce((sum: number, timer: any) => {
//         return sum + ((new Date(timer.endTime || new Date()).getTime() - new Date(timer.startTime).getTime()) / 3600000); // המרה לשעות
//     }, 0);
//     acc[projectId] = totalProjectTime;
//     return acc;
// }, {});

// setProjectData({
//     labels: Object.keys(projectTimes),
//     datasets: [
//         {
//             label: 'זמן עבודה על פרויקטים',
//             data: Object.values(projectTimes),
//             backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
//             borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
//             borderWidth: 1,
//         },
//     ],
// });




{/* <Box sx={{ marginTop: 4, height: 300 }}>
<Typography variant="h6">התפלגות זמן על פרויקטים</Typography>
<Pie data={projectData} options={{ plugins: { datalabels: { display: true } } }} />
</Box> */}