
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAllTaskFromServer, getTaskStatusChanges, getTaskById } from '../../api/task.api';

const colors = ['#FF5733', '#FFC300', '#28B463', '#DAF7A6', '#8E44AD', '#3498DB', '#E74C3C'];

const TaskCompletionGraph: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getAllTaskFromServer();

                const tasksWithLogs = await Promise.all(tasks.map(async (task, index) => {
                    const logsResponse = await getTaskStatusChanges(task.taskId);
                    
                    const taskDetails = await getTaskById(task.taskId);
                    return {
                        taskId: task.taskId,
                        taskName: taskDetails.taskName,
                        logs: logsResponse,
                        color: colors[index % colors.length], // הגדרת צבעים שונים עבור כל משימה
                    };
                }));

                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const taskCompletionData = tasksWithLogs.flatMap((taskWithLogs) => {
                    const { taskId, taskName, logs, color } = taskWithLogs;
                
                    // מציאת לוגים עם סטטוס 'בוצע' בתאריך שלא מוקדם מ-30 יום אחורה
                    const completionLogs = logs.filter(
                        (log) => log.newStatus === 'בוצע' && new Date(log.updateTime) >= thirtyDaysAgo
                    );
                
                    return completionLogs.map((log) => {
                        // מציאת הלוג הראשון שבו הסטטוס השתנה מסטטוס אחר לסטטוס 'בוצע'
                        const startDateLog = logs.find(
                            (l) => l.updateTime < log.updateTime && l.newStatus !== 'בוצע'
                        );
                
                        // רק אם מצאנו לוג מתאים לחישוב הימים נבצע את החישוב
                        if (startDateLog) {
                            const startDate = new Date(startDateLog.updateTime);
                            const endDate = new Date(log.updateTime);
                            const timeDiff = endDate.getTime() - startDate.getTime();
                            const daysTheTaskWasPerformed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                            return {
                                taskId,
                                taskName,
                                daysTheTaskWasPerformed,
                                color, // שמירת הצבע עבור כל משימה
                            };
                        }
                
                        // במקרה שלא נמצא לוג מתאים, נחזיר null כדי לסנן בהמשך
                        return null;
                    }).filter((data) => data !== null); // סינון של ערכי null מהתוצאה הסופית
                });
//                 const taskCompletionData = tasksWithLogs.flatMap((taskWithLogs) => {
//                     const { taskId, taskName, logs, color } = taskWithLogs;
// console.log(tasksWithLogs);
// console.log(logs);

//                     const completionLogs = taskWithLogs.logs.filter((log) => log.newStatus === 'בוצע' && new Date(log.updateTime) >= thirtyDaysAgo);
// console.log(completionLogs);

//                     return completionLogs.map((log) => {
//                         const startDateLog = taskWithLogs.logs.find((l) => l.newStatus !== 'בוצע' && new Date(l.updateTime) < new Date(log.updateTime));
//                         if (startDateLog) {
//                             const startDate = new Date(startDateLog.updateTime);
//                             const endDate = new Date(log.updateTime);
//                             const timeDiff = endDate.getTime() - startDate.getTime();
//                             const daysTheTaskWasPerformed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//                             return {
//                                 taskId,
//                                 taskName,
//                                 daysTheTaskWasPerformed,
//                                 color, // הצבע נשמר בכל משימה
//                             };
//                         }
//                         return null;
//                     }).filter((data) => data !== null);
//                 });

                setData(taskCompletionData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
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
    );
};

export default TaskCompletionGraph;
