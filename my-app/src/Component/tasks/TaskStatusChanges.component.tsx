import { useEffect, useState } from "react";
import { getTaskById } from "../../api/task.api";
import { getUserById } from "../../api/user.api";
import { User } from "../../model/user.model";

export const TaskStatusChanges = ({ logData }) => {
  const [data, setData] = useState(logData);

  useEffect(() => {
    async function fetchDataDetails() {
      if (logData.length === 0) return; 

      try {
        let taskResponse = await getTaskById(logData[0].taskId);
        let taskName = taskResponse.taskName;

      
        const usersPromises = data.map(async item => {
          const response = await getUserById(item.userId);
          return response[0]; 
        });
        const usersData = await Promise.all(usersPromises);
        
        const updatedData = data.map(item => {
          const user = usersData.find(user => user.id === item.userId);
          const date = new Date(item.updateTime);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
          const year = date.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;
          return {
            ...item,
            taskName: item.taskId === logData[0].taskId ? taskName : item.taskName,
            userName: user ? user.firstName+" "+user.lastName : item.userName ,
            formattedDate
          };
        });
     setData(updatedData);
      } catch (error) {
        console.error('Error fetching data details:', error);
      }
    }
    fetchDataDetails();
  }, [logData]);

  
  return (
    <div>
        <div style={{textAlign:'center', fontWeight:'bolder'}}>{data[0].taskName}</div>
      <table style={{ width: '100%', marginTop: '20px', textAlign: 'center', borderCollapse: 'collapse', direction: 'rtl' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>סטטוס קודם</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>סטטוס נוכחי</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>תאריך שינוי</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>אחראי השינוי</th>
          </tr>
        </thead>
        <tbody>
          {data.map((status, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{status.oldStatus == null ? '' : status.oldStatus}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{status.newStatus}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{status.formattedDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{status.userName}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}