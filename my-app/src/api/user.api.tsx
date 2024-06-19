import axios from 'axios';
import { User} from "../model/user.model";

export const addUser = (user:User) => {
    console.log(user);
    // return axios.put(`http://localhost:3000/meeting/`,user);
}


