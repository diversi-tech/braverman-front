import { UserType } from "./userType.model";

export interface User {
  email: string,
  password: string,
  id: string,
  userType:UserType,
  firstName: string,
  lastName: string,
  projectsId: string[]
  }
  