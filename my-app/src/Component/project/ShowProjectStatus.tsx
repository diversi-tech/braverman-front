
import { useEffect, useState } from "react";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box, Button } from "@mui/material";

import { MoreStatus } from "../project/moreStatus";
import { getCustomerProjects } from "../../api/project.api";
import React from "react";
import ChatBot from "react-chatbotify";
import MyChatBot2 from "../../Component/project/projects/projectMain/chatBot";

export const ShowProjectStatus = () => {
   const [open, setOpen] = useState(false);
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
          daysForExecution: 0,
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
  const [goShow, setgoShow] = useState({ projectName: "" });
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
    if (!data[0]?.projectId) {
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
    dataShow.map(d => dataShow.pop())//איפוס מערך הפרויקטים המוצגים לפני שממלא למשתמש הנוכחי
    for (let i = 0; i < data?.length; i++) {
      let newProgectShow = {
        ...progectShow,
        projectName: data[i]?.businessName ,
        statusProject: data[i].status.key,
        endDate: data[i].endDate,
        totalPrice: data[i].totalPrice,
        pricePaid: data[i].pricePaid,
        tashsShow: [{ key: "", categoryName: "" }]
      };
      const tasksProject = data[i].tasks;
      if (data[i].status.key == "3") { progectShow.stat = "" }
      else {
        let rezult = getUniqueTasksWithLowestStatus(tasksProject);
        rezult?.forEach(r => {

          newProgectShow.tashsShow.push(
            { key: r.status.key, categoryName: r.taskCategory.categoryName }
          )
        });
      }
      newProgectShow.stat = progectShow.stat
      dataShow.push(newProgectShow);
    }
    setShow(dataShow);
  }


  return (
    <>
      {show.length > 1 &&
        <div style={{ paddingRight: "10%", direction: "rtl" }}>
          {show.map(s =>
            <Button style={{ borderColor: "white", color: "black" }} onClick={() => { setgoShow(s) }}>{s.projectName}</Button>

          )}
        </div>}

      {goShow.projectName != '' ? <Show props={goShow}></Show>
        : <Show props={show[0]}></Show>}
<div style={{ paddingRight: "12%" }}>
        {/* <compunent stay me ansowor/> */}
        <div>
       {!open &&
       <button onClick={() => setOpen(!open)}>
         <ChatBot></ChatBot>
        {/* {open ? 'Close Chat' : 'Open Chat'} */}
       </button>}
       {open && (
        <div style={{ position: "fixed", bottom: 0, right: 0, width: "400px" }}> <MyChatBot2 />
         </div>
      )}
     </div>
      </div>
    </>
  );
};

export default ShowProjectStatus;

const Show = ({ props }: any) => {
  const task = [{ key: "", categoryName: "" }]
  if (props)
    props?.tashsShow?.map((t: { key: string; categoryName: string; }) => {
      task.push(t)
    })

  const p =
  {
    projectName: props ? props.projectName : "",
    statusProject: props ? props.statusProject : "",
    stat: props ? props.stat : "",
    endDate: props ? props.endDate : "",
    pricePaid: props ? props.pricePaid : 0,
    totalPrice: props ? props.totalPrice : 0,
    tashsShow: props ? task : [{ key: "", categoryName: "" }]
  }
  return (<>
    <br></br>
    <div>
      {p && <MoreStatus project={p.projectName}></MoreStatus>}
    </div>
    <br></br>
    <br></br>
    <Box
      sx={{
        width: "87%",
        margin: "auto",
        bgcolor: "#ffffff",
        borderRadius: 3,
        direction: "rtl",
        textAlign: "center",
        color: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "100%",
        minHeight: "300%",
        maxWidth: "87%",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        {p.statusProject == "3" ?
          <div>
            <CheckCircleOutlineTwoTone sx={{
              paddingTop:"5%",
              width:"10%",
              height:"10%"
            }}></CheckCircleOutlineTwoTone>
            <p style={{ fontSize: "200%"}}>הפרויקט הושלם בהצלחה!</p>
          </div>
          :
          (<p style={{ fontSize: "170%", fontWeight: "bold" }}>שלבי הפרויקט:</p> &&
            p.tashsShow?.map(t => (t?.categoryName != "" &&
              <>
                <div style={{ display: 'flex', flexDirection: "row", paddingRight: "11%" }}>
                  {t.key == "4" ? <CheckCircleOutlineTwoTone /> : <RadioButtonUncheckedIcon />}
                  {p.stat == t.categoryName
                    ? <p style={{ backgroundColor: "#F1F7FF", borderRadius: 3, }}>{t.categoryName}</p>
                    : <p>{t.categoryName}</p>}
                </div>
              </>))
          )}


      </div>
      
    </Box>
  </>)
}