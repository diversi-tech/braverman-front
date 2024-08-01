export interface Timer {
  timerId: string;
  startTime: Date;
  endTime?: Date;
  duration?: string; // in minutes
  projectId?: string;
  userId?: string;
  projectName?: string;

}
