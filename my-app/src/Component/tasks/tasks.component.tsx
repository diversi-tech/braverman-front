import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Tasks = () => {
    const role = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
    const navigate = useNavigate();
    useEffect(() => {
        if (role !== "admin") {
            navigate("/not-found");
        }
    }, [role, navigate]);
    return (
        <>
            {role === "admin" && <p>tasks</p>}
        </>

    )
}