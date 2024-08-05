import { TaskStatus } from "../enum/taskStatus.enum";
import { Enum } from "./enum.model";

import { TaskCategory } from "./taskCategory.model";

export interface Task {
  taskId: string;
  taskName: string;
  assignedTo: string;
  projectId: string;
  taskCategory: TaskCategory;
  status: Enum;
  canBeApprovedByManager: null;
  levelUrgencyStatus: string;
  description: string;
   startDate: Date;
}