import {TaskStatus} from '../enum/taskStatus.enum'

export interface Task {
    task_id: string;
    task_name: string;
    status: TaskStatus; 
    assigned_to: string;
    comment: string;
  }