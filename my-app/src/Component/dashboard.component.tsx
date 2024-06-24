import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const role = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
    const navigate=useNavigate();
    useEffect(() => {
        if (role !== "admin"&&role!=="worker") {
            navigate("/not-found");
        }
    }, [role, navigate]);
    return(
        <>
        {role!=="customer"&& <p>bookeping</p>}
        </>
    )
}