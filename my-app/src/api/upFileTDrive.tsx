import axios from 'axios';
const apiUrl = process.env.REACT_APP_BRAVERMAN;

export const importFile = async (fileSelected: any) => {

       const formData = new FormData();
       formData.append("file", fileSelected);
       try {
              const res = await axios.post(`${apiUrl}Drive/ImportFile`, formData);
              if (res) alert("הקובץ התקבל בהצלחה")
       }
       catch (ex) {
              console.log(ex);
              alert(" נסה שוב")
       }
}


