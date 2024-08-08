import React, { useState, useEffect, useRef } from 'react';
import MainDetailProject from '../../detailProject/mainDetailsProject.component';
import { getProject, deleteProject, updateProject } from '../../../../api/project.api';
import './projectCostumer.css';
import { Project } from '../../../../model/project.model';
import { Enum } from '../../../../model/enum.model';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import { getStatusProject, filterByStatus } from '../../../../api/projectStatus.api';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setAllStatusProject } from '../../../../Redux/Project/projectStatusAction';
import { setAllProject, deleteProjectReducer, updateProjectReducer } from '../../../../Redux/Project/projectAction';
import Links from '../../../Links/Links';
import Swal from 'sweetalert2';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ReactDOM from 'react-dom';
import UpdateProject from './updateProject.component';
import store from '../../../../Redux/Store';


const ActiveProjects: React.FC<{ onChangeStatus: () => void }> = ({ onChangeStatus }) => {
  const editDialogRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setallProjects] = useState<Project[]>([]);
  const [projectStatus, setProjectStatus] = useState<Enum[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [filterText, setFilterText] = useState<string>(''); // State for filter text
  const [filterSource, setFilterSource] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const [filterEmail, setFilterEmail] = useState<string>('');
  const [filterPhone, setFilterPhone] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [page, setPage] = useState(0);
  const leadsPerPage = 6;
  const totalPages = Math.ceil(projects.length / leadsPerPage);
  const projectActive = projects.filter((project) =>
    project.status.value !== "בוצע" &&
    project.businessName.includes(filterText) &&
    project.phone.includes(filterPhone)&&
    project.source.includes(filterSource) &&
    `${project.firstName} ${project.lastName}`.includes(filterName) &&
    project.email.includes(filterEmail)).slice(page * leadsPerPage, (page + 1) * leadsPerPage);

  const dispatch = useDispatch();
  const projectStatusReducer = useSelector((state: { projectStatus: { allStatusProject: { [key: string]: Enum[] } } }) => state.projectStatus);
  const projectReducer = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let dataProject;
        if (projectReducer.allProject.length) {
          console.log("ifActive");
          console.log(projectReducer.allProject);
          dataProject = projectReducer.allProject;
        }
        else {
          const response = await getProject();
          dispatch(setAllProject(response.data));

          dataProject = response.data;
        }
        setallProjects(dataProject);
        setProjects(dataProject);
        let data;
        if (projectStatusReducer.allStatusProject.length) {
          console.log("ifActive");
          console.log();
          data = projectStatusReducer.allStatusProject;
        } else {
          const response1 = await getStatusProject();
          dispatch(setAllStatusProject(response1.data));
          data = response1.data;
        }
        setProjectStatus(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [dispatch]);

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

  const handleButtonClick = (projectId: string) => {
    setExpandedRow(projectId === expandedRow ? null : projectId);
  };

  const handleEditClick = (project: Project) => {
    handleEditLead(project);
  };



  const handleDelete = (projectId: string) => {
    Swal.fire({
      title: 'האם אתה בטוח שברצונך למחוק?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן, מחק!',
      cancelButtonText: 'בטל'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteProjectReducer(projectId))
          await deleteProject(projectId);
          const updatedProjects = projects.filter(p => p.projectId !== projectId);
          setProjects(updatedProjects);
          Swal.fire(
            'נמחק!',
            `הפרויקט עם המזהה ${projectId} נמחק בהצלחה.`,
            'success'
          );
        } catch (error) {
          console.error('Error deleting project:', error);
          Swal.fire(
            'שגיאה!',
            'אירעה שגיאה במחיקת הפרויקט.',
            'error'
          );
        }
      }
    });
  };
  const handleEditLead = (updateProject: Project) => {
    if (!updateProject) {
      Swal.fire('Error', 'Selected lead not found', 'error');
      return;
    }

    Swal.fire({
      title: 'עריכת פרויקט',
      html: '<div id="update-lead-container"></div>',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('update-lead-container');
        if (container) {
          ReactDOM.render(
            <Provider store={store}>
              <UpdateProject prod={updateProject} onChangeStatusDone={changeStatusDone}
                onUpdate={(updatedProject: Project) => {
                  const editdProjects = projectActive.map(p => p.projectId === updatedProject.projectId ? updatedProject : p);
                  setProjects(editdProjects);
                  dispatch(updateProjectReducer(editdProjects))

                }
                } />,
            </Provider>,
            container
          );
        }
      },
    });
  };
  const changeStatusDone = () => {
    onChangeStatus();
  }

  const handleFilterClose = (filterName: string) => {
    if (filterName == "סטטוס")
      filterByStatusFunc("-1");
    switch (filterName) {
      case "שם העסק":
        setFilterText('');
        break;
      case "סוג הפרויקט":
        setFilterSource('');
        break;
      case "איש קשר":
        setFilterName('');
        break;
      case "טלפון":
        break;
      case "אימייל":
        setFilterEmail('');
        break;
      case "סטטוס":
        setFilterStatus('');
        break;
      default:
        break;
    }

  };

  const filterByStatusFunc = async (selectedStatus: string) => {
    try {
      setFilterStatus(selectedStatus);
      console.log(selectedStatus);
      if (selectedStatus == "-1") {
        setProjects(allProjects);
      }
      else {
        const filteredProjects = projectStatus.filter(project =>
          project.value === selectedStatus
        );
        console.log(filteredProjects[0].key);
        const response = await filterByStatus(filteredProjects[0].key);
        setProjects(response.data);
      }

    } catch (error) {
      console.error('Error filtering projects by status:', error);
    }
  };

  const [filterInputsVisible, setFilterInputsVisible] = useState({
    "שם העסק": false,
    "סוג הפרויקט": false,
    "איש קשר": false,
    "טלפון": false,
    "אימייל": false,
    "סטטוס": false,

  });



  if (loading) {
    return <CircularProgress className="loading" />;
  }



  return (
    <div className='styleProject'>

      <h1 className='title'><b>פרויקטים</b></h1>

      <table style={{ width: '100%' }}>
        <thead>
          <tr className='row'>
            <td></td>

            <td style={{ textAlign: "center", fontSize: '10.5px', fontWeight: '700' }}>שם העסק

              <br></br>
              <button className="filter" onClick={() => {
                setFilterInputsVisible({ ...filterInputsVisible, "שם העסק": !filterInputsVisible["שם העסק"] });
                handleFilterClose("שם העסק");
              }}
                style={{
                  backgroundColor: "white",
                  border: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto'
                }}
              ><HiChevronDown style={{ marginTop: "5px", textAlign: "center" }} />
              </button>
              <div className="filter-wrapper">
                {
                  filterInputsVisible["שם העסק"] && (
                    <input
                      type="text"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      placeholder="הקלד כאן..."
                      className="filter-input"
                    />
                  )}

              </div>
            </td>

            <td style={{ textAlign: "center", fontSize: '10.5px', fontWeight: '700' }}>סוג הפרויקט
              <br></br>
              <button className="filter" onClick={() => {
                setFilterInputsVisible({ ...filterInputsVisible, "סוג הפרויקט": !filterInputsVisible["סוג הפרויקט"] })
                handleFilterClose("סוג הפרויקט");
              }
              }
                style={{ backgroundColor: "white", border: 0 }}><HiChevronDown style={{ marginTop: "5px", alignItems: "center", marginLeft: '33px' }} />
              </button>
              <div className="filter-wrapper">
                {
                  filterInputsVisible["סוג הפרויקט"] && (
                    <input
                      type="text"
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      placeholder="הקלד כאן..."
                      className="filter-input"
                    />
                  )}
              </div>
            </td>

            <td style={{ textAlign: "center", fontSize: '10.5px', fontWeight: '700' }}>איש קשר
              <br></br>
              <button className="filter" onClick={() => {
                setFilterInputsVisible({ ...filterInputsVisible, "איש קשר": !filterInputsVisible["איש קשר"] })
                handleFilterClose("איש קשר");
              }
              } style={{ backgroundColor: "white", border: 0 }}><HiChevronDown style={{ marginTop: "5px", alignItems: "center", marginLeft: "33px" }} />
              </button>
              <div className="filter-wrapper">
                {
                  filterInputsVisible["איש קשר"] && (
                    <input
                      type="text"
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                      placeholder="הקלד כאן..."
                      className="filter-input"
                    />
                  )}
              </div>
            </td>

            <td style={{ textAlign: "center", fontSize: '10.5px', fontWeight: '700' }}>טלפון
              <br></br>
              <button className="filter" onClick={() => {
                setFilterInputsVisible({ ...filterInputsVisible, "טלפון": !filterInputsVisible["טלפון"] })
                handleFilterClose("טלפון");
              }}
                style={{ backgroundColor: "white", border: 0 }}><HiChevronDown style={{ marginTop: "5px", alignItems: "center", marginLeft: "39px" }} />
              </button>
              <div className="filter-wrapper">
                {
                  filterInputsVisible["טלפון"] && (
                    <input
                      type="text"
                      value={filterPhone}
                      onChange={(e) => setFilterPhone(e.target.value)}
                      placeholder="הקלד כאן..."
                      className="filter-input"
                    />
                  )}
              </div>
            </td>
            <td style={{ textAlign: "center", fontSize: '13.5px', fontWeight: '700' }}>אימייל
              <br></br>
              <button className="filter" onClick={() => {
                setFilterInputsVisible({ ...filterInputsVisible, "אימייל": !filterInputsVisible["אימייל"] })
                handleFilterClose("אימייל");
              }}
                style={{ backgroundColor: "white", border: 0 }}><HiChevronDown style={{ marginTop: "5px", alignItems: "center", marginLeft: "39px" }} />
              </button>
              <div className="filter-wrapper">
                {
                  filterInputsVisible["אימייל"] && (
                    <input
                      type="text"
                      value={filterEmail}
                      onChange={(e) => setFilterEmail(e.target.value)}
                      placeholder="הקלד כאן..."
                      className="filter-input"
                    />
                  )}
              </div>
            </td>

            <td style={{ textAlign: "right", fontSize: '10.5px', fontWeight: '700' }}>סטטוס פרויקט
              <br></br>
              <button className="filter" onClick={() => {
                setFilterInputsVisible({ ...filterInputsVisible, "סטטוס": !filterInputsVisible["סטטוס"] })
                handleFilterClose("סטטוס");
              }}
                style={{ backgroundColor: "white", border: 0 }}><HiChevronDown style={{ marginTop: "5px", alignItems: "center", marginLeft: "44px" }} />
              </button>
              <div className="filter-wrapper">
                {
                  filterInputsVisible["סטטוס"] && (
                    <select
                      className='selectAll'
                      value={filterStatus}
                      onChange={(e) => filterByStatusFunc(e.target.value)}
                      style={{ width: "100%" }}
                    >
                      <option key={"allProject"} value={-1} className='select'>כל הפרויקטים
                      </option>
                      {projectStatus.filter(s => s.value != "בוצע").map(status => (
                        <option key={status.id} value={status.value} className='select'>
                          {status.value}
                        </option>
                      ))}
                    </select>


                  )}
              </div>
            </td>

            <td style={{ width: 'auto', fontWeight: '700', marginBottom: '3px', fontSize: '10.5px' }} className="links-column" >לינקים
              <br></br>
              <HiChevronDown style={{ marginTop: "5px", alignItems: "center" }} />
            </td>
            <td></td>
          </tr>
        </thead >
        <tbody>

          {projectActive.map((project, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>
                  <button
                    id='buttonProject' className='buttonCircle'
                    onClick={() => handleButtonClick(project.projectId)}

                  >
                    <span style={{ fontSize: '17px', cursor: 'pointer' }}>
                      {project.projectId === expandedRow ? '-' : '+'}
                    </span>
                  </button>
                </td>
                <td style={{ textAlign: 'center', fontSize: '13.5px', fontWeight: '400' }}>{project.businessName}</td>
                <td style={{ textAlign: 'center', fontSize: '13.5px', fontWeight: '400' }}>{project.source}</td>
                <td style={{ textAlign: 'center', fontSize: '13.5px', fontWeight: '400' }}>{`${project.firstName} ${project.lastName}`}</td>
                <td style={{ textAlign: 'center', fontSize: '13.5px', fontWeight: '400' }}>{project.phone}</td>
                <td style={{ textAlign: 'center', fontSize: '13.5px', fontWeight: '400' }}>{project.email}</td>
                <td style={{ textAlign: 'center', fontSize: '13.5px', fontWeight: '400' }}>{project.status.value}</td>
                <td>
                  <Links project={project}></Links>
                </td>
                <td>
                  <button
                    className='buttonCircle'
                    onClick={() => handleEditClick(project)}
                  >
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.8119 0.629021C11.9731 -0.209674 10.6132 -0.209674 9.77446 0.629021L1.25963 9.1431C1.20127 9.20145 1.15914 9.27378 1.13714 9.35319L0.0174161 13.3953C-0.0286332 13.561 0.0181618 13.7385 0.139717 13.8602C0.261459 13.9818 0.438944 14.0286 0.604685 13.9827L4.64714 12.8629C4.72656 12.8409 4.7989 12.7988 4.85725 12.7404L13.3719 4.22614C14.2094 3.38689 14.2094 2.02827 13.3719 1.18902L12.8119 0.629021ZM2.29956 9.4533L9.26829 2.485L11.5158 4.73227L4.54684 11.7006L2.29956 9.4533ZM1.85063 10.3541L3.64618 12.1496L1.1625 12.8377L1.85063 10.3541ZM12.697 3.55131L12.1908 4.05743L9.94319 1.80998L10.4495 1.30385C10.9154 0.837995 11.6709 0.837995 12.1368 1.30385L12.697 1.86385C13.1622 2.33027 13.1622 3.08508 12.697 3.55131Z'
                        fill='#002046'
                      />
                    </svg>
                  </button>
                  <button id="trash"
                    className='buttonCircle'
                    onClick={() => handleDelete(project.projectId)}
                  >

                    <HiOutlineTrash style={{ fontSize: '17px', alignItems: "center" }} />
                  </button>
                </td>
              </tr>
              {expandedRow === project.projectId && (
                <tr>
                  <td colSpan={9} style={{ padding: '10px' }}>
                    <MainDetailProject detailsProject={project} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table >
      <div className="pagination">
        <button onClick={() => handlePageChange('prev')} disabled={page === 0}>
          <SlArrowUp className="icon" />
        </button>
        <button onClick={() => handlePageChange('next')} disabled={page === totalPages - 1} >
          <SlArrowDown className="icon" />
        </button>

      </div>
    </div >
  );
};

export default ActiveProjects;


