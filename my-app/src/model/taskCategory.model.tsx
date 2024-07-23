export interface TaskCategory {
    taskCategoryId:string,
    categoryName:string,
    daysForExecution:number,
    stageId:string,
    sortOrder:number|null
    userId:string|undefined
}