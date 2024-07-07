import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../model/Project";
import { updateUser } from "../../Redux/User/userAction";
import { GetAllProjectPerUser, UpdateUserAPI, getUserById } from "../../api/user.api";
import { User } from "../../model/user.model";
import { Navigate } from "react-router-dom";
import { stringify } from "querystring";
import { getAllProjects } from "../../api/project.api";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const s = sessionStorage.getItem("userId")
    const [currentUser, setCurrentUser] = useState<User>()
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [showProjects, setShowProjects] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const usersResult = await getUserById(s!);
            const projectsResult = await getAllProjects();
            setCurrentUser(usersResult[0]);

            setAllProjects(projectsResult);
            console.log(allProjects);

            setSelectedProjects(usersResult[0].projectsId || []);
            console.log(selectedProjects);

        }
        fetchData();
    }, [s]);

    console.log(currentUser);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setCurrentUser({
            ...currentUser!,
            [name]: value,
        });
    };

    const handleProjectChange = (projectId: string) => {
        debugger
        setSelectedProjects((prevSelectedProjects) => {
            if (prevSelectedProjects.includes(projectId)) {
                return prevSelectedProjects.filter(id => id !== projectId);
            } else {
                return [...prevSelectedProjects, projectId];
            }
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        debugger
        event.preventDefault();
        const updatedUser = {
            ...currentUser!,
            projectsId: selectedProjects,
        };
        dispatch(updateUser(updatedUser));
        UpdateUserAPI(updatedUser!)
            .then(() => {
                alert("success");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={((event) => handleSubmit(event))}>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={currentUser?.firstName}
                    onChange={((event) => handleChange(event))}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={currentUser?.lastName}
                    onChange={((event) => handleChange(event))}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={currentUser?.email}
                    onChange={((event) => handleChange(event))}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={currentUser?.password}
                    onChange={((event) => handleChange(event))}
                />
            </div>
            <div>
                <label>Projects</label>
                <button
                    type="button"
                    onClick={() => setShowProjects(!showProjects)}
                >
                    Projects
                </button>
                {showProjects && (
                    <div id="projectCheckboxes">
                        {allProjects.map((project) => (
                            <div key={project.projectId}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedProjects.includes(project.projectId)}
                                        onChange={() => handleProjectChange(project.projectId)}
                                    />
                                    {project.businessName}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default UpdateUser;

