import { Timer } from "./Timer.model";
import { UserType } from "./userType.model";
import { WorkMonth } from "./workMonth.model";

export interface User {
  email: string,
  password: string,
  id: string,
  userType:UserType,
  firstName: string,
  lastName: string,
  projectsId: string[],
  // work: Timer[];
  // workMonth: WorkMonth[];
  }
  