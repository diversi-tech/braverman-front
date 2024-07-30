
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';import { User } from '../../model/user.model';
import { Timer } from '../../model/Timer.model';
import { getTheAmountOfTimeForAllProjects, getTimersGroupedByUserAndProjectAsync } from '../../api/Timer.api';
import { text } from 'stream/consumers';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface TimersData {
    users: { [key: string]: Timer[] };
    projects: { [key: string]: Timer[] };
}

const AttendanceReport: React.FC = () => {
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const [timersData, setTimersData] = useState<TimersData>({ users: {}, projects: {} });
    const [totalDuration, setTotalDuration] = useState<string>('00:00:00');
    const [groupedTimers, setGroupedTimers] = useState<{ [key: string]: Timer[] }>({});
    const [userTimers, setUserTimers] = useState<Timer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = (await getTimersGroupedByUserAndProjectAsync()).data;
                const users = response[0];
                const userId = currentUser.id;
                setUserTimers(users[userId] || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentUser]);

    useEffect(() => {
        groupTimersByDay(userTimers);
        calculateTotalDuration(userTimers);

    }, [userTimers]);

    const groupTimersByDay = (timers: Timer[]) => {
        const groupedTimerss: { [key: string]: Timer[] } = {};
        timers.forEach((timer) => {
            const date = new Date(timer.startTime).toLocaleDateString('he-IL');
            if (!groupedTimerss[date]) {
                groupedTimerss[date] = [];
            }
            groupedTimerss[date].push(timer);
        });
        setGroupedTimers(groupedTimerss);
    };

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const formatTime = (date: Date) => {
        const d = new Date(date);
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const seconds = d.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
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

    const sortedDates = Object.keys(groupedTimers).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());


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

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                    דוח נוכחות
                </Typography>
                <IconButton onClick={downloadExcel} aria-label="download">
                    <DownloadIcon />
                </IconButton>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>תאריך</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>שעת התחלה</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>שעת סיום</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>משך זמן</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>פרויקט</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedDates.map((date) => (
                            <React.Fragment key={date}>
                                {groupedTimers[date].map((timer, index) => (
                                    <TableRow key={timer?.timerId || index}>
                                        {index === 0 && (
                                            <TableCell rowSpan={groupedTimers[date].length} align="center" sx={{ backgroundColor: '#f0f0f0' }}>
                                                {date}
                                            </TableCell>
                                        )}
                                        <TableCell style={{ textAlign: 'center' }}>{formatTime(timer.startTime)}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{timer?.endTime ? formatTime(timer?.endTime) : 'פעיל'}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{timer?.duration || '00:00:00'}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{timer?.projectName}</TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="secondary">
                        סך הכל שעות עבודה: {totalDuration}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default AttendanceReport;
