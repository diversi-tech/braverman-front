import React, { useState } from "react"
import ProjectFinish from "./finishProject.component"
import ActiveProjects from "./activeProject.component"
import "./mainProjects.css"; // כולל את קובץ עיצוב ה- CSS

export const MainProject = () => {
    const [refresh, setFresh] = useState(false);

    const onChangeStatusRefresh = () => {
        setFresh(!refresh);

    }
    return (<div className="main-project-container">
        <div className="customerProjects">
            <ActiveProjects onChangeStatus={onChangeStatusRefresh} />
        </div>
        <div className="projectFinish">
            <ProjectFinish refresh={refresh} />
            </div>
        </div>
    )
}





