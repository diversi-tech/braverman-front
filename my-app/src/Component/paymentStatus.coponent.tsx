  import './paymentStatus.css';
  import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import {getPaymentToProject} from "../api/payment.api";

import React, { useEffect, useState } from 'react';


import './paymentStatus.css';
import Checkbox from '@mui/material/Checkbox';

interface Payment {
  id: number;
  name: string;
  paid: boolean;
  categoryId: string;
}

 const PaymentsComponent: React.FC = (projectId) => {
  const [payments1, setPayments1] = useState<any[]>([]);
      // סטאטיקה עבור תשלומים, עם פונקציית שינוי סטאטיקה
      const [payments, setPayments] = useState<Payment[]>([
        // { id: 4, name: 'אם יש תשלום נוסף', paid: false }, 
             { id: 3, name: 'תשלום 3/3', paid: false ,categoryId:"66931b0253c531934deafb18"},
       { id: 2, name: 'תשלום 2/3', paid: false ,categoryId:"66931a9553c531934deafb17"},
       { id: 1, name: 'תשלום 1/3 מקדמה', paid: false ,categoryId:"6693191853c531934deafb16"},
    
      ]);

  

const handleFileUpload = async (paymentId: number,categoryId:string, file: File) => {
    console.log(`מעלה קובץ עבור תשלום עם מזהה ${paymentId}:`, file);
    // יצירת FormData עבור הקובץ
    
    
const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`https://localhost:7119/api/FileUpload/Base6690dd9c805675b78eff58a4,${categoryId}`, {
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
  

  
    
const handleFileUploadClick = (paymentId: number,categoryId:string, e: React.MouseEvent<HTMLAnchorElement>) => {
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
        
        
handleFileUpload(paymentId,categoryId, file);
      }
      document.body.removeChild(input);
    });
  };

///

  const handleFileUploadClickByIdTask = (payment: any,TaskId:string, e: React.MouseEvent<HTMLAnchorElement>) => {
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
        
        
handleFileUploadByIdTask(payment,TaskId, file);
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
  const updatePaymentStatus1 = (payment:any, status:string) => {
    
 
    console.log(`מעדכן סטטוס תשלום לתשלום עם מזהה ${payment.status.value} ל-${status}`);
        setPayments1((prevPayments) =>
          prevPayments.map((payment1) =>
            payment1.id === payment.paymentId ? { ...payment1.status.value,status } : payment1
          )
        )
      
      }
  const handleFileUploadByIdTask = async (payment: any,TaskId:string, file: File) => {
    console.log(`מעלה קובץ עבור תשלום עם מזהה ${payment.paymentId}:`, file);
    // יצירת FormData עבור הקובץ
    
    
const formData = new FormData();
    formData.append('file', file);
    
    try {
      console.log(payment)
      // שליחת הקובץ לשרת באמצעות fetch
      const response = await fetch(`https://localhost:7119/api/FileUpload/6690dd9c805675b78eff58a4,${TaskId}`, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('העלאת הקובץ נכשלה');
      }
  
      console.log(`הקובץ הועלה בהצלחה עבור תשלום עם מזהה ${payment.projectId}`);
      updatePaymentStatus1(payment, "done"); // עדכון סטטוס התשלום ל-true במקרה של הצלחה

    } catch (error) {
      console.error('שגיאה במהלך העלאת הקובץ:', error);
      // טיפול בשגיאה במקרה של כישלון
    }
  };
  

  const MorePayment = async () => {
    try {
      const result = await getPaymentToProject("6690dd9c805675b78eff58a4");
      setPayments1(result); // עדכון הסטאט בתוצאה המתקבלת מה-API
    } catch (error) {
      console.error('שגיאה בקבלת נתוני תשלומים:', error);
      // טיפול בשגיאה במקרה של כישלון
    }
  };
  // טעינת נתוני התשלומים ברגע שהרכיב מופעל
useEffect(() => {
  MorePayment();
}, []);
console.log(payments1);


  return (
  
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
            <a href="#" className={`uploads${payment.id}`} onClick={(e) => handleFileUploadClick(payment.id,payment.categoryId, e)}>
              העלאת קובץ
            </a>
          </div>

              </div>
      ))}
      


{/* <div id='playments'>:תשלומים</div> */}
      {/* רכיבי תשלומים */}
      {/* {payments1?.map((payment) => (
        <div  className="payment-option"> */}
          {/* Conditional rendering based on payment.paid */}
          {/* {payment.paid ? (
            <CheckCircleOutlineTwoTone                    
            style={{ color: ' black' ,width:'35px',height: '35px',   }} 
         /> ) : (
            <input className="rounded-checkbox"
           id="checkbox"
            type="checkbox"
            checked={payment.paid}
            onChange={() => updatePaymentStatus(payment.id, !payment.paid)}

        />
          )} */}
          {/* <label htmlFor={`checkbox-${payment.id}`} ></label>  */}
          {/* <div id={`name1`}> {payment.description}
            <a href="#" className={`uploads1`} 
            onClick={(e) => handleFileUploadClickByIdTask(payment,payment.taskId, e)}
            >
              העלאת קובץ
            </a>{payment.paid}
          </div>

              </div>
      ))} */}




    </div>
  )}
export default PaymentsComponent;
