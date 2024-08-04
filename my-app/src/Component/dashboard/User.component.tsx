import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  LineElement, 
  PointElement, 
  ArcElement, 
  Filler, 
  CategoryScale, 
  LinearScale // Import LinearScale
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Typography, CircularProgress } from '@mui/material';
import { User } from '../../model/user.model';
import { useSelector } from 'react-redux';
import { getTheAmountOfTimeForAllProjects, getTimersGroupedByUserAndProjectAsync } from '../../api/Timer.api';

ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  LineElement, 
  PointElement, 
  ArcElement, 
  Filler, 
  CategoryScale, // Register CategoryScale
  LinearScale, // Register LinearScale
  ChartDataLabels
);

const DashboardComponent: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<any>({ labels: [], datasets: [] });
  const [projectData, setProjectData] = useState<any>({ labels: [], datasets: [] });
  const [totalDuration, setTotalDuration] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const duration = await getTheAmountOfTimeForAllProjects();
        setTotalDuration(duration);
        const response =  (await getTimersGroupedByUserAndProjectAsync()).data;
        const users = response[0];
        const projects = response[1];
        const userId = currentUser.id;
        const userTimers = users[userId] || [];

        const dailyAttendance = userTimers.reduce((acc: any, timer: any) => {
          const start = new Date(timer.startTime);
          const day = start.toISOString().split('T')[0];
          if (!acc[day]) acc[day] = 0;
          acc[day] += (new Date(timer.endTime || new Date()).getTime() - start.getTime()) / 3600000; // Convert to hours
          return acc;
        }, {});

        setAttendanceData({
          labels: Object.keys(dailyAttendance),
          datasets: [
            {
              label: 'שעות עבודה',
              data: Object.values(dailyAttendance),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
            },
          ],
        });

        const projectTimes = Object.keys(projects).reduce((acc: any, projectId: string) => {
          const projectTimers = projects[projectId];
          const totalProjectTime = projectTimers.reduce((sum: number, timer: any) => {
            return sum + ((new Date(timer.endTime || new Date()).getTime() - new Date(timer.startTime).getTime()) / 3600000); // Convert to hours
          }, 0);
          acc[projectId] = totalProjectTime;
          return acc;
        }, {});

        setProjectData({
          labels: Object.keys(projectTimes),
          datasets: [
            {
              label: 'זמן עבודה על פרויקטים',
              data: Object.values(projectTimes),
              backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
              borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser.id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">דשבורד</Typography>
      <Typography variant="h6">סכום כל הטיימרים: {totalDuration}</Typography>

      <Box sx={{ marginTop: 4 ,width:"40%"}}>
        <Typography variant="h6">דוח נוכחות</Typography>
        <Line data={attendanceData} options={{ plugins: { datalabels: { display: true } } }} />
      </Box>

      <Box sx={{ marginTop: 4 ,width:"40%" }}>
        <Typography variant="h6">התפלגות זמן על פרויקטים</Typography>
        <Pie data={projectData} options={{ plugins: { datalabels: { display: true } } }} />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
