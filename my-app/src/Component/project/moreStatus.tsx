import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";

export const MoreStatus = ({ project }: any) => {
    debugger
    // useEffect(() => {
    //     console.log(project)
    // });
    // let obj
    // obj = Object.entries(project)
    // console.log("obj:" + obj)
    const dateObject = new Date(project.endDate)
    const endDate = dateObject.toISOString().split('T')[0];
    return (<>
        {/* {obj=Object.entries(project)} */}
        {/* {obj.map(p => {
            console.log("=========")
            console.log(p)
            console.log("=========")
        } */}
        {/* )} */}
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
            <p style={{ paddingLeft: "1%" }}>אתר תוכן- {project.projectName}</p>
            <p style={{ color: "white", paddingLeft: "1%", fontWeight: "bold" }}>:פרטי תשלום</p>
            <p>שולם: {project.pricePaid}</p>
            <p style={{ paddingLeft: "1%" }}> יתרה לתשלום:   {project.totalPrice - project.pricePaid}</p>
            <p style={{ color: "white", paddingLeft: "1%", fontWeight: "bold" }}>:סטטוס פרויקט</p>
            {/* {שם קטגורית המשימה שהסטטוס שלה הוא הראשון שלא נעשה} */}
            <p style={{ paddingLeft: "1%" }}>{project.stat}</p>
            <p style={{ color: "white", paddingLeft: "1%", fontWeight: "bold" }}>:תאריך משוער לסיום</p>
            <p style={{ paddingLeft: "1%" }}>{endDate}</p>
        </Box>
    </>)
}
export default MoreStatus;