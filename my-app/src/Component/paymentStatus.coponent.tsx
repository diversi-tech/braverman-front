  import './paymentStatus.css';
  import { CheckCircleOutlineTwoTone } from "@mui/icons-material";



// // // export default PaymentsComponent;
// // import React, { useState } from 'react';

// // interface Payment {
// //   id: number;
// //   name: string;
// //   paid: boolean;
// // }

// // const PaymentsComponent: React.FC = () => {
// //     const [payments, setPayments] = useState([
// //         { id:1, name: 'תשלום 1/3 מקדמה', file: null, paid: false },
// //         { id: 4, name: 'אם יש תשלום נוסף', file: null, paid: false },
// //         { id: 3, name: 'תשלום 3/3', file: null, paid: false },
// //         { id: 2, name: 'תשלום 2/3', file: null, paid: false },
// //     ]);
// //   // Function to handle file upload
// //   const handleFileUpload = (paymentId: number, file: File) => {
// //     console.log(`Uploading file for payment ID ${paymentId}:`, file);

// //     // Example: Simulating an upload process (replace with your actual upload logic)
// //     setTimeout(() => {
// //       console.log(`File uploaded successfully for payment ID ${paymentId}`);

// //       // Assuming you need to update some state or perform an action after upload
// //       // Example: Update payment status or UI state
// //       updatePaymentStatus(paymentId, true); // Example function to update payment status
// //     }, 1000); // Simulating a delay for demonstration
// //   };

// //   // Function to handle file upload click event
// //   const handleFileUploadClick = (paymentId: number, e: React.MouseEvent<HTMLAnchorElement>) => {
// //     e.preventDefault(); // Prevent default link behavior

// //     // Create an input element dynamically
// //     const input = document.createElement('input');
// //     input.type = 'file';
// //     input.style.display = 'none'; // Hide the input

// //     // Append input to body
// //     document.body.appendChild(input);

// //     // Simulate a click on the input element
// //     input.click();

// //     // Handle file selection
// //     input.addEventListener('change', (e) => {
// //       const target = e.target as HTMLInputElement;
// //       if (target.files && target.files.length > 0) {
// //         const file = target.files[0];
// //         //         Handle file upload (e.g., send it to server)
// //         handleFileUpload(paymentId, file);
// //       }

// //       // Clean up: remove the input element from the DOM
// //       document.body.removeChild(input);
// //     });
// //   };

// //   // Example function to update payment status (replace with your actual logic)
// //   const updatePaymentStatus = (paymentId: number, paid: boolean) => {
// //     // Update your state, UI, or make an API call to update payment status
// //     console.log(`Updating payment status for ID ${paymentId} to ${paid}`);
// //     setPayments(prevPayments =>
// //       prevPayments.map(payment =>
// //         payment.id === paymentId ? { ...payment, paid } : payment
// //       )
// //     );
// //   };

// //   return (
// //     <div className="payments-container">
// //         <div id='playments'>:תשלומים</div>
// // <div          
// //         key={1} className="payment-option">
// //         <input    className='checkbox1'  type="checkbox" checked={payments[1].paid} onChange={() => updatePaymentStatus(1, !payments[1].paid)} />

// //          <div id='name1' > {payments[1].name}
// //          <a href="#" className='uploads1' onClick={(e) => handleFileUploadClick(1, e)}>
// //             העלאת קובץ
// //           </a> </div> </div>


// // <div          
// //         key={2} className="payment-option">  
// //          <br/><input   className='checkbox2' type="checkbox" checked={payments[2].paid} onChange={() => updatePaymentStatus(2, !payments[2].paid)} />
// //          </div>
// //                     <div id='name2' > {payments[2].name} 
// //                     <a href="#" className='uploads2' onClick={(e) => handleFileUploadClick(2, e)}>
// //         העלאת קובץ
// //       </a>     
// //             </div>  

