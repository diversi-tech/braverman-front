import axios from 'axios';
export const importFile= async (fileSelected:any) =>
    {
       debugger
   console.log("fileSelected: "+fileSelected)
       const formData = new FormData();
       formData.append("file", fileSelected);
   console.log("formData: "+formData)
       try {
         const res = await axios.post(`https://localhost:7119/api/Drive/ImportFile`, formData);
       if(res)alert("הקובץ התקבל בהצלחה")
       }
       catch (ex)
        {
         console.log(ex);
       }
     }
