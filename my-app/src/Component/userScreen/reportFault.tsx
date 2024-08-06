import React, { useEffect, useState } from 'react';
import './report.css'; // קובץ CSS נפרד לעיצוב
import { GetAllProjectPerUser } from '../../api/user.api';
import { Project } from '../../model/project.model';
import MoreStatus from '../project/moreStatus';
import { send } from 'process';
import { sendEmail } from '../../api/sendEmail.api';

const ReportIssue=() =>{
    const [project, setProject] = useState<Project | null>(null);
    const [endDate, setEndDate] = useState<string>("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
      
        getProject();
    }, []);

    const send=()=>{
        sendEmail("test", "test").then(x=>{
          if(x.status==200){
            alert("email sent");
          }
          else{
            alert("email not sent");
          }
        })
        .catch(err=>console.log(err))
    }
    const getProject = async () => {
        try {
            debugger
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const projectPerCustomer = await GetAllProjectPerUser(userId);
                console.log("Projects:", projectPerCustomer);
                if (projectPerCustomer.length > 0) {
                    setProject(projectPerCustomer[0]);
                    const dateObject = new Date(projectPerCustomer[0].endDate);
                    setEndDate(dateObject.toISOString().split('T')[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    if (!project) {
        return <p>Loading...</p>;
    }
    const action=
        { icon: <svg width="35" height="35" viewBox="0 0 44 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9995 28.8303C20.7694 28.8303 19.7383 29.8614 19.7383 31.0915C19.7383 32.3216 20.7694 33.3528 21.9995 33.3528C23.1844 33.3528 24.2607 32.3216 24.2064 31.1458C24.2607 29.8524 23.2386 28.8303 21.9995 28.8303Z" fill="#FF4131"/>
            <path d="M42.9293 36.8442C44.3493 34.393 44.3584 31.4715 42.9474 29.0294L28.7831 4.49971C27.3811 2.03046 24.8486 0.565186 22.0085 0.565186C19.1684 0.565186 16.6358 2.0395 15.2339 4.49066L1.05151 29.0475C-0.359491 31.5168 -0.350446 34.4563 1.07864 36.9075C2.48965 39.3315 5.01317 40.7878 7.83517 40.7878H36.1275C38.9586 40.7878 41.5002 39.3134 42.9293 36.8442ZM39.854 35.0714C39.0671 36.4281 37.6742 37.2331 36.1185 37.2331H7.82612C6.28849 37.2331 4.90463 36.4462 4.13581 35.1166C3.35795 33.7689 3.34891 32.1589 4.12677 30.8022L18.3091 6.25441C19.0779 4.90673 20.4528 4.11078 22.0085 4.11078C23.5552 4.11078 24.939 4.91577 25.7078 6.26346L39.8812 30.8113C40.6409 32.1318 40.6319 33.7237 39.854 35.0714Z" fill="#002046"/>
            <path d="M21.438 12.9567C20.3617 13.2642 19.6924 14.241 19.6924 15.4259C19.7467 16.1405 19.7919 16.864 19.8461 17.5786C19.9999 20.3011 20.1537 22.9693 20.3074 25.6918C20.3617 26.6144 21.0762 27.2837 21.9988 27.2837C22.9214 27.2837 23.645 26.5692 23.6902 25.6376C23.6902 25.0768 23.6902 24.5612 23.7445 23.9914C23.844 22.2457 23.9525 20.5001 24.052 18.7544C24.1063 17.6238 24.2058 16.4932 24.26 15.3626C24.26 14.9556 24.2058 14.5938 24.052 14.232C23.5907 13.219 22.5144 12.7034 21.438 12.9567Z" fill="#FF4131"/>
            </svg>
            , label: 'דיווח על תקלה באתר' ,link:""}
    

  return (
    <div className='div2'>
      {project && project.endDate && <MoreStatus project={project}></MoreStatus>}
    <div className="report-issue">
      <h2 className="title" style={{textAlign:"start",marginLeft:"40%" ,width:"1000px"}}> {action.label} {action.icon}</h2>
      <p className="description">{`!היי ${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}, האם נתקלת בבעיה באתר? אנא שתף אותנו בפרטים כדי שנוכל לטפל בה. תודה רבה`}</p>
      <textarea className="textarea" placeholder=" ...כאן תוכלו לשתף אותנו"    />

<button className='buttonnnn' onClick={() => send()}>
  <p>שליחה</p>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    ></path>
  </svg>
</button>
    </div>
 
    </div>
  );
}

export default ReportIssue;
