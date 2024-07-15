

import { useEffect, useState } from "react";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box } from "@mui/material";
import { getUserById } from "../../api/user.api";
import { MoreStatus } from "./moreStatus";
import { getProjectById } from "../../api/project.api";
import React from "react"




export const ShowProjectStatus = () => {
  debugger
  const [user, setUser] = useState([{ projectsId: [] }]);
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
  let countNoFinishTask = 0;
  let isCriticalSectionLocked = false;
  let list = [{}]
  // האוביקטים הבאים לצורך התצוגה
  let taskShow = {
    taskCategoryName: "",
    status: 1,
  }


  const getUniqueTasksWithLowestStatus = (tasksProject: { [key: string]: any }[]) => {
    const taskMap = new Map();
    tasksProject.forEach(t => {
      if (t.status.value != "DONE") {
        if (countNoFinishTask == 0)
          progectShow.stat = taskShow.taskCategoryName;
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
  // צריך לבדוק אם מכניס כבר אוביקט מהסוג
  //  כי אז הללולאה של השואת השמות לא תעבוד נכון בפעם הראשונה
  const dataShow = [progectShow]
  const [show, setShow] = useState(dataShow);
  //============1:useEffect=======================
  useEffect(() => {
    // שליפת נתוני המשתמש הנוכחי
    if (user[0]?.projectsId[0] == null) {
      const task = async () => {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
          const c = await getUserById(userId);
          debugger
          setUser(c)
        }
      }; task();
    }
  });
  //============2:useEffect=======================
  if (user[0]?.projectsId[0] && !data[0]?.projectId) { takeProject() }
  // שליפת הפרויקטים של המשתמש הנוכחי

  async function takeProject() {
    debugger

    data.pop();
    if (!isCriticalSectionLocked) {
      isCriticalSectionLocked = true;
      for (let i = 0; i < user[0]?.projectsId?.length; i++) {

        try {
          const project = await getProjectById(user[0]?.projectsId[i]);
          if (project && Object.keys(project).length > 0) {
            list.push(project)
          }
        } finally {
          isCriticalSectionLocked = false;
        }
      }
      fullData()
    } else {
      // Handle the critical section being already locked
      // You can wait, retry later, or implement another strategy
    }

  }
  const sampleObject = list.reduce((acc, obj) => {
    for (const key in obj) {
        if (!acc.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
    }
    return acc;
}, {});
  function fullData() {
    debugger
    if(sampleObject(list)==user[0].projectsId.length)
       setData(prevData => [...prevData, list]);
    else takeProject()
    }
  
  //============3======================
  // הכנסת הנתונים לתצוגה
  if (data[0]?.projectId && data.length == user[0].projectsId.length && (data.length == 1 ? show[0].projectName == '' : show?.length < data?.length)) {
    debugger
    dataShow.map(d => dataShow.pop())//איפוס מערך הפרויקטים המוצגים לפני שממלא למשתמש הנוכחי
    for (let i = 0; i < data?.length; i++) {
      countNoFinishTask = 0;
      progectShow.projectName = data[i].firstName + " " + data[i].lastName;
      progectShow.statusProject = data[i].status.key
      progectShow.endDate = data[i].endDate;
      progectShow.totalPrice = data[i].totalPrice;
      progectShow.pricePaid = data[i].pricePaid;
      progectShow.tashsShow = [{ key: "", categoryName: "" }]
      const tasksProject = data[i].tasks;
      let rezult = getUniqueTasksWithLowestStatus(tasksProject);
      rezult.map(r =>
        progectShow.tashsShow.push(
          { key: r.status.key, categoryName: r.taskCategory.categoryName }
        ));
      dataShow.push(progectShow)
    }
    setShow(dataShow)
  };

  return (
    <>
      {show?.map(p => (
        <div style={{ paddingTop: "7%" }}>

          <Box
            sx={{
              width: "100%",
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
              flexDirection: "column",
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* <compunent stay me ansowor/> */}
              {p && p.endDate && <MoreStatus project={p}></MoreStatus>}
            </div>
          </Box>
        </div>))}




    </>
  );
};

export default ShowProjectStatus;