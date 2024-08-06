import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MoreStatus = ({ project }:any) => {
    debugger
    console.log("=========")
    console.log("project :" + project)
    console.log("project.projectName :"+project?.businessName)
    console.log("=========")
    useEffect(() => {
        console.log(project)
    });
    let obj
    obj = Object.entries(project)
    console.log("obj:" + obj)

    // const dateObject = new Date(project?.endDate)
    // const endDate = dateObject.toISOString().split('T')[0];


    
    const navigate = useNavigate();
    return (<>
        {/* {obj=Object.entries(project)}
        {obj.map(p => {
            console.log("=========")
            console.log(p)
            console.log("=========")
      } )}  */}
        <Box
            sx={{
                display: "flex",
                flexDirection: "row-reverse",
                width: "85%",
                margin: "auto",
                borderRadius: 3,
                textAlign: "center",
                color: "#F1F7FF",
                bgcolor: "#002046",
                paddingRight: "3%",
                p: 1,
                maxWidth: "85%",
                flexWrap: "wrap",
                boxSizing: "border-box",
            }}>
            {!project?.pricePaid ?
                <div style={{ display: "flex", flexDirection: "row-reverse",width: "95%" }}>
                    <p style={{ paddingLeft: "1%" }}></p>
                    <p style={{ paddingLeft: "66%" }}>אתר תוכן- {project}</p>
                    <p >חזרה למסך ראשי</p>
                    <svg width="27" height="27" onClick={() => navigate("/quickActions")} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.40891 17.676C8.95766 17.676 8.50493 17.5119 8.14794 17.1809L0.619188 10.1984C0.237703 9.84441 0.0217267 9.3464 0.0254377 8.82539C0.0291486 8.30437 0.251063 7.80933 0.637742 7.4605L8.37282 0.478004C9.13356 -0.208519 10.307 -0.148402 10.9935 0.61234C11.68 1.37308 11.6199 2.54648 10.8591 3.233L4.62923 8.85656L10.6706 14.4601C11.4217 15.157 11.4663 16.3311 10.7693 17.0822C10.4042 17.4763 9.90692 17.676 9.40891 17.676Z" fill="white" />
                        <path d="M17.0302 26.6616H1.85547C0.830508 26.6616 0 25.8311 0 24.8061C0 23.7812 0.830508 22.9507 1.85547 22.9507H17.0302C20.4013 22.9507 23.1436 20.2083 23.1436 16.8373C23.1436 13.4663 20.4013 10.7239 17.0302 10.7239H1.85547C0.830508 10.7239 0 9.89337 0 8.86841C0 7.84345 0.830508 7.01294 1.85547 7.01294H17.0302C22.4475 7.01294 26.8546 11.42 26.8546 16.8373C26.8546 22.2545 22.4475 26.6616 17.0302 26.6616Z" fill="white" />
                    </svg>
                </div>
                :
                    <div style={{ display: "flex", flexDirection: "row-reverse",width: "95%" }}>
                    <p style={{ paddingLeft: "1%" }}>אתר תוכן- {project.businessName}</p>
                        <p style={{ color: "white", paddingLeft: "1%", fontWeight: "bold" }}>:פרטי תשלום</p>
                        <p>שולם: {project.pricePaid}</p>
                        <p style={{ paddingLeft: "1%" }}> יתרה לתשלום: {project.totalPrice - project.pricePaid}</p>
                        <p style={{ color: "white", paddingLeft: "1%", fontWeight: "bold" }}>:סטטוס פרויקט</p>
                        <p style={{ paddingLeft: "1%" }}>{project.stat}</p>
                        <p style={{ color: "white", paddingLeft: "1%", fontWeight: "bold" }}>:תאריך משוער לסיום</p>
                        <p style={{ paddingLeft: "1%" }}>{String(project?.endDate).split('T')[0]}</p>
                    </div>
                }
        </Box>

    </>)
}
export default MoreStatus;