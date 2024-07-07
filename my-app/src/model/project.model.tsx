import {Task} from "../model/task.model";
import {Credential} from "./credential.model";
import { Enum } from "./enum.model";

export interface Project {
      projectId:string
      firstName: string
      lastName: string
      businessName: string
      email:string
      source:string
      status:Enum
      endDate:Date
      balanceStatus: Enum
      createdAt:Date
      updatedAt:Date
      totalPrice: number
      pricePaid: number
     _balance:number
     tasks:Task[]
     credentials:Credential[]
     urlWordpress:string
     urlDrive:string
     urlFigma:string
}
