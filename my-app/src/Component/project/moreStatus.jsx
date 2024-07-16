import { Box } from "@mui/material";

export const MoreStatus = ({ project }) => {
    debugger
    const dateObject = new Date(project.endDate);
    const endDate = dateObject.toISOString().split('T')[0];

    return (<>
        <Box
            sx={{
                display: "flex",
                flexDirection: "row-reverse",
                width: "80%",
                margin: "auto",
                borderRadius: 3,
                p: 3,
                textAlign: "center",
                color: "#F1F7FF",
                border: 2,
                bgcolor: "#002046",
                maxHeight: "20%",
                paddingRight: "5%",
                textAlign: "center",
            }}>
            <p style={{ color: "white" }}>פרטי הפרויקט:</p>
            <p>:{project.projectName}</p>
            <p>שולם:{project.pricePaid}</p>
            <p> יתרה לתשלום:{project.totalPrice - project.pricePaid}</p>
            <p style={{ color: "white" }}>סטטוס פרויקט:</p>
            {/* {שם קטגורית המשימה שהסטטוס שלה הוא הראשון שלא נעשה} */}
            <p>{project.stat}</p>
            <p style={{ color: "white" }}> תאריך משוער לסיום:</p>
            <p>{endDate}</p>
        </Box>


    </>)
}
export default MoreStatus;