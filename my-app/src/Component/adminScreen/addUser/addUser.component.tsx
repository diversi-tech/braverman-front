import React, { useState } from 'react';
import { User} from "../../../model/user.model";
import { addUser } from "../../../api/user.api";
const AddUser: React.FC = () => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [typeUser, setTypeUser] = useState({id:'',description:''});
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [projectsId, setProjectsId] = useState([]);

  const addNewUser=async(newUser:User)=>{
    try{
      await addUser(newUser);
    }
    catch(error){
      console.error(error);
    }
   
  }
  const handleAddUser = async() => {
    // יצירת אובייקט משתמש חדש
    
    const newUser: User = {
      email,
      firstName,
      lastName,
      typeUser,
      password,
      projectsId,
      id
    };

    // כאן תוכל להוסיף לוגיקה לשליחת המשתמש לשרת או עיבוד נוסף
    console.log('Adding user:', newUser);
    await addNewUser(newUser);

    // איפוס השדות לאחר הוספת המשתמש
    setEmail('');
    setFirstName('');
    setLastName('');
    setTypeUser({id:'',description:''});
    setPassword('');
  };

  return (<div>
      <h2>Add User </h2>
      <form onSubmit={(e) => { 
        e.preventDefault();
        //כאן ההוספה של המשתמש החדש למונגו
         handleAddUser(); }}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>User Type:</label>
          <select value={typeUser.description} onChange={(e) => setTypeUser({...typeUser,description : e.target.value})} required>
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
