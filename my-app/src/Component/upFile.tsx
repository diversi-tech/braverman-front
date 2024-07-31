import { Button } from "@mui/material"
import axios from "axios";
import { useState } from "react";

export const UpFile=()=>{
    const [fileSelected,setFileSelected]= useState("");
    const [accept,setAccept]= useState(false);


    const saveFileSelected= (e:any) => {
        setFileSelected(e.target.files[0]);
      }
    
    const importFile= async (e:any) =>
     {
        debugger
        const formData = new FormData();
        formData.append("file", fileSelected);
    
        try {
          const res = await axios.post(`https://localhost:7119/api/UpFile/ImportFile`, formData);
        if(res)setAccept(true)
        } 
        catch (ex)
         {
          console.log(ex);
        }
        
      }

    return(<>
    
             <input
                    color="447ED4"
                        type="file"
                        style={{backgroundColor:"3A8E3A"}}
                        onChange={saveFileSelected}
                    />
                    <Button
                        style={{backgroundColor:"E45545",color:"E45545"}}
                   id="bsent"
                      onClick={importFile}>
                        !שלח
                    </Button>
    </>)
} 