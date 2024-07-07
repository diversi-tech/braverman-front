import { Enum } from "./enum.model";

export interface Task {
    task_id: string;
    task_name: string;
    status: Enum; 
    assigned_to: string;
    comment: string;
  }