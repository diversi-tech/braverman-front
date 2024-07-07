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

            setSelectedProjects(usersResult[0].projectsId|| []);
            console.log(selectedProjects);

        }
        fetchData();
    }, [s]);

console.log(currentUser);
 

// const handleProjectButtonClick = async () => {
//     debugger
//     const projectsResult = await getAllProjects();
//     const projectsSelectResult = await GetAllProjectPerUser(s!);
//     setProjects(projectsResult);
//     setSelectedProjects(projectsSelectResult);
//     setShowProjects(!showProjects);
// };

const handleChange = (event:any) => {
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
    {/* <button type="button" onClick={handleProjectButtonClick}>
                {showProjects ? "Hide Projects" : "Show Projects"}
            </button>
            {showProjects && (
                <div>
                    <label>Projects</label>
                    {projects.map(project => (
                        <div key={project.projectId}>
                            <input
                            // value={project.BusinessName}
                                type="checkbox"
                                checked={currentUser?.projectId.map(p=> )}
                                // checked={selectedProjects.includes(currentUser.projectId)}
                                onChange={() => handleProjectChange(project.projectId)}
                            />
                            {project.businessName}
                        </div>
                    ))}
                </div>
            )} */}
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





{/* <form class="row g-3 needs-validation" novalidate>
  <div class="col-md-4">
    <label for="validationCustom01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationCustom01" value="Mark" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationCustom02" class="form-label">Last name</label>
    <input type="text" class="form-control" id="validationCustom02" value="Otto" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationCustomUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">@</span>
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
      <div class="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <label for="validationCustom03" class="form-label">City</label>
    <input type="text" class="form-control" id="validationCustom03" required>
    <div class="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <div class="col-md-3">
    <label for="validationCustom04" class="form-label">State</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option>...</option>
    </select>
    <div class="invalid-feedback">
      Please select a valid state.
    </div>
  </div>
  <div class="col-md-3">
    <label for="validationCustom05" class="form-label">Zip</label>
    <input type="text" class="form-control" id="validationCustom05" required>
    <div class="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
      <label class="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      <div class="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form> */}

    <button type="submit">Save</button>
    </form>
    );
    };

export default UpdateUser;

    {/* <div>
    <label>Projects</label>
    {currentUser?.projectId.map((project, index) => (
    <div key={index}>
    <input
      type="text"
      name="ProjectName"
      value={project}
    //   onChange={(e) => handleProjectChange(index, e)}
      placeholder="Project Name"
    />
    </div>
    ))}
    </div> */}
   
{/* <div>
    <label>User Type</label>
    <input
        type="text"
        name="cdUser"
        value={currentUser?.typeUser?.description}
        onChange={((event) => handleChange(event))}
    />
</div> */}


 // getUserById(s!)
    //     .then(x => {
    //         alert(x);
    //         setCurrentUser(x)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

// const updatedCurrentUser = { ...user };
    // const [currentUser, setcurrentUser] = useState<User>({
    //     email: "",>
    //     password: "",
    //     firstName: "",
    //     lastName: "",
    //     typeUser: { id: "", description: "" },
    //     id: "",
    //     projectId: [""]
    // });
// console.log(updatedCurrentUser);

// console.log(updatedCurrentUser.email);

    // useEffect(() => {
    //     if (currentUser) {
    //         setcurrentUser({
    //             email: currentUser.email,
    //             password: currentUser.password,
    //             firstName: currentUser.firstName,
    //             lastName: currentUser.lastName,
    //             typeUser: currentUser.typeUser,
    //             id: currentUser.id,
    //             projectId: currentUser.projectId,
    //         });
    //     }
    // }, [currentUser]);
    // const handleChange = (event: any) => {
    //     // const { name, value } = event.target;
    //     // setcurrentUser({
    //     //     ...currentUser,
    //     //     [name]: value,
    //     // });

    //     const { name, value } = event.target;
    //     console.log(`Handling change: ${name} = ${value}`);
    //     if (name === "typeUser") {
    //         setcurrentUser((prevState) => ({
    //             ...prevState,
    //             typeUser: { ...prevState.typeUser, description: value }
    //         }));
    //     } else {
    //         setcurrentUser((prevState) => ({
    //             ...prevState,
    //             [name]: value,
    //         }));
    //     }
    // }

    // const [currentUser, setcurrentUser] = useState(currentUser)
    //     email: currentUser.email ,
    //     password: currentUser.password,
    //     firstName: currentUser.firstName,
    //     lastName: currentUser.lastName ,
    //     typeUser: currentUser.typeUser ,
    //     id: currentUser.id ,
    //     projectId: currentUser.projectId,
    //   });
    
//     const [currentUser, setcurrentUser] = useState<User>([{
//         firstName: currentUser?.firstName,
//         lastName: currentUser?.lastName ,
//         email: currentUser?.email ,
//         password: currentUser?.password,
//         typeUser: currentUser?.typeUser ,
//         id: currentUser?.id ,
//         projectId: currentUser?.projectId,}
// ]);

    //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setcurrentUser(prevState => ({
    //       ...prevState,
    //       [name]: value,
    //     }));
    //   };

   
        // console.log(currentUser["user"].email);
        
        // const mergedUser = { ...currentUser, ...currentUser };
        // const mergeUsers = (currentUser:User, currentUser:User) => {
        //     return {
        //       email: currentUser.email || currentUser.email,
        //       password: currentUser.password || currentUser.password,
        //       id: currentUser.id || currentUser.id,
        //       typeUser: currentUser.typeUser || currentUser.typeUser,
        //       firstName: currentUser.firstName || currentUser.firstName,
        //       lastName: currentUser.lastName || currentUser.lastName,
        //       projectId: currentUser.projectId || currentUser.projectId,
        //     };
        //   };
          
        //   const mergedUser = mergeUsers(currentUser, currentUser);
        // getUserById(currentUser.id)
        //     .then(x => {
        //         alert(x)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

       



        // UpdateUserAPI(currentUser)
        //     .then(x => {
        //         alert("success")

        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });     
        // event.preventDefault();
        // if (!currentUser.id || !currentUser.projectId.length) {
        //     alert("Missing ID or project IDs");
        //     return;
        // }
        // dispatch(updateUser(mergedUser));
    

