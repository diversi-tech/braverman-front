

import { useEffect, useState } from "react";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box } from "@mui/material";
import { MoreStatus } from "./moreStatus";
import { getCustomerProjects } from "../../api/project.api";

export const ShowProjectStatus = () => {
  debugger
  const listProject = {
    projectId: null,
    firstName: "string",
    lastName: "string",
    businessName: "string",
    email: "string",
    source: "string",
    status: {
      id: "string",
      key: "string",
      value: "string"
    },
    endDate: "2024-07-07T17:00:12.113Z",
    balanceStatus: {
      id: "string",
      key: "string",
      value: "string"
    },
    createdAt: "2024-07-07T17:00:12.113Z",
    updatedAt: "2024-07-07T17:00:12.113Z",
    totalPrice: 0,
    pricePaid: 0,
    balance: 0,
    tasks: [
      {
        taskId: "string",
        taskName: "string",
        assignedTo: 0,
        comment: "string",
        projectId: "string",
        description: "string",
        taskCategory: {
          taskCategoryId: "string",
          categoryName: "string",
          weeksForExecution: 0,
          sortOrder: 0
        },
        status: {
          id: "string",
          key: "string",
          value: "string"
        },
        canBeApprovedByManager: true
      }
    ],
    credentials: [
      {
        credentialId: "string",
        type: "string",
        details: "string",
        projectId: "string"
      }
    ],
    urlFigma: "string",
    urlDrive: "string",
    urlWordpress: "string",
  };
  const [data, setData] = useState([{ ...listProject }]);
  // האוביקטים הבאים לצורך התצוגה
  let taskShow = {
    taskCategoryName: "",
    status: 1,
  }

  const getUniqueTasksWithLowestStatus = (tasksProject: { [key: string]: any }[]) => {
    const taskMap = new Map();
    let countNoFinishTask = 0;
    tasksProject.forEach(t => {
      if (t.status.value != "DONETODO") {
        if (countNoFinishTask == 0)
          progectShow.stat = t.taskCategory.categoryName;
        taskShow.status = 0
        countNoFinishTask++
      }
      if (!taskMap.has(t.taskCategory.categoryName) || t.status < taskMap.get(t.taskCategory.categoryName).status)
        taskMap.set(t.taskCategory.categoryName, t);
    });
    return Array.from(taskMap.values());
  }
  let progectShow = {
    projectName: "",
    statusProject: "",
    stat: "",
    endDate: "",
    pricePaid: 0,
    totalPrice: 0,
    tashsShow: [{ key: "", categoryName: "" }]
  }
  let dataShow = [progectShow]
  const [show, setShow] = useState(dataShow);
  //============1:useEffect=======================
  useEffect(() => {
    if (!data[0].projectId) {
      const task = async () => {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
          let rezult = await getCustomerProjects(userId)
          console.log(rezult)
          setData(rezult)
        }
      }; task();
    }
  });

  //============2======================
  // הכנסת הנתונים לתצוגה
  if (data[0]?.projectId && (data.length == 1 ? show[0].projectName == '' : show?.length < data?.length)) {
    debugger
    dataShow.map(d => dataShow.pop())//איפוס מערך הפרויקטים המוצגים לפני שממלא למשתמש הנוכחי
    for (let i = 0; i < data?.length; i++) {
      let newProgectShow = {
        ...progectShow,
        projectName: data[i].firstName + " " + data[i].lastName,
        statusProject: data[i].status.key,
        endDate: data[i].endDate,
        totalPrice: data[i].totalPrice,
        pricePaid: data[i].pricePaid,
        tashsShow: [{ key: "", categoryName: "" }]
      };

      const tasksProject = data[i].tasks;
      let rezult = getUniqueTasksWithLowestStatus(tasksProject);
      rezult.forEach(r =>
        newProgectShow.tashsShow.push(
          { key: r.status.key, categoryName: r.taskCategory.categoryName }
        ));
      newProgectShow.stat = progectShow.stat
      dataShow.push(newProgectShow);
    }
    setShow(dataShow);
  }

  return (
    <>
    {show.length>1?show.map(s=><div style={{direction:"rtl",display:"flex",flexDirection:"row"}}>
      <ul>{s.projectName}</ul>
      </div>):<Show p={show[0]}></Show>}
      {show?.map(p => (
        <div style={{ paddingTop: "7%" }}>
          <div style={{maxHeight:"10%"}}>
            {p && p.endDate && <MoreStatus project={p}></MoreStatus>}
          </div>
          <br></br>
          <br></br>
          <Show p={p}></Show> 
        </div>))}

    </>
  );
};

export default ShowProjectStatus;
const Show=({p:{}})=>{
  return(<>
  <Box
            sx={{
              width: "80%",
              margin: "auto",
              maxWidth: 750,
              bgcolor: "#ffffff",
              outline: "none",
              borderRadius: 3,
              direction: "rtl",
              borderBlock: 4,
              textAlign: "initial",
              color: "black",
              display: "flex",
              flexDirection: "row",
              fontSize:"100%"
            }}
          >
            <div>
              <p style={{ fontSize: "170%" }}>שלבי הפרויקט   :  </p>
              {p.tashsShow?.map(t => (t.categoryName != "" &&
                <>
                  {p.statusProject == "4" ? (
                    <div>
                      <CheckCircleOutlineTwoTone />
                      <p>הפרויקט הושלם בהצלחה!</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: "row" }}>
                      <div style={{ display: 'flex', flexDirection: "row" }}>
                        {t.key == "4" ? <CheckCircleOutlineTwoTone /> : <RadioButtonUncheckedIcon />}
                        {p.stat == t.categoryName
                          ? <p style={{ backgroundColor: "#F1F7FF" }}>{t.categoryName}</p>
                          : <p>{t.categoryName}</p>}
                      </div>

                    </div>
                  )}
                </>)
              )}

            </div>
            <div style={{ display: "flex", flexDirection: "column",  paddingRight: "12%" }}>
              {/* <compunent stay me ansowor/> */}
            </div>
          </Box>
  </>)
}