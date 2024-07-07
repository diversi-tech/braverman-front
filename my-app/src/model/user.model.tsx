import { Project } from "./Project";
import { UserType } from "./userType.model";



export interface User {
  // constructor(
    email: string,
    password: string,
    id: string,
    typeUser:UserType,
    firstName: string,
    lastName: string,
    projectsId: string[]
  // ) {}
}
  