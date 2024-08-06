import React, { useEffect, useState } from "react";
import ProjectDetails from "./projectDetail.component";
import ProjectDetail from "./detailProject.component";
import "./detailProject.css"; // כולל את קובץ עיצוב ה- CSS
import {  Project} from "../../../model/project.model";
const MainDetailProject: React.FC<{ detailsProject: Project }> = ({detailsProject}) => {
  const [projectData, setProjectData] = useState<any>(null); 

  return (
    <div className="main-project-container">
      <div className="details">
          <div className="project-wrapper">
            <div className="project-column" id="projectDetails">
              <ProjectDetails project={detailsProject} />
            </div>
            <div className="project-column" id="projectDetail">
              <ProjectDetail project={detailsProject} />
            </div>
                 
          </div>   
      </div>
    </div>
  );
};

export default MainDetailProject;