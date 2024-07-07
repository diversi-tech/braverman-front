//import { Status } from "../enum/statusCostumer.enum";
import { Enum } from "./enum.model";

export interface Costumer {
  customer_id: string;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  status: Enum;
  project_description: string;
  access_details: string;
  comments: string;
  }