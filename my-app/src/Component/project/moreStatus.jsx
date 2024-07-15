import { Box } from "@mui/material";

export const MoreStatus = ({project}) => {
    debugger
const dateObject = new Date(project.endDate);
const endDate = dateObject.toISOString().split('T')[0];

    return (<>
        <Box
            sx={{
                // transform: "translate(-50%, -50%)",
                width: "30%",
                margin: "auto",
                borderRadius: 3,
                p: 3,
                textAlign: "center",
                color: "black",
                border:2,
                bgcolor:"#F1F7FF"
            }}>
            <p>פרטי הפרויקט:</p>
            <p style={{color:"gray"}}>{project.projectName}</p>
            <p style={{color:"gray"}}>שולם:{project.pricePaid }</p>
            <p style={{color:"gray"}}> יתרה לתשלום:{ project.totalPrice-project.pricePaid}</p>
            <p>סטטוס פרויקט:</p>
            {/* {שם קטגורית המשימה שהסטטוס שלה הוא הראשון שלא נעשה} */}
           <p style={{color:"gray"}}>{project.stat}</p>
            <p> תאריך משוער לסיום:</p>
            <p style={{color:"gray"}}>{endDate}</p>
        </Box>

    </>)
}
export default MoreStatus;