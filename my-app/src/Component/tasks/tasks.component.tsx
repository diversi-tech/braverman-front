
import { useDispatch, useSelector } from "react-redux"
import { Task } from '../../model/task.model'
import React, { useEffect, useState } from 'react';
import { getAllEnumFromServer } from "../../api/enum.api";
import { addTask, getAllTaskFromServer, UpDateTask } from "../../api/task.api";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CircleIcon from '@mui/icons-material/Circle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import { setAllLeads } from "../../Redux/Leads/leadsAction";
import { Enum } from '../../model/enum.model';
import './task.css';
import { Project } from "../../model/project.model";
import { setAllProject } from "../../Redux/Project/projectAction";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { getAllLeads } from "../../api/leads.api";
import { Lead } from "../../model/leads.model";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Swal from "sweetalert2";
import { addNewTask } from "../../Redux/tasx/taskAction";
import { TaskStatus } from "../../enum/taskStatus.enum";
import { getProject } from "../../api/project.api";
import { setAllEnums } from "../../Redux/enum/enumAction";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { GrUpdate } from "react-icons/gr";

export const Tasks = () => {

    //משתנים

    const dispatch = useDispatch();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [leads, setLeads] = useState<Lead[]>([])
    const [levelUrgencyStatus, setLevelUrgencyStatus] = useState<Enum[]>([]);
    const [taskStatus, setTaskStatus] = useState<Enum[]>([]);
    const [project, setProject] = useState<Project[]>([]);
    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(0);
    const taskperPage = 7;
    const totalPages = Math.ceil(tasks.length / taskperPage);

    const [isOpen, setIsOpen] = useState(false);
    const [Myprop, setMyprop] = useState<Task>({
        taskId: '',
        taskName: 'try',
        assignedTo: '6683dbc67f45f71f547804dc',
        comment: 'try',
        projectId: '668d3bfa8d0828f533b2a85f',
        description: 'try',
        taskCategory: {
            taskCategoryId: "668d06b4825153a8af0254fd",
            categoryName: " תשלום 1/3 מקדמה",
            daysForExecution: 0,
            stageId: '0',
            sortOrder: 0 ,
            userId:""      

        },
        status: {
            "id": "66827898ef39f60dfd5e049f",
            "key": "1",
            "value": "TODO"
        },
        canBeApprovedByManager: null,
        levelUrgencyStatus: '1',
    });

    const tasksState = useSelector((state: { Task: { allTask: { [key: string]: Task[] } } }) => state.Task);
    const levelState = useSelector((state: { LevelUrgencyStatus: { allEnums: { [key: string]: Enum[] } } }) => state.LevelUrgencyStatus);
    const projectState = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);
    const leadsState = useSelector((state: { leads: { allLeads: { [key: string]: Lead[] } } }) => state.leads);
    const taskStatusState = useSelector((state: { leads: { allEnums: { [key: string]: Lead[] } } }) => state.leads);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl);

    const [selectedTaskId, setSelectedTaskId] = useState<string>("");

    //useEffect
    useEffect(() => {
        fetchDataLevel();
        fetchDataTask();
        fetchDataProject();
        fetchDataLead();
        fetchDatastatus();
    }, [dispatch]);

    //Reduxשליפה מה 

    const fetchDataLead = async () => {
        try {
            let data;
            console.log(leadsState.allLeads);
            if (leadsState.allLeads.length) {
                data = leadsState.allLeads;
            } else {
                const resAllLeads = await getAllLeads();
                data = resAllLeads.data;
                dispatch(setAllLeads(data));
            }
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    const fetchDataTask = async () => {
        try {
            let data;
            console.log(tasksState.allTask);
            if (tasksState.allTask.length) {
                data = tasksState.allTask;
            }
            else {
                const resAllTask = await getAllTaskFromServer();
                data = resAllTask
                console.log("task", data);
                ;
                dispatch(setAllLeads(resAllTask));
            }
            debugger
            setTasks(data);
        }
        catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    const fetchDataLevel = async () => {
        try {
            let data;
            console.log(levelState.allEnums);
            if (levelState.allEnums.length) {
                data = levelState.allEnums;
            }
            else {
                const resAllLevel = await getAllEnumFromServer(6);
                data = resAllLevel;
                dispatch(setAllEnums(resAllLevel));
                console.log("resAllLevel", resAllLevel)
            }
            setLevelUrgencyStatus(data);
        }
        catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    const fetchDatastatus = async () => {
        try {
            let data;
            console.log(taskStatusState.allEnums);
            if (taskStatusState.allEnums.length) {
                data = taskStatusState.allEnums;
            }
            else {
                const resAllStatus = await getAllEnumFromServer(3);
                data = resAllStatus;
                // dispatch(setAllEnums(resAllStatus));
            }
            setTaskStatus(data);
        }
        catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    const fetchDataProject = async () => {
        try {
            let data;
            console.log(projectState.allProject);
            if (projectState.allProject.length) {
                data = projectState.allProject;
            }
            else {
                const resAllproject = await getProject();
                data = resAllproject.data;
                console.log("resAllproject", data);
                dispatch(setAllProject(resAllproject));
                debugger
            }
            debugger
            setProject(data);
            debugger
        }
        catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    //פונקציות

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateLevel = (level: string) => {
        debugger
        handleClose()
        let t = findById();
        debugger
        if (t != null) {
            t.levelUrgencyStatus = level;
            UpDateTask(t);
        }
    }

    const findById = () => {
        let t = tasks.find(t => t.taskId === selectedTaskId)
        return t;
    }
    const con = () => {
        console.log("tyr")
    }
    const handleAddTask = () => {
        debugger
        Swal.fire({
            title: 'ההוספת משימה חדש',
            html: '<input id="swal-input1" class="swal2-input" placeholder="שם משימה" >' +
                '<input id="swal-input2" class="swal2-input" placeholder="שם העובדת" >' +
                '<input id="swal-input3" class="swal2-input" placeholder="שם הפרויקט" >' +
                '<input id="swal-input4" class="swal2-input" placeholder="הערה" >' +
                '<input id="swal-input5" class="swal2-input" placeholder="תאור" >' +
                '<select id="swal-input8" class="swal2-input"><option>נמוך</option><option>רגיל</option><option>חשוב</option><option>דחוף</option></select>' +
                '<select id="swal-input9" class="swal2-input"><option>TODO</option><option>IN_PROGRESS</option><option>WAITING</option><option>DONE</option></select>',
            focusConfirm: false,
            showCancelButton: true,

            preConfirm: () => {
                const taskName = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const assignedTo = (document.getElementById('swal-input2') as HTMLInputElement).value;
                const projectId = (document.getElementById('swal-input3') as HTMLInputElement).value;
                const comment = (document.getElementById('swal-input4') as HTMLSelectElement).value;
                const description = (document.getElementById('swal-input5') as HTMLInputElement).value;
                const levelUrgency = (document.getElementById('swal-input8') as HTMLInputElement).value;
                const status = (document.getElementById('swal-input9') as HTMLInputElement).value;

                if (!taskName || !assignedTo || !projectId || !comment || !description || !levelUrgency) {
                    Swal.showValidationMessage('אנא מלא את כל השדות');
                    return null;
                }

                return {
                    taskId: '',
                    taskName: taskName,
                    assignedTo: assignedTo,
                    comment: comment,
                    projectId: projectId,
                    description: description,
                    taskCategory: {
                        taskCategoryId: "668d06b4825153a8af0254fd",
                        categoryName: " תשלום 1/3 מקדמה",
                        daysForExecution: 0,
                        stageId: null
                    },
                    status: taskStatus.find(t => t.value === status),
                    canBeApprovedByManager: '',
                    levelUrgencyStatus: levelUrgencyStatus.find(l => l.value === levelUrgency),
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed && result.value) {

                try {
                    let response = await addTask(result.value)
                    setTasks([...tasks, response]);
                    dispatch(addNewTask(response));
                    Swal.fire('Success', 'המשימה נוסף בהצלחה', 'success');
                }

                catch (error) {
                    Swal.fire("error", 'שגיאה בהוספת המשימה', 'error');
                }
            }

        });
    }

    const handlePageChange = (direction: 'next' | 'prev') => {
        setPage((prevPage) => {
            if (direction === 'next') {
                return Math.min(prevPage + 1, totalPages - 1);
            } else if (direction === 'prev') {
                return Math.max(prevPage - 1, 0);
            } else {
                return prevPage;
            }
        });
    };
    const filterTask = tasks.slice(page * taskperPage, (page + 1) * taskperPage);
    const handleEditLead = () => {
        alert("the task update successfully")
    }
    return (
        <div className="page-container">
            <div className="lead-management-container">
                <h1 className="lead-management-title">משימות לטיפול</h1>
                <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr >
                                {(['לינקים', 'רמת דחיפות', 'אחראית', 'המשימה', 'שם פרויקט'] as const).map((col) => (
                                    <th key={col}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            {col}
                                            <button onClick={() => console.log(col)} style={{ backgroundColor: "white", border: 0, }}>
                                            </button>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                        </div>
                                    </th>))}
                                <th></th>
                            </tr>
                        </thead>

                        {levelUrgencyStatus && levelUrgencyStatus.length && levelUrgencyStatus.map((l) => {

                            return <> {filterTask && filterTask.length && filterTask.map((t) => {
                                return +t.levelUrgencyStatus == 5 - (+l.key) &&
                                    <tbody>
                                        <tr onClick={() => setSelectedTaskId(t.taskId)} >
                                            <td>לינקים</td>
                                            <td>
                                                <div id="id01">
                                                    <React.Fragment>
                                                        <IconButton onClick={handleClick}>
                                                            {+(t.levelUrgencyStatus) == 1 && <CircleIcon onClick={() => setOpen(!open)} style={{ color: "green" }} ></CircleIcon>}
                                                            {+(t.levelUrgencyStatus) == 2 && <PlayArrowRoundedIcon onClick={() => setOpen(!open)} style={{ color: "lightblue" }}></PlayArrowRoundedIcon>}
                                                            {+(t.levelUrgencyStatus) == 3 && <StarRoundedIcon onClick={() => setOpen(!open)} style={{ color: "yellow" }}></StarRoundedIcon>}
                                                            {+(t.levelUrgencyStatus) == 4 && <AssistantPhotoIcon onClick={() => setOpen(!open)} style={{ color: "red" }}></AssistantPhotoIcon>}
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={open2}
                                                            onClose={handleClose}
                                                            onClick={handleClose}
                                                        >
                                                            <MenuItem onClick={() => updateLevel("1")}>
                                                                <CircleIcon style={{ color: "green" }} /> נמוך
                                                                {/* {+t.levelUrgencyStatus == 1 &&
                                                                <CheckRoundedIcon/>} */}
                                                            </MenuItem>
                                                            <MenuItem onClick={() => updateLevel("2")}>
                                                                <PlayArrowRoundedIcon style={{ color: "lightblue" }} /> רגיל
                                                            </MenuItem>
                                                            <MenuItem onClick={() => updateLevel("3")}>
                                                                <ListItemIcon>
                                                                    <StarRoundedIcon style={{ color: "yellow" }} />חשוב
                                                                </ListItemIcon>
                                                            </MenuItem>
                                                            <MenuItem onClick={() => updateLevel("4")}>
                                                                <ListItemIcon>
                                                                    <AssistantPhotoIcon style={{ color: "red" }} />
                                                                </ListItemIcon>דחוף
                                                            </MenuItem>
                                                        </Menu>
                                                    </React.Fragment>
                                                </div>
                                            </td>
                                            <td>{leads && leads.length && leads.map((le) => {
                                                if (le.id === t.assignedTo)
                                                    return <>
                                                        {le.firstName} {le.lastName}
                                                    </>
                                            })}
                                            </td>
                                            <td>
                                                {t.comment != '' && <AttachFileRoundedIcon />}
                                                {t.taskName}
                                                +
                                                {t.taskCategory.categoryName}
                                            </td>
                                            <td>
                                                {project && project.length && project.map((m) => {
                                                    if (m.projectId === t.projectId)
                                                        return <>
                                                            {m.businessName}
                                                        </>
                                                })}</td>
                                            <td>{
                                                <button
                                                    className={`circle-button ${selectedTaskId === t.taskId ? 'clicked' : ''}`}
                                                    onClick={() => setSelectedTaskId(t.taskId)}>
                                                </button>
                                            }</td>
                                        </tr>
                                    </tbody>
                            })}</>
                        })}
                        {/* <button className="add-lead-button" onClick={handleAddTask} style={{ color: '#636363', backgroundColor: "white", border: 0 }}>
                            +
                            <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>להוספת משימה</span>
                        </button> */}

                        <tfoot >
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'right', color: '#636363' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                                        {selectedTaskId && (
                                            <button className="convert-lead-button" onClick={handleEditLead}>
                                                <GrUpdate className="icon" />
                                                <span className='add' style={{ fontSize: 15, color: '#636363', width: '150px' }}>עדכון משימה</span>
                                            </button>
                                        )}
                                        <button className="add-lead-button" onClick={handleAddTask}>
                                            +
                                            <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>להוספת משימה</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <tr >
                        <div className="pagination" style={{ marginLeft: "1550%" }}>
                            <button onClick={() => handlePageChange('next')} disabled={page === totalPages - 1} style={{ marginLeft: "500%" }} >
                                <SlArrowDown className="icon" />
                            </button>
                            <button onClick={() => handlePageChange('prev')} disabled={page === 0}>
                                <SlArrowUp className="icon" />
                            </button>
                        </div>
                        {/* <ExpandLessRoundedIcon /> */}
                        {/* <ExpandMoreRoundedIcon /> */}
                    </tr>
                </div>
            </div>

            <div>
                {/* <Button
                    onClick={handleClick2}
                >
                    Dashboard
                </Button>
                <Menu
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem><CircleIcon onClick={() => setSelectOpen(!selectOpen)} style={{ color: "green" }} ></CircleIcon></MenuItem>
                    <MenuItem><PlayArrowRoundedIcon onClick={() => setSelectOpen(!selectOpen)} style={{ color: "lightblue" }}></PlayArrowRoundedIcon></MenuItem>
                    <MenuItem><StarRoundedIcon onClick={() => setSelectOpen(!selectOpen)} style={{ color: "yellow" }}></StarRoundedIcon></MenuItem>
                    <MenuItem><AssistantPhotoIcon onClick={() => setSelectOpen(!selectOpen)} style={{ color: "red" }}></AssistantPhotoIcon></MenuItem>
                </Menu> */}
            </div>
            {/* </Dialog> */}
        </div>
    )
}

{/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} style={{ padding: "20px" }}>
                <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="string"
                    label="שם המשימה"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, taskName: e.target.value })
                        // checkId(e.target.value)
                    }}
                />
                 <div>{error.id}</div> 
                <br></br>
                <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    type="String"
                    label="שם העובד"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, assignedTo: e.target.value })
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="String"
                    label="הערה"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, comment: e.target.value })
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="String"
                    label="פרויקט"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, projectId: e.target.value })
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="String"
                    label="הערה"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, comment: e.target.value })
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="String"
                    label="בתהליך/השהיה"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, canBeApprovedByManager: e.target.value })
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="String"
                    label="תאור המשימה"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, description: e.target.value })
                    }}
                />
                <br></br> */}
{/* <TextField
                    style={{ width: "223px" }}
                    variant="outlined"
                    type="String"
                    label="רמת הדחיפות של המשימה"
                    onChange={(e) => {
                        setMyprop({ ...Myprop, levelUrgencyStatus: e.target.value })
                    }}
                /> */}
{/* <InputLabel>רמת הדחיפות של המשימה</InputLabel>
                {levelUrgencyStatus && levelUrgencyStatus.length &&
                    <Select label="status" style={{ width: "223px", border: "2px solid rgb(255, 145, 0)" }} value={selectedT}>
                        {levelUrgencyStatus && levelUrgencyStatus.length && levelUrgencyStatus.map(l => {
                            return <MenuItem href="#" onClick={(e) => {
                                debugger
                                    setMyprop({ ...Myprop, levelUrgencyStatus: e.target.value})
                                }}>
                                    {l.value}
                                </MenuItem>
                        })} */}
{/* <div onClick={() => logIn(1)}>  אחר  </div> */ }
{/* </Select>} */ }