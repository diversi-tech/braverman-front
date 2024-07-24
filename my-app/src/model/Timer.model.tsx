// export interface Timer {
//     id: number;
//     description: string;
//     startTime: string; // זמן התחלה
//     endTime?: string; // זמן סיום (אופציונלי אם הטיימר נסגר)
//     duration?: number; // משך הזמן בדקות
//     running: boolean; // האם הטיימר פועל כרגע
//   }
  
export interface Timer {
  timerId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  projectId?: string;
  userId?: string;

}
