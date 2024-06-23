import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
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
  { Id: 1, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'שיחה ראשונית', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 5, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'נקבעה פגישה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 2, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'נשלחה הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 3, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 4, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'ממתין למקדמה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 6, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לשלוח הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
  { Id: 7, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() }];

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Status: '',
    Status2: '',
    BusinessName: '',
    LeadSource: '',
    ActionToPerform: '',
    Date: '',
  });
  const [filterInputsVisible, setFilterInputsVisible] = useState({
    Name: false,
    Phone: false,
    Email: false,
    Status: false,
    Status2: false,
    BusinessName: false,
    LeadSource: false,
    ActionToPerform: false,
    Date: false,
  });

  const dispatch = useDispatch();
  const currentUserType = 'Manager';

  const handleStatusChange = (id: number) => {
    setLeads(leads.map((lead) =>
      lead.Id === id ? { ...lead, Status: 'לקוח' } : lead
    ));
    Swal.fire('Success', 'הליד נהפך ללקוח', 'success');

  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneNumberChange = (phone:string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
};

  const handleAddLead = () => {
    Swal.fire({
      title: 'הוספת ליד חדש',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="שם">' +
        '<input id="swal-input2" class="swal2-input" placeholder="טלפון">' +
        '<input id="swal-input3" class="swal2-input" placeholder="אמייל">' +
        '<input id="swal-input4" class="swal2-input" placeholder="סטטוס">' +
        '<input id="swal-input5" class="swal2-input" placeholder="סטטוס2">' +
        '<input id="swal-input6" class="swal2-input" placeholder="שם העסק">' +
        '<input id="swal-input7" class="swal2-input" placeholder="מקור הליד">' +
        '<input id="swal-input8" class="swal2-input" placeholder="פעולה לביצוע">',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const status2 = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const businessName = (document.getElementById('swal-input6') as HTMLInputElement).value;
        const leadSource = (document.getElementById('swal-input7') as HTMLInputElement).value;
        const actionToPerform = (document.getElementById('swal-input8') as HTMLInputElement).value;

        if (!name || !phone || !email || !status || !status2 || !businessName || !leadSource || !actionToPerform) {
          Swal.showValidationMessage('אנא מלא את כל השדות');
          return null;
        }
         debugger

         //תקינות לאימייל
        if (!validateEmail(email)) {
          Swal.showValidationMessage('כתובת האימייל לא תקינה');
          return null;
        }

        //תקינות לסיסמא
        if(!handlePhoneNumberChange(phone)){
          Swal.showValidationMessage('מס טלפון לא תקין ');
          return null;
        }

        return {
          Id: leads.length + 1,
          Name: name,
          Phone: phone,
          Email: email,
          Status: status,
          Status2: status2,
          BusinessName: businessName,
          LeadSource: leadSource,
          ActionToPerform: actionToPerform,
          Date: new Date()
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setLeads([...leads, result.value]);
      }
    });
  };

  const handleConvertLead = () => {
    if (selectedLeadId === null) {
      Swal.fire('שגיאה', 'אנא בחר ליד להמרה ללקוח', 'error');
      return;
    }

    handleStatusChange(selectedLeadId)
    setSelectedLeadId(null);
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
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof filters) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const toggleFilterInput = (key: keyof typeof filterInputsVisible) => {
    setFilterInputsVisible({ ...filterInputsVisible, [key]: !filterInputsVisible[key] });
  };

  const filteredLeads = leads.filter(lead => {
    return Object.keys(filters).every(key => {
      return lead[key as keyof Lead].toString().toLowerCase().includes(filters[key as keyof typeof filters].toLowerCase());
    });
  });

  return (
    <div className="page-container">
      <div className="lead-management-container">
        <h1 className="lead-management-title">Lead Management</h1>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {(['Date', 'ActionToPerform', 'LeadSource', 'BusinessName', 'Status', 'Status2', 'Email', 'Phone', 'Name'] as const).map((col) => (
                  <th key={col}>
                    {col}
                    <button onClick={() => toggleFilterInput(col)} style={{backgroundColor:"white" ,border:0}}>+</button>
                    {filterInputsVisible[col] && (
                      <input
                        type="text"
                        value={filters[col]}
                        onChange={(e) => handleFilterChange(e, col)}
                      />
                    )}
                  </th>
                ))}
                <th></th>
                {/* {currentUserType === 'Manager' && <th className="table-header">שינוי סטטוס</th>} */}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.Id}>
                  <td>{lead.Date.toLocaleDateString()}</td>
                  <td>{lead.ActionToPerform}</td>
                  <td>{lead.LeadSource}</td>
                  <td>{lead.BusinessName}</td>
                  <td>{lead.Status}</td>
                  <td className={getStatusClass(lead.Status2)}>{lead.Status2}</td>
                  <td>{lead.Email}</td>
                  <td>{lead.Phone}</td>
                  <td>{lead.Name}</td>
                  <td>
                    {currentUserType === 'Manager' &&
                      <button
                        className={`circle-button ${selectedLeadId === lead.Id ? 'clicked' : ''}`}
                        onClick={() => setSelectedLeadId(lead.Id)}
                      ></button>
                    }
                  </td>
                  <td>
                    {/* {currentUserType === 'Manager' &&
                      <button
                        className="status-button"
                        onClick={() => handleStatusChange(lead.Id)}
                        disabled={lead.Status === 'לקוח'}
                      >
                        המרה ללקוח
                      </button>
                    } */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <td colSpan={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#636363' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="add-lead-button" onClick={handleAddLead} style={{ color: '#636363', backgroundColor: "white", border: 0 }}>
            +
        <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>להוספת ליד</span>
        </button>

    </div>
    {currentUserType === 'Manager' && (
        <div className="add-lead-button-container" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
            <button className="convert-lead-button" onClick={handleConvertLead} style={{ fontSize: 15, color: '#636363', backgroundColor: "white", border: 0 ,marginLeft:"180px"}}>→
            <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>המרת ליד ללקוח</span>
            </button>
        </div>
    )}
</td>


      </div>
    </div>
  );
};

export default Leads;
