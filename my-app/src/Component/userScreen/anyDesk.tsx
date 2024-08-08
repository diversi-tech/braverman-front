import React, { useState, ChangeEvent, useEffect } from 'react';
import Swal from 'sweetalert2';
import './anyDesk.css';
import {sendEmail  } from "../../api/sendEmail.api";
import { Project } from '../../model/project.model';
import { GetAllProjectPerUser } from '../../api/user.api';
import MoreStatus from '../project/moreStatus';
const AnyDeskChecker: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [anyDeskCode, setAnyDeskCode] = useState<string>('');
  const [project, setProject] = useState<Project | null>(null);
  const [endDate, setEndDate] = useState<string>("");
  
  useEffect(() => {
    getProject();
}, []);

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

const checkAnyDesk = () => {
    Swal.fire({
      title: '? האם מותקן לך אנידסק ',
      icon: 'question',
      iconHtml: '?',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא',
      reverseButtons: true, 
    }).then((result) => {
      if (result.isConfirmed) {
        openAnyDesk();
      } else {
        setMessage(
          '<a href="https://anydesk.com/en/downloads" target="_blank" rel="noopener noreferrer">לחצו להורדה AnyDesk</a>.'
        );
        setShowCodeInput(true);
      }
    });
  };

  const openAnyDesk = () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'anydesk:';
    document.body.appendChild(iframe);

    const timeout = setTimeout(() => {
      document.body.removeChild(iframe);
      setMessage(
        '<span class="message">אנידסק לא מותקן. <a href="https://anydesk.com/en/downloads" target="_blank" rel="noopener noreferrer">AnyDesk לחצו להורדה </a>.</span>'
      );
      setShowCodeInput(true);
    }, 2000); 


  window.onblur = () => {
    clearTimeout(timeout);
    setMessage(
        '<span class="message">אנידסק מותקן ונפתח!<br />במקרה של בעיה, פתחו ידנית והכניסו את הקוד.</span>'
    );
    setShowCodeInput(true);
    window.onblur = null; 
  };
};

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnyDeskCode(e.target.value);
    };
    const sendCodeToServer = async () => {
      try {
        const body = `היי ${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")},\n\nהקוד לאנידסק :\n${anyDeskCode}`;
        await sendEmail("תמיכה טכנית", anyDeskCode);
        Swal.fire({
          title: 'נשלח בהצלחה!',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          title: 'השליחה נכשלה',
          text: 'לא הצלחנו לשלוח את המייל, אנא נסה שוב מאוחר יותר.',
          icon: 'error',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    };

  return (
    <div className='div2' style={{alignItems:"center"}}>
      {project && project.endDate && <MoreStatus project={project}></MoreStatus>}
      <div className="report-issue" style={{alignItems:"center"}}>
      <p className="title" style={{textAlign:"start",marginLeft:"40%" ,width:"1000px"}}>תמיכה מרחוק</p>
      <button className="anydesk-button" onClick={checkAnyDesk} style={{background:"red", width:"722px", height:"72px", fontSize:'30px', fontWeight:400, borderRadius:"15px", marginRight:"23%"}}>
    מותקן במחשב AnyDesk תבדוק אם יש לי
      </button>
      <p dangerouslySetInnerHTML={{ __html: message }} style={{textAlign:"right",marginRight:"10%",marginTop:'40px'}}></p>
      {showCodeInput && (
        <div className="send-code-button">
          <input
          style={{marginLeft:'17%', alignItems:'end' ,height:"60px", width:'100%',textAlign:'right'}}
            type="text"
            placeholder="הכנס כתובת האנידסק שלך"
            value={anyDeskCode}
            onChange={handleCodeChange}
          />
          <button className="send" onClick={sendCodeToServer} style={{marginRight:'35%', color:'red',background:'white'}} >
            Send Code
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default AnyDeskChecker;


