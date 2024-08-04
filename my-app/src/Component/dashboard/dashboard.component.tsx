import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import  { Dashboardee } from "./DashboardUser.component";
// import DashboardComponent, {  } from "./User.component";
import AttendanceReport from "../Timer/AttendanceReport.component";

export const Dashboard = () => {
    const role = sessionStorage.getItem("userType")
const navigate=useNavigate();
useEffect(() => {
    if (role !== "מנהל") {
        navigate("/not-found");
    }
}, [role, navigate]);
    return(
        <>
        <AttendanceReport></AttendanceReport>
        </>
    )
}