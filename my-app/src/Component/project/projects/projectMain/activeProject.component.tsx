import React, { useState, useEffect , useRef} from 'react';
import MainDetailProject from '../../detailProject/mainDetailsProject.component';
import { getProject, deleteProject, updateProject } from '../../../../api/project.api';
import './projectCostumer.css';
import { Project } from '../../../../model/project.model';
import { Enum } from '../../../../model/enum.model';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { getStatusProject,filterByStatus } from "../../../../api/projectStatus.api";
import { useDispatch, useSelector } from 'react-redux';
import { setAllStatusProject } from '../../../../Redux/Project/projectStatusAction';
import { MenuItem } from '@mui/material';

const ActiveProjects: React.FC <{onChangeStatus:()=>void}>= ({onChangeStatus}) => {
  const editDialogRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setallProjects] = useState<Project[]>([]);
  const [projectStatus, setProjectStatus] = useState<Enum[]>([]);

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator

  // State variables for filters
  const [filterStatus, setFilterStatus] = useState<string>('');
  // const [filter, setFilter] = useState<string>('');
  const [filterBusinessName, setFilterBusinessName] = useState<string>('');
  const [filterSource, setFilterSource] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const [filterEmail, setFilterEmail] = useState<string>('');
  const [filterPhone, setFilterPhone] = useState<string>('');
  const dispatch = useDispatch();
  const projectStatusReducer=useSelector((state: { projectStatus: { allStatusProject: { [key: string]: Enum[] } } }) => state.projectStatus);
  
 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProject();
        setProjects(response.data);
        setallProjects(response.data);
        let data;
      if(projectStatusReducer.allStatusProject.length) {
        data=projectStatusReducer.allStatusProject;
      }
      else{
        const response1 = await getStatusProject();
        dispatch(setAllStatusProject(response1.data));
        data=response1.data;
       }
       setProjectStatus(data);
        setLoading(false); // Set loading to false once data is fetched
        const response1 = await getStatusProject();
        setProjectStatus(response1.data);
        console.log("projectStatus");
        console.log(projectStatus);
      
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editProject) {
      const { name, value } = e.target;
  
      if (name === 'status') {
        // Find the corresponding status object by value
        const selectedStatus = projectStatus.find(status => status.value === value);
        if (selectedStatus) {
          setEditProject({ ...editProject, status: selectedStatus });
        }
      } else {
        setEditProject({ ...editProject, [name]: value });
      }
    }
  };



  const handleButtonClick = (projectId: string) => {
    setExpandedRow(projectId === expandedRow ? null : projectId);
  };

  const handleEditClick = (project: Project) => {
    setEditProject(project);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditProject(null);
    setOpenEditDialog(false);
  };

  const handleDelete = async (projectId: string) => {
    const shouldDelete = window.confirm('האם אתה בטוח שברצונך למחוק?');
    if (shouldDelete) {
      try {
        await deleteProject(projectId);
        const updatedProjects = projects.filter(p => p.projectId !== projectId);
        setProjects(updatedProjects);
        console.log(`Project with ID ${projectId} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editProject) {
      try {
        const response = await updateProject(editProject);
        console.log('Project updated successfully:', response.data);
        const updatedProjects = projects.map(p => p.projectId === editProject.projectId ? editProject : p);
        setProjects(updatedProjects);
        if(editProject.status.value=="DONE")
        {
          onChangeStatus();
        }
        handleCloseEditDialog();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };
 

  const filterByStatusFunc = async (selectedStatus: string) => {
    try {
       console.log(selectedStatus);
      if(selectedStatus=="-1"){
        console.log(allProjects);
        setProjects(allProjects);
      }
        
      else{
        console.log("else");
        
        const response = await filterByStatus(selectedStatus);
        setProjects(response.data);
      }
      
    } catch (error) {
      console.error('Error filtering projects by status:', error);
    }
  };
  
  const handleClearFilters = () => {
    setProjects(allProjects);
    setFilterStatus('');
    // setFilter('');
    setFilterBusinessName('');
    setFilterSource('');
    setFilterName('');
    setFilterEmail('');
    setFilterPhone('');
  };
  //בשביל הסינון של הכל
  // .filter((project) => project.businessName.includes(filter) || project.source.includes(filterSource) &&
  // `${project.firstName} ${project.lastName}`.includes(filter) ||
  // project.email.includes(filter)).
  return (
    <div className='styleProject'>
      <h1 className='title'>פרויקטים</h1>
 <Button id="buttonFilter" color="primary" onClick={() => filterByStatusFunc(filterStatus)}>
        סנן לפי סטטוס
      </Button>
      
      <TextField
        select
        margin="dense"
        id="filterStatus"
        label="בחר סטטוס"
        fullWidth
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        {
          <MenuItem key={"allProject"} value={-1}>
          {"ALL_PROJECT"}
        </MenuItem>
        }
        {projectStatus.filter(status=>status.value!="DONE").map(status => (
          <MenuItem key={status.id} value={status.key}>
            {status.value}
          </MenuItem>
          
        ))
        }
      </TextField>
      {/* <TextField
        className='filterAll'
        label="🔍 "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      /> */}
      <div className='filters'>
        <TextField
          className='filter'
          label="🔎 שם העסק"
          value={filterBusinessName}
          onChange={(e) => setFilterBusinessName(e.target.value)}
        />
        <TextField
          className='filter'
          label="🔎 סוג הפרויקט"
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
        />
        <TextField
          className='filter'
          label="🔎 שם איש קשר"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <TextField
          className='filter'
          label="🔎 מספר טלפון"
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
        />
        <TextField
          className='filter'
          label="🔎 אימייל"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
        />
        
        <Button id="buttonClear" color="primary" onClick={handleClearFilters}>
          נקה סינונים
        </Button>
      </div>
      <table style={{ width: '100%' }}>
        <thead>
          <tr className="row">
            <td></td>
            <td>שם הפרויקט</td>
            <td>סוג הפרויקט</td>
            <td>איש קשר</td>
            <td>טלפון</td>
            <td>אימייל</td>
            <td>סטטוס פרויקט</td>
            <td>לינקים</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {projects.filter((project) =>
            project.status.value !== "DONE" &&
            project.businessName.includes(filterBusinessName) &&
            project.source.includes(filterSource) &&
            `${project.firstName} ${project.lastName}`.includes(filterName) &&
            project.email.includes(filterEmail)
          ).map((project, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <button id='buttonProject' onClick={() => handleButtonClick(project.projectId)}>
                      {project.projectId === expandedRow ? '-' : '+'}
                    </button>
                  </td>
                  <td>{project.businessName}</td>
                  <td>{project.source}</td>
                  <td>{`${project.firstName} ${project.lastName}`}</td>
                  <td>פרויקט</td>
                  <td>{project.email}</td>
                  <td>{project.status.value}</td>
                  <td>
                    <a href={project.urlFigma} target="_blank" rel="noopener noreferrer">Figma</a>{' '}
                    <a href={project.urlDrive} target="_blank" rel="noopener noreferrer">Drive</a>{' '}
                    <a href={project.urlWordpress} target="_blank" rel="noopener noreferrer">WordPress</a>
                  </td>
                  <td>
                    <button className='buttonCircle' onClick={() => handleEditClick(project)}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.8119 0.629021C11.9731 -0.209674 10.6132 -0.209674 9.77446 0.629021L1.25963 9.1431C1.20127 9.20145 1.15914 9.27378 1.13714 9.35319L0.0174161 13.3953C-0.0286332 13.561 0.0181618 13.7385 0.139717 13.8602C0.261459 13.9818 0.438944 14.0286 0.604685 13.9827L4.64714 12.8629C4.72656 12.8409 4.7989 12.7988 4.85725 12.7404L13.3719 4.22614C14.2094 3.38689 14.2094 2.02827 13.3719 1.18902L12.8119 0.629021ZM2.29956 9.4533L9.26829 2.485L11.5158 4.73227L4.54684 11.7006L2.29956 9.4533ZM1.85063 10.3541L3.64618 12.1496L1.1625 12.8377L1.85063 10.3541ZM12.697 3.55131L12.1908 4.05743L9.94319 1.80998L10.4495 1.30385C10.9154 0.837995 11.6709 0.837995 12.1368 1.30385L12.697 1.86385C13.1622 2.33027 13.1622 3.08508 12.697 3.55131Z" fill="#002046" />
                    </svg>
                    </button>
                    <button className='buttonCircle' onClick={() => handleDelete(project.projectId)}>🗑️</button>
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
      </table>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}   ref={editDialogRef}
      >
        <DialogTitle>עריכת פרויקט</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="businessName"
            name="businessName"
            label="שם העסק"
            type="text"
            fullWidth
            value={editProject?.businessName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="firstName"
            name="firstName"
            label="שם פרטי"
            type="text"
            fullWidth
            value={editProject?.firstName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            name="lastName"
            label="שם משפחה"
            type="text"
            fullWidth
            value={editProject?.lastName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="טלפון"
            type="string"
            fullWidth
            value={"phone" || ''}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="מייל"
            type="email"
            fullWidth
            value={editProject?.email || ''}
            onChange={handleChange}
          />
          <TextField select margin="dense" id="status" name="status" label="סטטוס פרויקט" fullWidth  value={editProject?.status?.value || ''}
         onChange={handleChange}>
         {projectStatus.map(status => (
          <MenuItem key={status.id} value={status.value}>
           {status.value}
          </MenuItem>
           ))}
        </TextField>


        </DialogContent >
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            ביטול
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActiveProjects;