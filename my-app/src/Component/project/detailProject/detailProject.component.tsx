import React from 'react';
import './detailProject.css';
import { Project } from "../../../model/project.model";

const ProjectDetail: React.FC<{project:Project} > = ({ project }) => {
  return (
    <div className="project-details">
      <h2>פרטי הפרויקט:</h2>
      <div>
        <div className='text'>שולם: {project.pricePaid}</div>
        <div className='text'>יתרה לתשלום: {project.totalPrice-project.pricePaid}</div> 
        <div className='text'>סטטוס פרויקט: {project.status.value}</div>
        <div className='text'>כתובת הלקוח:</div>
        <div className='text'>תאריך משוער לסיום: </div>
      </div>
    </div>
  );
};

export default ProjectDetail;