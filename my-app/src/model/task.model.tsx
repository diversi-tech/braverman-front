import { TaskStatus } from "../enum/taskStatus.enum";
import { TaskCategory } from "./taskCategory.model";
export interface Task {
  taskId: string;
  taskName: string;
  assignedTo: string;
  comment: string;
  projectId: string;
  description: string;
  taskCategory: TaskCategory
  status: TaskStatus;
  canBeApprovedByManager: null;
  levelUrgencyStatus: string;
}