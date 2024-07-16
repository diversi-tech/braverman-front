import { Task } from "./task.model";
import { Credential } from "./credential.model";
import { Enum } from "./enum.model";

export interface Project {
  projectId: string;
  freeText: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  source: string;
  status: Enum;
  endDate: Date; // Assuming it's a string representation of a date
  balanceStatus:Enum
  createdAt: Date; // Assuming it's a string representation of a date
  updatedAt: Date; // Assuming it's a string representation of a date
  totalPrice: number;
  pricePaid: number;
  balance: number;
  stageStatus: Enum;
  tasks: Task[];
  credentials: Credential[];
  urlFigma: string;
  urlDrive: string;
  urlWordpress: string;
}



