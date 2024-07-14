import { Status } from "../enum/statusCostumer.enum";

export interface Costumer {
  customer_id: string;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  status: Status;
  project_description: string;
  access_details: string;
  comments: string;
  }