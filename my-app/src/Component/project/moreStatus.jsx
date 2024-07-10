import { Box } from "@mui/material";

export const MoreStatus = ({project}) => {
const dateObject = new Date(project.endDate);
const endDate = dateObject.toISOString().split('T')[0];

    return (<>
        <Box
            sx={{
                top:"110%",
                transform: "translate(-50%, -50%)",
                width: "40%",
                margin: "auto",
                // maxWidth: 300,
                bgcolor: "D9D9D9",
                // outline: "none",
                borderRadius: 3,
                // minHeight: 150,
                // p: 3,
                textAlign: "center",
                color: "black",
                border:2
            }}>
            <p>פרטי הפרויקט:</p>
            <p style={{color:"gray"}}>{project.firstName}</p>
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