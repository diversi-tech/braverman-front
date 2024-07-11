import {ProjectStatus} from "../enum/ProjectStatus.enum";
import {ProjectBalanceStatus} from "../enum/ProjectBalanceStatus.enum";
import {Task} from "../model/task.model";
import {Credential} from "./credential.model";

export interface Project {
      projectId:string
      firstName: string
      LastName: string
      BusinessName: string
      Email:string
      Source:string
      Status:ProjectStatus
      EndDate:Date
      BalanceStatus: ProjectBalanceStatus
      CreatedAt:Date
      UpdatedAt:Date
      TotalPrice: number
      PricePaid: number
     _balance:number
     Tasks:Task[]
     Credentials:Credential[]
     UrlWordpress:string
     UrlDrive:string
     UrlFigma:string
}
