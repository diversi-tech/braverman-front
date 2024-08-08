
import { useDispatch, useSelector } from "react-redux"
import { Task } from '../../model/task.model'
import React, { useEffect, useState } from 'react';
import { getAllEnumFromServer } from "../../api/enum.api";
import { addTask, getAllTaskFromServer, UpDateTask } from "../../api/task.api";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CircleIcon from '@mui/icons-material/Circle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import { Enum } from '../../model/enum.model';
import './task.css';
import { Project } from "../../model/project.model";
import { setAllProject } from "../../Redux/Project/projectAction";
import IconButton from '@mui/material/IconButton';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { Lead } from "../../model/leads.model";
import Swal from "sweetalert2";
import { setAllTask } from "../../Redux/tasx/taskAction";
import { getProject } from "../../api/project.api";
import { setAllEnums } from "../../Redux/enum/enumAction";
import Links from "../Links/Links";
import { GrUpdate } from "react-icons/gr";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ReactDOM from "react-dom";
import AddTaskForm from "./addTask.component";
import { setAllTaskStatus } from "../../Redux/enum/taskStatusAction";
import TaskEdit from "./editTask.component";
import { User } from "../../model/user.model";
import { getUsers } from "../../api/user.api";
import { setAllUsers } from "../../Redux/User/userAction";
import { getTaskCategories } from "../../api/taskCategory.api";
import { TaskCategory } from "../../model/taskCategory.model";
import { setAllTaskCategory } from "../../Redux/tasx/taskCategoryAction";
import { HiChevronDown } from "react-icons/hi";

