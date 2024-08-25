import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Project } from "../../model/project.model";
import { updateUser } from "../../Redux/User/userAction";
import { UpdateUserAPI, getUserById } from "../../api/user.api";
import { User } from "../../model/user.model";
import { Navigate, useParams } from "react-router-dom";
import { getProject } from "../../api/project.api";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Box,
    Typography,
    Card,
    CardContent,
    SelectChangeEvent,
} from "@mui/material";
import store from "../../Redux/Store";
import { setAllProject } from "../../Redux/Project/projectAction";
import Rtl from "../rtl/rtl";
import Swal from "sweetalert2";

interface UserId {
    userId: string
}

export const ProviderWrapper: React.FC<UserId> = ({ userId }) => {
    return (
        <Provider store={store}>
            <UpdateUser userId={userId} />
        </Provider>
    );
};

const UpdateUser: React.FC<UserId> = ({ userId }) => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<{ [projectId: string]: string }>({});
    const [showProjects, setShowProjects] = useState(false);
    const projectState = useSelector((state: { Project: { allProject: { [key: string]: Project[] } } }) => state.Project);

    const fetchDataProject = async () => {
        try {
            let data;
            if (projectState.allProject.length) {
                data = projectState.allProject;
            } else {
                const resAllProject = await getProject();
                data = resAllProject.data;
                dispatch(setAllProject(resAllProject));
            }
            setAllProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const usersResult = await getUserById(userId!);
            setCurrentUser(usersResult[0]);
            setSelectedProjects(usersResult[0]?.projectsId || {});
        }
        fetchData();
        fetchDataProject();
    }, [userId, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentUser({
            ...currentUser!,
            [name]: value,
        });
    };


    const handleProjectChange = (projectId: string) => {
        setSelectedProjects((prevSelectedProjects) => {
            const newSelectedProjects = { ...prevSelectedProjects };
            if (newSelectedProjects[projectId]) {
                delete newSelectedProjects[projectId]; 
            } else {
                const project = allProjects.find(p => p.projectId === projectId);
                if (project) {
                    newSelectedProjects[projectId] = project.businessName; 
                }
            }
            return newSelectedProjects;
        });
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentUser) {
            const updatedUser: User = {
                ...currentUser,
                projectsId: selectedProjects,
            };
            dispatch(updateUser(updatedUser));
            UpdateUserAPI(updatedUser)
                .then(() => {
                    Swal.fire('Success', 'המשתמש נוסף בהצלחה', 'success');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width:"100%" }}>
                <Rtl>
                    <TextField
                    multiline
                        dir='rtl'
                        label="שם פרטי "
                        name="firstName"
                        value={currentUser?.firstName || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                    multiline
                        dir='rtl'
                        label="שם משפחה"
                        name="lastName"
                        value={currentUser?.lastName || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                    multiline
                        dir='rtl'
                        label="אימייל"
                        type="email"
                        name="email"
                        value={currentUser?.email || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        dir='rtl'
                        label="סיסמא"
                        type="password"
                        name="password"
                        value={currentUser?.password || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl component="fieldset">
                        <InputLabel></InputLabel>
                        <Button
                            variant="outlined"
                            onClick={() => setShowProjects(!showProjects)}
                        >
                            פרויקטים
                        </Button>
                        {showProjects && (
                            <FormGroup>
                                {allProjects.map((project) => (
                                    <FormControlLabel
                                        dir='rtl'
                                        control={
                                            <Checkbox
                                                style={{ direction: "rtl" }}
                                                checked={!!selectedProjects[project.projectId]}
                                                onChange={() => handleProjectChange(project.projectId)}
                                            />
                                        }
                                        label={project.businessName}
                                        key={project.projectId}
                                    />
                                ))}
                            </FormGroup>
                        )}
                    </FormControl>
                </Rtl>
                <Button type="submit" variant="contained" color="primary">
                    שמירה
                </Button>
            </Box>
        </form>
    );
};

export default UpdateUser;
