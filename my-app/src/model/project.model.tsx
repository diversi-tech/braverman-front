import {Task} from "../model/task.model";
import {Credential} from "./credential.model";
import { Enum } from "./enum.model";

export interface Project {
      ProjectId:string
      FirstName: string
      LastName: string
      BusinessName: string
      Email:string
      Source:string
      Status:Enum
      EndDate:Date
      BalanceStatus: Enum
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
