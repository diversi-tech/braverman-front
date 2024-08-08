import axios from 'axios';


export const sendEmailToRivky = async (title:string,massage:string) => {
    debugger
    console.log(title,massage)
  return  await axios.post(`https://localhost:7119/api/Email/sendEmail/${title}/${massage}`)}
    