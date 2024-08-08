import { Task } from "./task.model";
import { Credential } from "./credential.model";
import { Enum } from "./enum.model";
import { Timer } from "./Timer.model";
import { WorkMonth } from "./workMonth.model";

export interface Project {
  projectId: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  source: string;
  address: string|null;
  phone: string|null;
  status: Enum;
  endDate: Date; 
  balanceStatus:Enum
  createdAt: Date;
  updatedAt: Date; 
  totalPrice: number;
  pricePaid: number;
  balance: number;
  stageStatus: Enum;
  tasks: Task[];
  credentials: Credential[];
  urlFigma: string;
  urlDrive: string;
  urlWordpress: string;
  freeText: string;
  workLog: string[];
}



