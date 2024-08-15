import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAllTaskFromServer, getTaskStatusChanges } from '../../api/task.api';
import CircularProgress from '@mui/material/CircularProgress'; // הוספת קומפוננטת הספינר
import { useSelector } from 'react-redux';
import { Task } from '../../model/task.model';

const colors = ['#FF5733', '#FFC300', '#28B463', '#DAF7A6', '#8E44AD', '#3498DB', '#E74C3C'];

const TaskCompletionGraph: React.FC = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // ניהול מצב הטעינה
    const tasksState = useSelector((state: { Task: { allTask: Task[] } }) => state.Task.allTask);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userType = sessionStorage.getItem('userType');
                const userId = sessionStorage.getItem('userId');

                const tasks = await getAllTaskFromServer();

                const filteredTasks = userType === 'מנהל' 
                    ? tasks 
                    : tasks.filter(task => task.assignedTo === userId);

                const tasksWithLogs = await Promise.all(filteredTasks.map(async (task, index) => {
                    const logsResponse = await getTaskStatusChanges(task.taskId);
                    
                    return {
                        taskId: task.taskId,
                        taskName: task.taskName,
                        logs: logsResponse,
                        color: colors[index % colors.length], // הגדרת צבעים שונים עבור כל משימה
                    };
                }));
                
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const taskCompletionData = tasksWithLogs.flatMap((taskWithLogs) => {
                    const { taskId, taskName, logs, color } = taskWithLogs;

                    const completionLogs = logs.filter(
                        (log) => log.newStatus === 'בוצע' && new Date(log.updateTime) >= thirtyDaysAgo
                    );

                    return completionLogs.map((log) => {
                        const inProgressLog = logs.find(
                            (l) => l.updateTime < log.updateTime && l.newStatus === 'בביצוע'
                        );

                        if (inProgressLog) {
                            const startDate = new Date(inProgressLog.updateTime);
                            const endDate = new Date(log.updateTime);
                            const timeDiff = endDate.getTime() - startDate.getTime();
                            const daysTheTaskWasPerformed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                            return {
                                taskId,
                                taskName,
                                daysTheTaskWasPerformed,
                                color,
                            };
                        }

                        return null;
                    }).filter((data) => data !== null);
                });

                setData(taskCompletionData);
                setIsLoading(false); // שינוי מצב הטעינה לאחר שהמידע נטען בהצלחה

            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); // שינוי מצב הטעינה גם במקרה של שגיאה
            }
        };

        fetchData();
    }, [tasksState]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}> {/* קונטיינר מרכזי */}
            {isLoading ? (
                <div>
                    <CircularProgress style={{ width: '80px', height: '80px' }} />
                    <div style={{ fontSize: '18px', color: 'gray', marginTop: '10px' }}>
                        הנתונים נטענים, נא להמתין...
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div style={{ fontSize: '18px', color: 'gray' }}>אין נתונים להצגה עבור התקופה האחרונה.</div> 
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <ResponsiveContainer width="50%" height={400}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="taskName" />
                            <YAxis
                                tickFormatter={(tick) => `${tick}`}
                                ticks={[0, 5, 10, 15, 20, 25, 30]}
                                domain={[0, 'dataMax']}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                formatter={(value, name) => {
                                    if (name === 'daysTheTaskWasPerformed') {
                                        return [`${value} ימים`, 'מספר הימים שלקחה המשימה'];
                                    }
                                    return [value, name];
                                }}
                            />
                            <Bar
                                dataKey="daysTheTaskWasPerformed"
                                isAnimationActive={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default TaskCompletionGraph;