// // <div          
// // key={3} className="payment-option"> 
// //  <input    className='checkbox3' type="checkbox" checked={payments[3].paid} onChange={() => updatePaymentStatus(3, !payments[3].paid)} />

// // <div id='name3' > {payments[3].name}
  
// //  <a href="#" className='uploads3' onClick={(e) => handleFileUploadClick(3, e)}>
// //     העלאת קובץ
// //   </a> <br/></div></div>

// // <div          
// //         key={4} className="payment-option">
// //         <input    className='checkbox' type="checkbox" checked={payments[0].paid} onChange={() => updatePaymentStatus(4, !payments[0].paid)} />

// //          <div id='name' > {payments[0].name}
        
// //         <a href="#" className='uploads' onClick={(e) => handleFileUploadClick(4, e)}>
// //             העלאת קובץ
// //           </a>   </div>         </div>
// //     </div>
// //   );
// // };

// // export default PaymentsComponent;
// import React, { useState } from 'react';

// interface Payment {
//   id: number;
//   name: string;
//   paid: boolean;
// }

// const PaymentsComponent: React.FC = () => {
//   // סטאטיקה עבור תשלומים, עם פונקציית שינוי סטאטיקה
//   const [payments, setPayments] = useState<Payment[]>([
//     { id: 4, name: 'אם יש תשלום נוסף', paid: false }, 
//          { id: 3, name: 'תשלום 3/3', paid: false },
//    { id: 2, name: 'תשלום 2/3', paid: false },
//    { id: 1, name: 'תשלום 1/3 מקדמה', paid: false },

//   ]);

//   // פונקציות להעלאת קובץ ולעדכון סטטוס
//   const handleFileUpload = (paymentId: number, file: File) => {
//     console.log(`מעלה קובץ עבור תשלום עם מזהה ${paymentId}:`, file);
//     setTimeout(() => {
//       console.log(`הקובץ הועלה בהצלחה עבור תשלום עם מזהה ${paymentId}`);
//       updatePaymentStatus(paymentId, true);
//     }, 1000);
//   };

//   const handleFileUploadClick = (paymentId: number, e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.style.display = 'none';
//     document.body.appendChild(input);
//     input.click();
//     input.addEventListener('change', (e) => {
//       const target = e.target as HTMLInputElement;
//       if (target.files && target.files.length > 0) {
//         const file = target.files[0];
//         handleFileUpload(paymentId, file);
//       }
//       document.body.removeChild(input);
//     });
//   };

//   const updatePaymentStatus = (paymentId: number, paid: boolean) => {
//     console.log(`מעדכן סטטוס תשלום לתשלום עם מזהה ${paymentId} ל-${paid}`);
//     setPayments((prevPayments) =>
//       prevPayments.map((payment) =>
//         payment.id === paymentId ? { ...payment, paid } : payment
//       )
//     );
//   };

//   return (
//     <div className="payments-container">
//       <div id='playments'>:תשלומים</div>
//       {/* רכיבי תשלומים */}
//       {payments.map((payment) => (
//         <div key={payment.id} className="payment-option">
//           {/* className={`checkbox${payment.id}`} */}
//           <div          
//           >
//           <input className="rounded-checkbox"
//            id="checkbox"
//             type="checkbox"
//             checked={payment.paid}
//             onChange={() => updatePaymentStatus(payment.id, !payment.paid)}
//         />
//          <label htmlFor="checkbox" ></label> 
//     </div>
//           <div id={`name${payment.id}`}> {payment.name}
//             <a href="#" className={`uploads${payment.id}`} onClick={(e) => handleFileUploadClick(payment.id, e)}>
//               העלאת קובץ
//             </a>
//           </div>
     


//         </div>
//       ))}
//     </div>
//   );
// };

// export default PaymentsComponent;
// 

import React, { useState } from 'react';


import './paymentStatus.css';
import Checkbox from '@mui/material/Checkbox';

