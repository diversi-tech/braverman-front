import React from 'react';
import './detailProject.css';
import { Project } from "../../../model/project.model";
const convertDateTimeToDate = (date:any) => {
  if(date==null)
    return;
if (typeof date === 'string') 
  if (date.includes('-')) {
    date = new Date(date);
  } 
  else {
    return date;
  }
 if(isNaN(date))
   return date;
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); 
const day = String(date.getDate()).padStart(2, '0');

return `${day}/${month}/${year}`;
};
const ProjectDetail: React.FC<{project:Project} > = ({ project }) => {
  return (
    <div className="project-details">
      <h2 className="inline-text">פרטי הפרויקט</h2>
      <div>
        <div className='text'id="textPaid">שולם: {project.pricePaid}</div>
        <div className='text'>יתרה לתשלום: {project.totalPrice-project.pricePaid}</div> 
        <div className='text' >סטטוס פרויקט: {project.status.value}</div>
        <div className='text'>כתובת הלקוח:</div>
        <div className='text'>תאריך משוער לסיום: {convertDateTimeToDate(project.endDate)}</div>
      </div>
    </div>
  );
};

export default ProjectDetail;