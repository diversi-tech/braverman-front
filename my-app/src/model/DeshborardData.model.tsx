import { Timer } from "./Timer.model";

export interface DashboardData {
    totalTime: string;
    userTimers: { [key: string]: Timer[] };
    projectTimers: { [key: string]: Timer[] };
  }