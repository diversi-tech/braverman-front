import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, InputAdornment, FormHelperText, OutlinedInput } from '@mui/material';
import Swal from 'sweetalert2';
import { User } from '../../model/user.model';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../model/userType.model';
import { getTypes } from '../../api/userType.api';
import { setAllUserType } from '../../Redux/User/userTypeAction';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Project } from '../../model/project.model';
import { getProject } from '../../api/project.api';
import { setAllProject } from '../../Redux/Project/projectAction';
import Rtl from '../rtl/rtl';
import './user.css';
interface AddUserFormProps {
    users: User[];
    setUser: React.Dispatch<React.SetStateAction<User[]>>;
    handleUserAdded: (newUser: User) => Promise<void>;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ users, setUser, handleUserAdded }) => {
    const userType = useSelector((state: { UserType: { allUserType: { [key: string]: UserType[] } } }) => state.UserType);
    const projectState = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);
    const dispatch = useDispatch();
    const [userTypes, setUserTypes] = useState<UserType[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<{ [projectId: string]: string }>({});
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: '',
    });

    useEffect(() => {
        //all user type
        const fetchData = async () => {
            try {
                let data;
                if (userType.allUserType.length) {
                    data = userType.allUserType;
                } else {
                    const resAllUserType = await getTypes();
                    data = resAllUserType.data;
                    dispatch(setAllUserType(data));
                }
                setUserTypes(data);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        ///all project
        const fetchDataProject = async () => {
            try {
                let data;
                if (projectState.allProject.length) {
                    data = projectState.allProject;
                }
                else {
                    const resAllproject = await getProject();
                    data = resAllproject.data;
                    dispatch(setAllProject(resAllproject));
                }
                setProjects(data);
            }
            catch (error) {
                console.error('Error fetching task:', error);
            }
        }

        fetchDataProject();
        fetchData();
    }, [dispatch, userType.allUserType]);

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: {} as UserType | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
        setSelectedProjects({});
    };

    //check password
    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= minLength && hasLetter && hasNumber;
    };


    //check email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //check form
    const validateFields = () => {
        const newErrors = {
            firstName: formValues.firstName ? '' : 'שדה חובה',
            lastName: formValues.lastName ? '' : 'שדה חובה',
            email: validateEmail(formValues.email) ? '' : 'כתובת אימייל לא תקינה',
            password: validatePassword(formValues.password) ? '' : 'הסיסמה חייבת להיות באורך 8 תווים לפחות ולכלול אות אחת לפחות ומספר אחד לפחות',
            userType: formValues.userType ? '' : 'שדה חובה',
        };
        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };


    //add user
    const handleAddUser = async () => {
        if (!validateFields()) {
            return;
        }

        const { firstName, lastName, email, password, userType } = formValues;

        if (!userType) {
            Swal.fire('Error', 'אנא בחר סוג משתמש', 'error');
            return;
        }

        const newUser: User = {
            id: '',
            firstName,
            lastName,
            email,
            password,
            projectsId: selectedProjects,
            userType,
            workLog:[],
        };

        try {
            await handleUserAdded(newUser);
        } catch (error) {
            Swal.fire('Error', 'שגיאה בהוספת המשתמש', 'error');
        }
    };

    //change user type
    const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
        const typeId = event.target.value;
        const selectedUserType = userTypes.find(type => type.id === typeId) || null;
        setFormValues({
            ...formValues,
            userType: selectedUserType,
        });
    };

    //show password
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //handle password
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    //project selection
    const handleProjectSelection = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        const selected = typeof value === 'string' ? value.split(',') : value;
        const projectsMap = selected.reduce((acc, projectId) => {
            acc[projectId] = projects.find(project => project.projectId === projectId)?.businessName || '';
            return acc;
        }, {} as { [projectId: string]: string });
        setSelectedProjects(projectsMap);
    };

    //render project selection
    const renderProjectsSelection = () => {
        if (!formValues.userType) return null;

        const isCustomerOrEmployee = formValues.userType.description === 'לקוח' || formValues.userType.description === 'עובד';

        if (!isCustomerOrEmployee) return null;
        return (
            <Rtl>
            <FormControl fullWidth style={{ marginTop: '10px' }}>
                <InputLabel>בחר פרויקטים</InputLabel>
                <Select
                  dir='rtl'
                    multiple
                    value={Object.keys(selectedProjects)}
                    onChange={handleProjectSelection}
                    input={<OutlinedInput sx={{fontFamily: 'CustomFont'}} label="בחר פרויקטים" />}

                    fullWidth
                    renderValue={(selected) => (
                        <div>
                            {(selected as string[]).map((projectId, index) => (
                                <span key={projectId}>
                                    {index > 0 && ", "}
                                    {projects.find(project => project.projectId === projectId)?.businessName}
                                </span>
                            ))}
                        </div>
                    )}
                >
                    {projects.map((project) => (
                        <MenuItem key={project.projectId} value={project.projectId}>
                            {project.businessName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Rtl>
        );
    };

    return (
        <div>
         <Rtl>   
            <TextField
               dir='rtl'
                margin="dense"
                name="firstName"
                label="שם פרטי"
                type="text"
                fullWidth
                multiline
                value={formValues.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
            />
            <TextField
               dir='rtl'
                margin="dense"
                name="lastName"
                label="שם משפחה"
                type="text"
                fullWidth
                multiline
                value={formValues.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
            />
            <TextField
                 dir='rtl'
                margin="dense"
                name="email"
                label="אמייל"
                type="email"
                fullWidth
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                dir='rtl'
                margin="dense"
                name="password"
                label="סיסמא"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                // multiline
                value={formValues.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                
                                {showPassword ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>
                        
                    ),
                    
                }}
                
            />
            <FormControl fullWidth style={{ marginTop: '10px' }} error={!!errors.userType}>
                <InputLabel>סוג משתמש</InputLabel>

                <Select
                    dir='rtl'
                    value={formValues.userType ? formValues.userType.id : ''}
                    onChange={handleUserTypeChange}
                    fullWidth
                    input={<OutlinedInput sx={{fontFamily: 'CustomFont'}} label="סוג משתמש" />}

                >
                    {userTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id} style={{ direction: 'rtl' }} dir='rtl'>
                            
                            {type.description}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.userType}</FormHelperText>
            </FormControl>
            </Rtl>
            {renderProjectsSelection()}
            <button onClick={handleAddUser}  className="btn-primary" style={{marginLeft:'33%',marginTop:'6px', marginBottom:'-6px', width:'170px'}}>
  <span className="button__text" style={{marginRight:'40%'}}>הוספת משתמש</span>
  <span className="button__icon" style={{marginLeft:'10%'}}><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
</button>
            {/* <Button onClick={handleAddUser} color="primary">
                הוסף משתמש
            </Button> */}
        </div>
    );
};

export default AddUserForm;
