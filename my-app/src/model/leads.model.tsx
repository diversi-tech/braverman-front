import {Notes} from './notes.model'

export interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    phone:string;
    email: string;
    source: string;
    createdDate: Date;
    lastContacted: Date;
    businessName: string;
    freeText:string;
    notes:Array<Notes>;
    status: string;
  }

