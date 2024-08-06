import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  { Dashboardee } from "./DashboardUser.component";
import DashboardComponent, {  } from "./User.component";
import AttendanceReport from "../Timer/AttendanceReport.component";

export const Dashboard = () => {
    const role = sessionStorage.getItem("userType")
    const id = sessionStorage.getItem("userId")
     
const navigate=useNavigate();
useEffect(() => {
    if (role !== "מנהל" && role !== "עובד") {
        navigate("/not-found");
    }
    navigate(`/AttendanceReport/${id}`)
}, [role, navigate]);
    return(
        <>       
        </>
    )
}