interface Payment {
  id: number;
  name: string;
  paid: boolean;
}

 const PaymentsComponent: React.FC = (project) => {

      // סטאטיקה עבור תשלומים, עם פונקציית שינוי סטאטיקה
      const [payments, setPayments] = useState<Payment[]>([
        { id: 4, name: 'אם יש תשלום נוסף', paid: false }, 
             { id: 3, name: 'תשלום 3/3', paid: false },
       { id: 2, name: 'תשלום 2/3', paid: false },
       { id: 1, name: 'תשלום 1/3 מקדמה', paid: false },
    
      ]);

  

const handleFileUpload = async (paymentId: number, file: File) => {
    console.log(`מעלה קובץ עבור תשלום עם מזהה ${paymentId}:`, file);
    // יצירת FormData עבור הקובץ
    
    
const formData = new FormData();
    formData.append('file', file);
    
    try {
      // שליחת הקובץ לשרת באמצעות fetch
      const response = await fetch(`https://localhost:7119/api/Tasks/UploadFile/${taskId}`, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('העלאת הקובץ נכשלה');
      }
  
      console.log(`הקובץ הועלה בהצלחה עבור תשלום עם מזהה ${paymentId}`);
      
      
updatePaymentStatus(paymentId, true); // עדכון סטטוס התשלום ל-true במקרה של הצלחה
    } catch (error) {
      console.error('שגיאה במהלך העלאת הקובץ:', error);
      // טיפול בשגיאה במקרה של כישלון
    }
  };
  

  
    
const handleFileUploadClick = (paymentId: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    
const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.click();
    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        
        
handleFileUpload(paymentId, file);
      }
      document.body.removeChild(input);
    });
  };

  const updatePaymentStatus = (paymentId: number, paid: boolean) => {
    
 
console.log(`מעדכן סטטוס תשלום לתשלום עם מזהה ${paymentId} ל-${paid}`);
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === paymentId ? { ...payment, paid } : payment
      )
    )
  
  }

  
 
  return (
    //    <div className="payments-container">
    //   <div id='playments'>:תשלומים</div>
    //   {/* רכיבי תשלומים */}
    //   {payments.map((payment) => (
    //     <div key={payment.id} className="payment-option">
    //       {/* className={`checkbox${payment.id}`} */}
    //       <div          
    //       >
    //       <input className="rounded-checkbox"
    //        id="checkbox"
    //         type="checkbox"
    //         checked={payment.paid}
    //         onChange={() => updatePaymentStatus(payment.id, !payment.paid)}
    //     />
     
    //      <label htmlFor="checkbox" ></label> 
    // </div>
    //       <div id={`name${payment.id}`}> {payment.name}
    //         <a href="#" className={`uploads${payment.id}`} onClick={(e) => handleFileUploadClick(payment.id, e)}>
    //           העלאת קובץ
    //         </a>
    //       </div>
     


    //     </div>
    //   ))}
      
    // </div>
    
    <div className="payments-container">
      <div id='playments'>:תשלומים</div>
      {/* רכיבי תשלומים */}
      {payments.map((payment) => (
        <div key={payment.id} className="payment-option">
          {/* Conditional rendering based on payment.paid */}
          {payment.paid ? (
            <CheckCircleOutlineTwoTone                    
            style={{ color: ' black' ,width:'35px',height: '35px',   }} 
         /> ) : (
            <input className="rounded-checkbox"
           id="checkbox"
            type="checkbox"
            checked={payment.paid}
            onChange={() => updatePaymentStatus(payment.id, !payment.paid)}
        />
          )}
          <label htmlFor={`checkbox-${payment.id}`} ></label> 
          <div id={`name${payment.id}`}> {payment.name}
            <a href="#" className={`uploads${payment.id}`} onClick={(e) => handleFileUploadClick(payment.id, e)}>
              העלאת קובץ
            </a>
          </div>

              </div>
      ))}
      
    </div>
  )}
export default PaymentsComponent;
