import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, OutlinedInput } from '@mui/material';
import Swal from 'sweetalert2';
import { Project } from '../../../../model/project.model';
import { updateProject } from '../../../../api/project.api';
import { Enum } from '../../../../model/enum.model';
import { getStatusProject } from '../../../../api/projectStatus.api';
import { setAllStatusProject } from '../../../../Redux/Project/projectStatusAction';
import Rtl from '../../../rtl/rtl';

interface UpdateLeadProps {
    prod: Project;
    onUpdate: (UpdatedMyProject: Project) => void;
    onChangeStatusDone: () => void ;
}

const UpdateProject: React.FC<UpdateLeadProps> = ({ prod, onUpdate,onChangeStatusDone }) => {
    const [projectStatus, setProjectStatus] = useState<Enum[]>([]);
    const dispatch = useDispatch();
    const projectStatusReducer = useSelector((state: { projectStatus: { allStatusProject: Enum[] } }) => state.projectStatus);
    
    const [formValues, setFormValues] = useState({
        businessName: prod.businessName,
        firstName: prod.firstName,
        lastName: prod.lastName,
        email: prod.email,
        status: prod.status,
        address:prod.address,
        phone:prod.phone,
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let dataStatus;
                if (projectStatusReducer.allStatusProject.length) {
                    dataStatus = projectStatusReducer.allStatusProject;
                } else {
                    const response1 = await getStatusProject();
                    dispatch(setAllStatusProject(response1.data));
                    dataStatus = response1.data;
                }
                setProjectStatus(dataStatus);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, [dispatch, projectStatusReducer.allStatusProject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    
    const handleChange2 = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        const selectedStatus = projectStatus.find(status => status.value === value);

        setFormValues((prevValues) => ({
        ...prevValues,
            [name as string]: selectedStatus,
        }));
         
         };



    const handleSubmit = async () => {
        
        try {
            const UpdatedMyProject = {
                ...prod,
                ...formValues,
            };
            
            console.log(UpdatedMyProject);
            const response = await updateProject(UpdatedMyProject);
            onUpdate(UpdatedMyProject);
            if (UpdatedMyProject.status.value == "בוצע") {
                onChangeStatusDone();
              } 
            Swal.fire('Success', 'הפרויקט עודכן בהצלחה', 'success');
        } catch (error) {
            Swal.fire('Error', 'עדכון הפרויקט נכשל', 'error');
        }
    };

    return (
        <div>
            <Rtl>
            <TextField
                dir='rtl'
                name="businessName"
                label="שם העסק"
                value={formValues.businessName}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <TextField
                dir='rtl'
                name="firstName"
                label="שם פרטי"
                value={formValues.firstName}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <TextField
                dir='rtl'
                name="lastName"
                label="שם משפחה"
                value={formValues.lastName}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <TextField
                dir='rtl'
                name="phone"
                label="טלפון"
                value={formValues.phone || ''}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <TextField
                dir='rtl'
                name="email"
                label="אימייל"
                value={formValues.email}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
             <TextField
                dir='rtl'
                name="address"
                label="כתובת"
                value={formValues.address}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>סטטוס</InputLabel>
                <Select
                    name="status"
                    value={formValues.status?.value }
                    onChange={handleChange2}
                    input={<OutlinedInput sx={{fontFamily: 'CustomFont'}} label="סטטוס" />}

                >
                    {projectStatus.map((status) => (
                        <MenuItem key={status.value} value={status.value} style={{ direction: 'rtl' }} dir='rtl'>
                            {status.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Rtl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                עדכון
            </Button>
        </div>
    );
};

export default UpdateProject;
