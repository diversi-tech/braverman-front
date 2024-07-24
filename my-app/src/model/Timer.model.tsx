export interface Timer {
  timerId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  projectId?: string;
  userId?: string;

}
