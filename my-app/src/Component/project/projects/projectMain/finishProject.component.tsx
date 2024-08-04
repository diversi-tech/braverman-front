import React, { useState, useEffect } from 'react';
import { Project } from '../../../../model/project.model';
import { getProject, deleteProject } from "../../../../api/project.api";
import Links from '../../../Links/Links';

import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { HiOutlineTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setAllProject } from '../../../../Redux/Project/projectAction';

const ProjectFinish: React.FC<{ refresh: boolean }> = (refresh) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const projectFinishPage = 6;
  const totalPages = Math.ceil(projects.length / projectFinishPage);
  const projectActive = projects.slice(page * projectFinishPage, (page + 1) * projectFinishPage);
  const [loading, setLoading] = useState(true); // State for loading indicator


  useEffect(() => {
    const fetchCustomers = async () => {
  
      try {
          
          const response = await getProject();
          setProjects(response.data);
          setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
  fetchCustomers();
   }, [refresh]);
   
  // useEffect(() => {
  //   const fetchCustomers = async () => {
  
  //     try {
  //       let dataProject;
  //       if (projectReducer.allProject.length) {
  //         console.log("if");
  //         console.log(projectReducer.allProject);
  //         dataProject = projectReducer.allProject;
  //         let a=dataProject.flat();
  //         console.log("");
  //         dataProject=a;
  //         console.log(a);
          
  //       } 
  //       else {
  //         console.log("else");
  //         const response = await getProject();
  //         dispatch(setAllProject(response.data));
  //         dataProject = response.data;
  //       }
  //       setProjects(dataProject);
  //     } catch (error) {
  //       console.error('Error fetching customers:', error);
  //     }
  //   };
  // fetchCustomers();
  //  }, [refresh]);
   
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
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='styleProject2'>
      <div className="table-wrapper" id="finishProject">
        <h2 className='titleFinish' style={{ fontWeight: '700' }}><b> פרויקטים סגורים</b></h2>
        <table className="TableClose" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '0.1%', fontWeight: '600' }}></th>
              <th style={{ width: '21%', fontWeight: '600' }}>שם לקוח</th>
              <th style={{ width: '22%', fontWeight: '600' }}>שם העסק</th>
              <th style={{ width: '30%', fontWeight: '600' }}>לינקים</th>
              <th style={{ width: '0.1%', fontWeight: '600' }}></th>
            </tr>
          </thead>
          <tbody>
            {projectActive
              .filter((project) => project.status.value == "בוצע")
              .map((project, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td style={{ textAlign: 'center' }}>
                      <div className='circle' id="circleV">
                        <br></br>
                        <svg className='v' width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                          <path d="M13.7481 0.182231C13.4423 -0.0852415 12.9766 -0.0550272 12.7084 0.251491L4.86267 9.21799L1.2743 5.39014C0.995782 5.09393 0.530098 5.0792 0.23315 5.35698C-0.0637981 5.63476 -0.0792744 6.10192 0.199244 6.39886L4.34391 10.8198C4.48391 10.9679 4.67769 11.0519 4.88181 11.0519H4.89433C5.10285 11.049 5.29885 10.9576 5.43663 10.8007L13.8181 1.2219C14.0856 0.915386 14.0546 0.450441 13.7481 0.182231Z" fill="#002046" />
                        </svg>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>{`${project.firstName} ${project.lastName}`}</td>
                    <td style={{ textAlign: 'center' }}>{project.source}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Links project={project}></Links>
                    </td>
                    <td style={{ textAlign: 'center' }}><button
                      className='buttonCircle'
                      onClick={() => handleDelete(project.projectId)}
                    >

                      <HiOutlineTrash style={{ fontSize: '17px', alignItems: "center" }} />
                    </button>

                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
        <div className="pagination">
        <button onClick={() => handlePageChange('prev')} disabled={page === 0}>
            <SlArrowUp className="icon" />
          </button>
          <button onClick={() => handlePageChange('next')} disabled={page === totalPages - 1} >
            <SlArrowDown className="icon" />
          </button>
          
        </div>
      </div>
    </div>

  );
};

export default ProjectFinish;


