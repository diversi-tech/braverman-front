import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Staff = () => {
    const role = sessionStorage.getItem("userType")
const navigate=useNavigate();
useEffect(() => {
    if (role !== "מנהל") {
        navigate("/not-found");
    }
}, [role, navigate]);
    return(
        <>
        {role==="מנהל"&&<p>staff</p>}
        </>
    )
}