import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { User } from '../../model/user.model';
import { Timer } from '../../model/Timer.model';
import { getTheAmountOfTimeForAllProjects, getTimersGroupedByUserAndProjectAsync } from '../../api/Timer.api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { log } from 'console';
import { getUserById } from '../../api/user.api';
import { blue } from '@mui/material/colors';
interface TimersData {
    users: { [key: string]: Timer[] };
    projects: { [key: string]: Timer[] };
}
const AttendanceReport: React.FC = () => {

    const [timersData, setTimersData] = useState<TimersData>({ users: {}, projects: {} });
    const [totalDuration, setTotalDuration] = useState<string>('00:00:00');
    const [groupedTimers, setGroupedTimers] = useState<{ [key: string]: Timer[] }>({});
    const [userTimers, setUserTimers] = useState<Timer[]>([]);
    const [full, setFull] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = (await getTimersGroupedByUserAndProjectAsync()).data;
                const users = response[0];
                const userId = sessionStorage.getItem("userId")
                const userTimers = users[userId] || [];
                setUserTimers(userTimers);
                groupTimersByDay(userTimers);
                calculateTotalDuration(userTimers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const groupTimersByDay = (timers: Timer[]) => {
        const groupedTimers: { [key: string]: Timer[] } = {};
        timers.forEach((timer) => {
            const date = formatDate(new Date(timer.startTime));
            if (!groupedTimers[date]) {
                groupedTimers[date] = [];
            }
            groupedTimers[date].push(timer);
        });
        setGroupedTimers(groupedTimers);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-GB'); // Changed to en-GB for dd/mm/yyyy format
    };

    const formatTime = (date: Date) => {
        return new Date(date).toISOString().substr(11, 8); // Changed format to hh:mm:ss
    };

    const calculateTotalDuration = (timers: Timer[]) => {
        let totalSeconds = 0;
        timers.forEach((timer) => {
            const [hours, minutes, seconds] = timer?.duration!.split(':').map(Number);
            totalSeconds += hours * 3600 + minutes * 60 + seconds;
        });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTotalDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const sortedDates = Object.keys(groupedTimers).sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
    });

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            Object.entries(groupedTimers).flatMap(([date, timers]) =>
                timers.map((timer) => ({
                    Date: date,
                    StartTime: formatTime(timer.startTime),
                    EndTime: timer.endTime ? formatTime(timer.endTime) : 'Active',
                    Duration: timer.duration || '00:00:00',
                    Project: timer.projectName,
                }))
            )
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'AttendanceReport.xlsx');
    };
    if (sortedDates.length == 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <>        <div style={{ fontFamily: 'CustomFont'}}>
            <Box sx={{ padding: 4, fontFamily: 'CustomFont' }}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: '20px' }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'CustomFont', fontWeight:700, color:'#002046'}}>
                        דוח נוכחות
                    </Typography>
                    <IconButton onClick={downloadExcel} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Table >
                        <TableHead >
                            <TableRow>
                                <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont' }}>תאריך</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont' }}>שעת סיום</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont' }}>שעת התחלה</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont' }}>משך זמן</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont' }}>פרויקט</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedDates.map((date) => (
                                <React.Fragment key={date}>
                                    {groupedTimers[date].map((timer, index) => (
                                        <TableRow key={timer?.timerId || index}>
                                            {index === 0 && (
                                                <TableCell rowSpan={groupedTimers[date].length} align="center" sx={{ backgroundColor: '#f0f0f0', fontFamily:'CustomFont' }}>
                                                    {date}
                                                </TableCell>
                                            )}
                                            <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont' }}>{timer?.endTime ? formatTime(timer?.endTime) : 'פעיל'}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont'}}>{formatTime(timer.startTime)}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont'}}>{timer?.duration || '00:00:00'}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily:'CustomFont'}}>{timer?.projectName}</TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontFamily: 'CustomFont',color:'#002046'}}>
                            סך הכל שעות עבודה: {totalDuration}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </div>
        </>

    );
};

export default AttendanceReport;
