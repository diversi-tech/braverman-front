import React, { useEffect, useState } from 'react';
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import './PaymentsComponent.css';
import { Project } from '../../../model/project.model';
import { changeStatusPaymentTaskByTaskId, getPaymentToProject } from '../../../api/payment.api';
interface Payment {
  id: number;
  name: string;
  paid: boolean;
  categoryId: string;
}
interface Payment1 {
  id: number;
  status: {
    value: string;
  };
  paymentId: number;
  projectId: string;
  taskId: string;
}
interface ProjectDetailsProps {
  project: Project;
}
const PaymentsComponent: React.FC<ProjectDetailsProps> = ({ project }) => {
  const [payments1, setPayments1] = useState<any[]>([]);
   const handleFileUploadByIdTask = async (payment: any, TaskId: string) => {
    try {debugger
      const response = await changeStatusPaymentTaskByTaskId(project.projectId,TaskId)
      if (!response) {
        throw new Error('אישור התשלום נכשל');
      }
 setPayments1(prevPayments =>
            prevPayments.map(p =>
                p.taskId === payment.taskId ? { ...p, status: { key: 4 } } : p
            )
        );
    } catch (error) {
      console.error('שגיאה במהלך העלאת הקובץ:', error);
    }
  };
  const MorePayment = async () => {
    try {
  const result = await getPaymentToProject(project.projectId);
      setPayments1(result);
      console.log(result);
    } catch (error) {
      console.error('שגיאה בקבלת נתוני תשלומים:', error);
    }
  };
  useEffect(() => {
    MorePayment();
  }, []);
  return (
    <div className="payments-container">
    <div className="scroll-container">
    <div className="payments-list"><div id='payments-title'>תשלומים:</div>
   {payments1.map((payment) => (
        <div key={payment.id} className="payment-option">
          <div className="payment-text" id={`name${payment.id}`}>
              {payment.taskName}
            </div> <div className="payment-content">
            {payment.status.key==4 ? (
              <CheckCircleOutlineTwoTone
                style={{ color: 'black', width: '35px', height: '35px' }}
              />
            ) : (
              <input
                className="rounded-checkbox"
                id={`checkbox-${payment.id}`}
                type="checkbox"
                checked={payment.paid}
                onChange={() => handleFileUploadByIdTask(payment, payment.taskId)}
              />
            )}
            <label htmlFor={`checkbox-${payment.id}`}></label>
          </div>
        </div>
      ))}
    </div>
  </div></div>
);
};
export default PaymentsComponent;