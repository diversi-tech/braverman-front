import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Leads.css';

interface Lead {
  Id: number;
  Name: string;
  Phone: string;
  Email: string;
  Status: string;
  Status2: string;
  BusinessName: string;
  LeadSource: string;
  ActionToPerform: string;
  Date: Date;
}

const leadsData: Lead[] = [
  { Id: 1, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'שיחה ראשונית', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 5, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'נקבעה פגישה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 2, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'נשלחה הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 3, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 4, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'ממתין למקדמה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 6, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'לשלוח הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 7, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2:'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() }
];

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  const [clickedId, setClickedId] = useState<number | null>(null);
  // const currentUserType = useSelector((state: { user: { currentUser: { UserType: string } } }) => state.user.currentUser.UserType);
  const dispatch = useDispatch();
  const currentUserType='Manager';
  const handleStatusChange = (id: number) => {
    setLeads(leads.map((lead) =>
      lead.Id === id ? { ...lead, Status: 'לקוח' } : lead
    ));
  };

  const handleButtonClick = (id: number) => {
    setClickedId(clickedId === id ? null : id);
  };

  const handleAddLead = () => {
    alert("add")
  };

  const getStatusClass = (Status2: string) => {
    switch (Status2.trim()) {
      case 'שיחה ראשונית':
        return 'First';
      case 'נקבעה פגישה':
        return 'Appointment';
      case 'נשלחה הצעמ':
        return 'Sent';
      case 'לא טופל':
        return 'Not';
      case 'ממתין למקדמה':
        return 'Payment';
      case 'לשלוח הצעמ':
        return 'ToSent';
      default:
        return '';
    }
}
  return (
    <div className="page-container">
      <div className="lead-management-container">
        <h1 className="lead-management-title">Lead Management</h1>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
              <th>תאריך</th>
              <th>פעולה לביצוע</th>
              <th>מקור הליד</th>
              <th>שם העסק</th>
              <th>סטטוס</th>
              <th>סטטוס</th>
              <th>אמייל</th>
              <th>טלפון</th>
              <th>שם הלקוח</th>
                <th></th>
                {currentUserType === 'Manager' && <th className="table-header">שינוי סטטוס</th>}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.Id}>
                 <td>{lead.Date.toLocaleDateString()}</td>
                 <td>{lead.ActionToPerform}</td>
                 <td>{lead.LeadSource}</td>
                 <td>{lead.BusinessName}</td>
                 <td>{lead.Status}</td>
                 <td  className={getStatusClass(lead.Status2)}>{lead.Status2}</td>
                 <td>{lead.Email}</td>
                 <td>{lead.Phone}</td>
                  <td>{lead.Name}</td>
                  <td>
                    {currentUserType === 'Manager' &&
                      <button
                        className={`circle-button ${clickedId === lead.Id ? 'clicked' : ''}`}
                        onClick={() => handleButtonClick(lead.Id)}
                      ></button>
                    }
                  </td>
                  <td>
                    {currentUserType === 'Manager' &&
                      <button
                        className="status-button"
                        onClick={() => handleStatusChange(lead.Id)}
                        disabled={lead.Status === 'לקוח'}
                      >
                        העברה למצב לקוח
                      </button>
                    }
                  </td>
                </tr>
              ))}
              <tr>
              <td colSpan={10} className='add' style={{textAlign:'right',fontSize:15,color: '#636363'}}>להוספת ליד</td>
              <td className="add-lead-cell">
                  <button className="add-lead-button" onClick={handleAddLead} style={{color:'#636363'}}>
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