export const Tasks = () => {

    //משתנים

    const dispatch = useDispatch();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [myTasks, setMyTasks] = useState<Task[]>([]);

    // const [statusOptions, setStatusOptions] = useState<Enum[]>([]);
    const [levelUrgencyStatus, setLevelUrgencyStatus] = useState<Enum[]>([]);
    const [taskStatus, setTaskStatus] = useState<Enum[]>([]);
    const [project, setProject] = useState<Project[]>([]);
    const [open, setOpen] = useState(false);
    const [ref, setRef] = useState(false);
    const [users, setUsers] = useState<User[]>([])
    const [taskCategory, setTaskCategory] = useState<TaskCategory[]>([])

    const [page, setPage] = useState(0);
    const taskperPage = 7;
    const totalPages = Math.ceil(tasks.length / taskperPage);

    const tasksState = useSelector((state: { Task: { allTask: { [key: string]: Task[] } } }) => state.Task);
    const levelState = useSelector((state: { LevelUrgencyStatus: { allEnums: { [key: string]: Enum[] } } }) => state.LevelUrgencyStatus);
    const projectState = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);
    const leadsState = useSelector((state: { leads: { allLeads: { [key: string]: Lead[] } } }) => state.leads);
    const taskStatusState = useSelector((state: { taskStatus: { allTaskStatus: { [key: string]: Enum[] } } }) => state.taskStatus);

    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const filterMyTaskByPro = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof typeof filters) => {
        setFilters({ ...filters, [key]: findProById(e.target.value) });
    };
    const filterMyTask = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof typeof filters) => {
        setFilters({ ...filters, [key]: e.target.value });
    };
    const [filterInputsVisible, setFilterInputsVisible] = useState({
        "":false,
        "שם פרויקט": false,
        "המשימה": false,
        "אחראית": false,
        "רמת דחיפות": false,
        "לינקים": false,
    });
    const [filters, setFilters] = useState({
        "":'',
        "שם פרויקט": '',
        "המשימה": '',
        "אחראית": '',
        "רמת דחיפות": '',
        "לינקים": '',
    });
    const filtered = tasks.filter(t => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            debugger
            switch (key) {
                case 'שם פרויקט':
                    return t.projectId.toLowerCase().includes(value.toLowerCase());
                case 'המשימה':
                    return t.taskName.toLowerCase().includes(value.toLowerCase());
                case 'רמת דחיפות':
                    return t.levelUrgencyStatus.toLowerCase().includes(value.toLowerCase());
                default:
                    return true;
            }
        });
    });

    const filterTask = filtered.slice(page * taskperPage, (page + 1) * taskperPage);

    //useEffect
    useEffect(() => {
        fetchDataUser();
        fetchDataLevel();
        fetchDataTask();
        fetchDataProject();
        fetchDatastatus();
        fetchTaskCategory();
    }, [dispatch]);

    useEffect(() => {
        setRef(false)
    }, [ref])

    //Reduxשליפה מה 

    const fetchDataUser = async () => {
        let data;
        const resAllUsers = await getUsers();
        data = resAllUsers;
        dispatch(setAllUsers(data));
        setUsers(data);
    };

    const fetchTaskCategory = async () => {
        let data;
        const resAllTaskCategory = await getTaskCategories();
        data = resAllTaskCategory;
        dispatch(setAllTaskCategory(data));
        setTaskCategory(data);
    };

    const fetchDataTask = async () => {
        try {
            let data;
            if (tasksState.allTask.length) {
                data = tasksState.allTask;
            }
            else {
                const resAllTask = await getAllTaskFromServer();
                data = resAllTask;
                console.log("data", data)
                dispatch(setAllTask(resAllTask));
            }
            setTasks(data)
        }
        catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    const tryIt = async (data: Task[]) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].levelUrgencyStatus === "4")
                setMyTasks((prevData) => [...prevData, data[i]]);
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].levelUrgencyStatus === "3")
                setMyTasks((prevData) => [...prevData, data[i]]);
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].levelUrgencyStatus === "2")
                setMyTasks((prevData) => [...prevData, data[i]]);
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].levelUrgencyStatus === "1")
                setMyTasks((prevData) => [...prevData, data[i]]);
        }
    }

    const fetchDataLevel = async () => {
        try {
            let data;
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
            console.log(taskStatusState.allTaskStatus);
            if (taskStatusState.allTaskStatus.length) {
                data = taskStatusState.allTaskStatus;
            }
            else {
                const resAllStatus = await getAllEnumFromServer(3);
                data = resAllStatus;
                dispatch(setAllTaskStatus(resAllStatus));
            }
            console.log("resAllStatus", data);

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
            }
            setProject(data);
        }
        catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    //פונקציות

    const findTaskById = () =>
        tasks.find(t => t.taskId === selectedTaskId)

    const findProById = (s: string) =>
        project.find(t => t.businessName === s).projectId;



    const handleAddTask = () => {
        Swal.fire({
            title: 'הוספת משימה חדשה',
            html: '<div id="add-task-container"></div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {
                const container = document.getElementById('add-task-container');
                if (container) {
                    ReactDOM.render(
                        <AddTaskForm
                            levelUrgencyStatus={levelUrgencyStatus}
                            setTasks={setTasks}
                            taskStatus={taskStatus}
                            user={users}
                            project={project}
                            taskCategory={taskCategory}
                            handleTaskAdded={async (newTask: Task) => {
                                try {
                                    const response = await addTask(newTask);
                                    const addedTask = response.data;
                                    setTasks([...tasks, addedTask]);
                                    Swal.fire('Success', 'המשימה נוספה בהצלחה', 'success');
                                } catch (error) {
                                    Swal.fire('Error', 'שגיאה בהוספת המשימה', 'error');
                                }
                            }}
                        />,
                        container
                    );
                }
            },
        });
    };

    const handleEditLead = () => {
        findTaskById();
        Swal.fire({
            html: '<div id="add-task-container"></div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            customClass: {
                popup: 'my-sweet-alert-popup',
            },
            didOpen: () => {
                const container = document.getElementById('add-task-container');
                if (container) {
                    ReactDOM.render(
                        <TaskEdit
                            selectedTaskId={selectedTaskId}
                            tasks={tasks}
                            project={project}
                            users={users}
                            levelUrgencyStatus={levelUrgencyStatus}
                            setRef={setRef}
                        />,
                        container
                    );
                }
            },
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

    const toggleFilterInput = (key: keyof typeof filterInputsVisible) => {
        setFilterInputsVisible(prevState => {
            const newState = { ...prevState, [key]: !prevState[key] };
            if (!newState[key]) {
                setFilters(prevFilters => ({ ...prevFilters, [key]: '' }));
            }
            return newState;
        });
    }


    return (
        <div className="page-container">
            <div className="lead-management-container">
                <h1 className="lead-management-title">משימות לטיפול</h1>
                <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                </div>
                <div className="table-container">
                    <table className="table">
                        <tr>
                            <th></th>

                            {(['רמת דחיפות', 'אחראית', 'המשימה', 'שם פרויקט'] as const).map((col) => (
                                <th key={col} style={{ fontWeight: 700, fontSize: "15px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        {col}
                                        <button onClick={() => toggleFilterInput(col)} style={{ backgroundColor: "white", border: 0 }}><HiChevronDown style={{ marginTop: "5px", alignItems: "center" }} />
                                        </button>
                                    </div>
                                    <div style={{ display: "flex" }}>

                                        {filterInputsVisible[col] && (
                                            col === 'שם פרויקט' ? (
                                                <select
                                                    className='select2'
                                                    value={filters[col]}
                                                    onChange={(e) => filterMyTaskByPro(e, col)}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value="" className='select'>הכל</option>
                                                    {project.map(option => (
                                                        <option key={option.projectId} value={option.businessName} className='select'>
                                                            {option.businessName}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    value={filters[col]}
                                                    onChange={(e) => filterMyTask(e, col)}
                                                />
                                            )
                                        )}

                                    </div>
                                </th>
                            ))}
                        </tr>
                        {filterTask && filterTask.length && filterTask.map((t) => {
                            return <tbody>
                                <tr onClick={() => setSelectedTaskId(t.taskId)}>
                                    <td><Links project={t}></Links></td>
                                    <td>
                                        <div id="id01">
                                            <IconButton>
                                                {+(t.levelUrgencyStatus) == 1 && <CircleIcon onClick={() => setOpen(!open)} style={{ color: "green" }} ></CircleIcon>}
                                                {+(t.levelUrgencyStatus) == 2 && <PlayArrowRoundedIcon onClick={() => setOpen(!open)} style={{ color: "lightblue" }}></PlayArrowRoundedIcon>}
                                                {+(t.levelUrgencyStatus) == 3 && <StarRoundedIcon onClick={() => setOpen(!open)} style={{ color: "yellow" }}></StarRoundedIcon>}
                                                {+(t.levelUrgencyStatus) == 4 && <AssistantPhotoIcon onClick={() => setOpen(!open)} style={{ color: "red" }}></AssistantPhotoIcon>}
                                            </IconButton>
                                        </div>
                                    </td>
                                    <td>{users && users.length && users.map((u) => {
                                        if (u.id === t.assignedTo)
                                            return <>
                                                {u.firstName} {u.lastName}
                                            </>
                                    })}
                                    </td>
                                    <td>
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
                                    <td>
                                        <button
                                            className={`circle-button ${selectedTaskId === t.taskId ? 'clicked' : ''}`}
                                            onClick={() => setSelectedTaskId(t.taskId)}>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        })}
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
                    </tr>
                </div>
            </div>
        </div>
    )
}
