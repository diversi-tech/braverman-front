import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Timer } from '../../model/Timer.model';
import { GetByMonthAsync } from '../../api/WorkMonth.api';

const AttendanceReportForAllUserByMonth: React.FC = () => {
    const [timersData, setTimersData] = useState<Timer[]>([]);
    // const [totalDuration, setTotalDuration] = useState<>({});
    const [selectedMonth, setSelectedMonth] = useState<string>();
    const [selectedYear, setSelectedYear] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [groupedTimers, setGroupedTimers] = useState<Timer[] >([]);
    
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear; year++) {
    years.push(year);
    }



    const fetchData = async (filter: string) => {
        debugger
        setLoading(true);
        try {
            debugger
            const timers = (await GetByMonthAsync(filter)).data            
            setTimersData(timers);
            groupTimersByDay(timers);
            calculateTotalDuration(timers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const groupTimersByDay = (timers: Timer[]) => {
        const groupedTimers:  Timer[]  = [];
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

        // setTotalDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    

    const sortedDates = Object.keys(groupedTimers).sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
    });

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            timersData.map(timer => ({
                Date: new Date(timer.startTime).toLocaleDateString('en-GB'),
                UserName: timer.userName,
                StartTime: new Date(timer.startTime).toISOString().substr(11, 8),
                EndTime: timer.endTime ? new Date(timer.endTime).toISOString().substr(11, 8) : 'Active',
                Duration: timer.duration || '00:00:00',
                Project: timer.projectName,
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'AttendanceReport_AllEmployees.xlsx');
    };
    return (
        <Box sx={{ padding: 4, fontFamily: 'CustomFont' }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '20px' }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'CustomFont', fontWeight: 700, color: '#002046' }}>
                    דוח נוכחות לפי חודש
                </Typography>
                <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
                    <InputLabel id="source-label" style={{ fontFamily: 'CustomFont' }}>בחר שנה</InputLabel>
                    <Select
                    input={<OutlinedInput sx={{ fontFamily: 'CustomFont' }} label="בחר שנה" />}
                    value={selectedYear}
                    onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedMonth(undefined);
                    }}
                >
                    {years.map((year) => (
                        <MenuItem
                            key={year}
                            style={{ textAlign: 'center', fontFamily: 'CustomFont' }}
                            value={year.toString()}
                        >
                            {year}
                        </MenuItem>
                    ))}
                    </Select>

                  
                </FormControl>
                {selectedYear &&
                    (<FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
                        <InputLabel id="source-label" style={{ fontFamily: 'CustomFont' }}>בחר חודש</InputLabel>
                        <Select
                            input={<OutlinedInput sx={{ fontFamily: 'CustomFont' }} label="בחר חודש" />}
                            value={selectedMonth}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedMonth(value);
                                fetchData(value);
                            }}
                            

                        >
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-01'}>ינואר</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-02'}>פברואר</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-03'}>מרץ</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-04'}>אפריל</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-05'}>מאי</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-06'}>יוני</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-07'}>יולי</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-08'}>אוגוסט</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-09'}>ספטמבר</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-10'}>אוקטובר</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-11'}>נובמבר</MenuItem>
                            <MenuItem style={{ textAlign: 'center', fontFamily: 'CustomFont' }} value={selectedYear + '-12'}>דצמבר</MenuItem>

                        </Select>
                    </FormControl>
                    )}
                <IconButton onClick={downloadExcel} aria-label="download">
                    <DownloadIcon />
                </IconButton>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>תאריך</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>עובד</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>שעת סיום</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>שעת התחלה</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>משך זמן</TableCell>
                                <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>פרויקט</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedDates.map((date) => (
                                <React.Fragment key={date}>
                                    {groupedTimers[date].map((timer, index) => (
                                        <TableRow key={timer?.timerId || index}>
                                            {index === 0 && (
                                                <TableCell rowSpan={groupedTimers[date].length} align="center" sx={{ backgroundColor: '#f0f0f0', fontFamily: 'CustomFont' }}>
                                                    {date}
                                                </TableCell>
                                            )}
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>{timer.userName}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>{timer?.endTime ? formatTime(timer?.endTime) : 'פעיל'}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>{formatTime(timer.startTime)}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>{timer?.duration || '00:00:00'}</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontFamily: 'CustomFont' }}>{timer?.projectName}</TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                )}
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'CustomFont', color: '#002046' }}>
                        {/* סך הכל שעות עבודה: {totalDuration} */}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};


export default AttendanceReportForAllUserByMonth;
