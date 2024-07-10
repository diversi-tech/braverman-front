

import { useEffect, useState } from "react";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getAllCostumers } from "../../api/costumer.api";
import { Box, Button } from "@mui/material";
import { getUserById } from "../../api/user.api";

import { constants } from "buffer";
import { MoreStatus } from "./moreStatus";
import { getProjectById } from "../../api/project.api";

export const ShowProjectStatus = () => {
  debugger
  const [projectId, setProjectId] = useState("");
  const [user, setUser] = useState([{ projectsId: [] }]);
  const [listProject, setListProject] = useState({
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
  });
  const [data, setData] = useState([{ ...listProject }]);
  const projects = [{ ...listProject }]
  // האוביקטים הבאים לצורך התצוגה
  const taskShow = {
    taskCategoryName: "",
    status: 1,
  }
  const progectShow = {
    projectName: "",
    statusProject: "",
    stat: "",
    tashsShow: [taskShow]
  }
  // צריך לבדוק אם מכניס כבר אוביקט מהסוג
  //  כי אז הללולאה של השואת השמות לא תעבוד נכון בפעם הראשונה
  const dataShow = [progectShow]
  useEffect(() => {
    // שליפת נתוני המשתמש הנוכחי
    if (user[0].projectsId[0] == null) {
      const task = async () => {
        debugger
        const userId = sessionStorage.getItem("userId");
        if (userId) {
          const c = await getUserById(userId);
          debugger
          setUser(c)
        }
      }; task();
    }
  });


  useEffect(() => {
    // שליפת הפרויקטים של המשתמש הנוכחי
    const fetchData = async () => {
      debugger
      for (let i = 0; i < user[0]?.projectsId?.length; i++) {
        const project = await getProjectById(user[0]?.projectsId[i]);
        if (project && Object.keys(project).length > 0) {
          debugger
          // Add the fetched project data
          setData(prevData => [...prevData, project]);
        }
      }
      fullDataShow()
    }; if (user.length > 0) {
      fetchData();
    }
  }, [user]);
  // ?????????????????????????????????
  // function f() {
  //   setData(projects)
  // }
  // ?????????????????????????????????
  let countNoFinishTask = 0
  // useEffect(() => {
debugger
// הכנסת הנתונים לתצוגה
// if(data[0].projectId){
  const fullDataShow =  ()=>{
    for (let i = 0; i < data?.length; i++) {
      progectShow.projectName = data[i].firstName;
      progectShow.statusProject = data[i].status.key;
      const categoryname = data[i].tasks[0].taskCategory.categoryName;
      for (let j = 0; j < data[i].tasks.length; j++) {
        if (j != 0 && categoryname != data[i].tasks[j].taskCategory.categoryName)
          progectShow.tashsShow.push(taskShow);
        taskShow.taskCategoryName = data[i].tasks[j].taskCategory.categoryName;
        if (data[i].tasks[j].status.value != "DONE") {
          if (countNoFinishTask == 0)
            progectShow.stat = taskShow.taskCategoryName;
          taskShow.status = 0
          countNoFinishTask++
        }
      }
      progectShow.tashsShow.push(taskShow);
      dataShow.push(progectShow)
    }
}; 
// fullDataShow();}
// });
  return (
    <>
      {dataShow?.map(p => (
        <>
          <Box
            sx={{
              // position: "absolute",
              // top: "50%",
              // right: "50%",
              // transform: "translate(-50%, -50%)",
              // width: "10%",
              margin: "auto",
              maxWidth: 750,
              bgcolor: "#ffffff",
              outline: "none",
              borderRadius: 3,
              minHeight: 150,
              direction: "rtl",
              borderBlock: 4,
              textAlign: "initial",
              color: "black",
            }}
          >
            <p style={{ fontSize: "170%" }}>שלבי הפרויקט   :  {p.projectName}</p>
            {p.tashsShow?.map(t => (
              <>
                {p.statusProject == "4" ? (
                  <div>
                    <CheckCircleOutlineTwoTone />
                    <p>הפרויקט הושלם בהצלחה!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: "row" }}>
                    {t.status == 1 ? <CheckCircleOutlineTwoTone /> :
                      <div style={{ display: 'flex', flexDirection: "row" }}>
                        <RadioButtonUncheckedIcon />
                        {p.stat == t.taskCategoryName 
                          ? <p style={{ backgroundColor: "#F4FFF1" }}>{t.taskCategoryName}</p>
                          : <p>{t.taskCategoryName}</p>}
                      </div>
                    }
                  </div>
                )}
              </>)
            )}
            <MoreStatus project={p}></MoreStatus>
          </Box>
        </>))}




    </>
  );
};

export default ShowProjectStatus;