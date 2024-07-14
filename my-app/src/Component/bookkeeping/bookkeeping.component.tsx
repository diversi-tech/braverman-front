import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Bookkeeping = () => {
    const role = sessionStorage.getItem("userType")
    const navigate=useNavigate();
    useEffect(() => {
        if (role !== "admin") {
            navigate("/not-found");
        }
    }, [role, navigate]);
        return(
            <>
            {role==="admin"&&<p>bookkeeping</p>}
            </>
        )

}