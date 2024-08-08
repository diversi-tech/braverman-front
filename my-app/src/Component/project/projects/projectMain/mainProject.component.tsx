import React, { useState } from "react"
import ProjectFinish from "./finishProject.component"
import ActiveProjects from "./activeProject.component"
import "./mainProjects.css";

export const MainProject = () => {
    const [refresh, setFresh] = useState(false);

    const onChangeStatusRefresh = () => {
        setFresh(!refresh);
        console.log(refresh);

    }
    return (<div className="main-project-container">
      
        <div className="customerProjects">
            <ActiveProjects onChangeStatus={onChangeStatusRefresh} />
        </div>
        <div className="projectFinish" style={{paddingRight:'40px'}}>
            <ProjectFinish refresh={refresh} />

            </div>
        </div>
    )
}





