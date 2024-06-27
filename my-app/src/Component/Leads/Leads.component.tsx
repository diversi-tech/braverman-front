import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './Leads.css';
import { HiChevronDown ,HiSearch } from "react-icons/hi";
import { GrUpdate } from "react-icons/gr";
import { getAllLeads } from '../../api/Leads.api';
import { Lead } from '../../model/Lead.model';
import { Notes } from '../../model/notes.model';



// const leadsData: Lead[] = [
//   { Id: 1, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'שיחה ראשונית', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 5, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'נקבעה פגישה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 2, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'נשלחה הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 3, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 4, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'ממתין למקדמה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 6, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לשלוח הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 7, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() }];


const statusOptions = [
  'ליד חדש',
  'שיחה ראשונית'
  ,'פגישת אפיון',
  'שליחת הצעת מחיר',
  'נשלחה הצעת מחיר',
  'שיחת מעקב',
  'הוצאת חשבונית',
  'העברה להקמה בפועל',
  'נסגר'
];

const Leads: React.FC = () => {

const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // מערך לאחסון סטטוס השינויים של הלידים
  const [leadsChanges, setLeadsChanges] = useState<boolean[]>();
  // מערך לאחסון האובייקטים של הלידים ששונו
  const [modifiedLeads, setModifiedLeads] = useState<Lead[]>();
  const [filters, setFilters] = useState({
    "שם פרטי": '',
    "שם משפחה": '',
    "טלפון":'',
    "אימייל": '',
    "מקור הליד": '',
    "תאריך יצירת הליד": '',
    "תאריך פניה אחרונה": '',
    "שם העסק": '',
    "טקסט חופשי": '',
    "הערות": '',
    "סטטוס":''
  });
  const [filterInputsVisible, setFilterInputsVisible] = useState({
    "שם פרטי": false,
    "שם משפחה": false,
    "טלפון":false,
    "אימייל": false,
    "מקור הליד": false,
    "תאריך יצירת הליד": false,
    "תאריך פניה אחרונה": false,
    "שם העסק": false,
    "טקסט חופשי": false,
    "הערות": false,
    "סטטוס": false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAllLeads = await getAllLeads();
        const data = resAllLeads.data.map((lead: any) => ({
          ...lead,
          createdDate: new Date(lead.createdDate),
          lastContacted: new Date(lead.lastContacted),
        }));
        setLeads(data);
        setModifiedLeads(data)
        setLeadsChanges(new Array(leads.length).fill(false))
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
    fetchData();
  }, []);

  const convertDateTimeToDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const dispatch = useDispatch();
  const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  const currentUserType = 'Manager';

  const handleStatusChange = (id: string) => {
    setLeads(leads.map((lead) =>
      lead.id === id ? { ...lead, Status: 'לקוח' } : lead
    ));
    Swal.fire('Success', 'הליד נהפך ללקוח', 'success');
  };

  const handleStatus2Change = (id: string, newStatus2: string) => {
    setLeads(leads.map((lead) =>
      lead.id === id ? { ...lead, status: newStatus2 } : lead
    ));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneNumberChange = (phone: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleAddLead = () => {
    debugger
    Swal.fire({
      title: 'הוספת ליד חדש',
      html:'<input id="swal-input1" class="swal2-input" placeholder="שם פרטי" >'+
        '<input id="swal-input2" class="swal2-input" placeholder="שם משפחה" >'+
        '<input id="swal-input3" class="swal2-input" placeholder="טלפון" >'+
        '<input id="swal-input4" class="swal2-input" placeholder="אמייל" >'+
        '<input id="swal-input5" class="swal2-input" placeholder="מקור הליד" >'+
        // '<input id="swal-input6" class="swal2-input" placeholder="תאריך יצירת הליד" >'+
        // '<input id="swal-input7" class="swal2-input" placeholder="תאריך פניה אחרונה" >'+
        '<input id="swal-input8" class="swal2-input" placeholder="שם העסק">'+
        '<input id="swal-input9" class="swal2-input" placeholder="טקסט חופשי" ">'+
          '<select id="swal-input10" class="swal2-select", >' +
        statusOptions.map(option => `<option value="${option}" class="${option === 'Not' ? 'default-option' : 'ליד חדש'}" ${option === 'לא טופל' ? 'selected' : ''  }>${option}</option>`).join('') +
        '</select>',
        
      focusConfirm: false,
      showCancelButton: true,

      preConfirm: () => {
        debugger
        const firstName = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastName = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLSelectElement).value ;
        const source = (document.getElementById('swal-input5') as HTMLInputElement).value;
        // const createdDate = (document.getElementById('swal-input6') as HTMLInputElement).value;
        // const lastContacted = (document.getElementById('swal-input7') as HTMLInputElement).value;
        const businessName = (document.getElementById('swal-input8') as HTMLInputElement).value;
        const freeText = (document.getElementById('swal-input9') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input10') as HTMLInputElement).value;

        if (!firstName || !lastName || !phone || !email || !source || !businessName || !freeText || !status) {
          Swal.showValidationMessage('אנא מלא את כל השדות');
          return null;
        }
  
        if (!validateEmail(email)) {
          Swal.showValidationMessage('כתובת האימייל לא תקינה');
          return null;
        }
  
        if (!handlePhoneNumberChange(phone)) {
          Swal.showValidationMessage('מס טלפון לא תקין');
          return null;
        }
  
        return {
          id:"",
          firstName: firstName,
          lastName: lastName,
          phone:phone,
          email: email,
          source: source,
          createdDate: new Date(),
          lastContacted: new Date(),
          businessName: businessName,
          freeText:freeText,
          notes: new Array<Notes>,
          status: status
        };
      }
    }).then((result) => {
      debugger
      console.log(result);
      
      if (result.isConfirmed && result.value) {
        
       
        
        Swal.fire('Success', 'הליד נוסף בהצלחה', 'success');
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

  const getStatusClass = (status: string) => {
    switch (status.trim()) {
      case 'ליד חדש':
        return 'First';
      case 'שיחה ראשונית':
        return 'InitialConversation';
      case 'פגישת איפיון':
        return 'characterization';
      case 'שליחת הצעת מחיר':
        return 'toSend';
      case 'נשלחה הצעת מחיר':
        return 'sent';
      case 'שיחת מעקב':
        return 'Tracking';
      case 'הוצאת חשבונית':
        return 'Invoicing';
      case 'העברה להקמה בפועל':
        return 'Creation';
      case 'נסגרה':
        return 'closed';
      default:
        return '';
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof filters) => {
     debugger
    setFilters({ ...filters, [key]: e.target.value });
  };

  const toggleFilterInput = (key: keyof typeof filterInputsVisible) => {
    setFilterInputsVisible({ ...filterInputsVisible, [key]: !filterInputsVisible[key] });
  };

  const filteredLeads = leads.filter(lead => {
    debugger
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; 
      debugger
      switch (key) {
        case 'שם פרטי':
          return lead.firstName.toLowerCase().includes(value.toLowerCase());
        case 'שם משפחה':
          return lead.lastName.includes(value);
        case 'אימייל':
          return lead.email.toLowerCase().includes(value.toLowerCase());
        case 'טלפון':
          return lead.phone.toLowerCase().includes(value.toLowerCase());
        case 'סטטוס':
          return lead.status.toLowerCase().includes(value.toLowerCase());
        case 'מקור הליד':
          return lead.source.toLowerCase().includes(value.toLowerCase());
        case 'תאריך יצירת הליד':
          return lead.createdDate.toLocaleDateString().includes(value);
        case 'תאריך פניה אחרונה':
          return lead.lastContacted.toLocaleDateString().includes(value);
        case 'שם העסק':
          return lead.businessName.toLowerCase().includes(value.toLowerCase());
        case 'טקסט חופשי':
          return lead.freeText.toLowerCase().includes(value.toLowerCase());
       // case 'הערות':
         // return lead.notes.toLowerCase().includes(value.toLowerCase());
        default:
          return true;
      }
    });
  });
  

  const handleActionToPerformChange = (id: string, newValue: string) => {
    
     const updatedLeads = modifiedLeads!.map((lead) =>
       lead.id === id ? { ...lead, ActionToPerform: newValue } : lead
     );
     setModifiedLeads(updatedLeads);

     const updatedIndex = modifiedLeads!.findIndex((l) => l.id === id);
            if (updatedIndex !== -1) {
              const updatedChanges = [...leadsChanges!]; 
              updatedChanges[updatedIndex] = true; 
              setLeadsChanges(updatedChanges);
            }

  };
  const handleChange=(id:string)=>{
    Swal.fire({
      title: "הכנס משימה לשינוי",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "change",
      showLoaderOnConfirm: true,
      preConfirm: async (action) => {
        try {
          debugger
          console.log(action);
          handleActionToPerformChange(id,action) 
          Swal.fire({
              title: "המשימה שונתה בהצלחה",
              icon: "success"      
          });
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }}
    })
      }

      const handleEditLead =()=>{
        const lead = leads.find((l) => l.id === selectedLeadId);
        if (!lead) {
          Swal.fire('שגיאה', 'הליד שנבחר לא נמצא', 'error');
          return;
        }
          Swal.fire({
            title: 'עריכת ליד',
            html: `
              <div>
                <input id="swal-input1" class="swal2-input" placeholder="שם פרטי" value="${lead.firstName}">
                <input id="swal-input2" class="swal2-input" placeholder="שם משפחה" value="${lead.lastName}">
                <input id="swal-input3" class="swal2-input" placeholder="טלפון" value="${lead.phone}">
                <input id="swal-input4" class="swal2-input" placeholder="אמייל" value="${lead.email}">
                <input id="swal-input5" class="swal2-input" placeholder="מקור הליד" value="${lead.source}">
                <input id="swal-input6" class="swal2-input" placeholder="תאריך יצירת הליד" value="${convertDateTimeToDate(lead.createdDate)}">
                <input id="swal-input7" class="swal2-input" placeholder="תאריך פניה אחרונה" value="${convertDateTimeToDate(lead.lastContacted)}">
                <input id="swal-input8" class="swal2-input" placeholder="שם העסק" value="${lead.businessName}">
                <input id="swal-input9" class="swal2-input" placeholder="טקסט חופשי" value="${lead.freeText}">
                 <select id="swal-input10" class="swal2-input class={getStatusClass(lead.Status2)}">
                  ${statusOptions.map ((status) => `<option value="${status}" ${lead.status === status ? 'selected' : ''}>${status}</option>`) }
                </select>
            `,
            focusConfirm: false,
            showCancelButton: true,
        
    
          preConfirm: () => {
            const firstName = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const lastName = (document.getElementById('swal-input2') as HTMLInputElement).value;
            const phone = (document.getElementById('swal-input3') as HTMLInputElement).value;
            const email = (document.getElementById('swal-input4') as HTMLSelectElement).value ;
            const source = (document.getElementById('swal-input5') as HTMLInputElement).value;
            const createdDate = (document.getElementById('swal-input6') as HTMLInputElement).value;
            const lastContacted = (document.getElementById('swal-input7') as HTMLInputElement).value;
            const businessName = (document.getElementById('swal-input8') as HTMLInputElement).value;
            const freeText = (document.getElementById('swal-input9') as HTMLInputElement).value;
            const status = (document.getElementById('swal-input10') as HTMLInputElement).value;

            if (!firstName || !lastName || !phone || !email || !source || !createdDate || !lastContacted || !businessName || !freeText || !status) {
              Swal.showValidationMessage('אנא מלא את כל השדות');
              return null;
            }
    
            if (!validateEmail(email)) {
              Swal.showValidationMessage('כתובת האימייל לא תקינה');
              return null;
            }
    
            if (!handlePhoneNumberChange(phone)) {
              Swal.showValidationMessage('מס טלפון לא תקין');
              return null;
            }
    
            return {
              firstName: firstName,
              lastName: lastName,
              phone:phone,
              email: email,
              source: source,
              createdDate: createdDate,
              lastContacted: lastContacted,
              businessName: businessName,
              freeText:freeText,
              ///notes:Array<Notes>,
              status: status
            };
          }
        }).then((result) => {
          debugger
          if (result.isConfirmed && result.value) {
            const updatedLead = result.value;
            // עדכון מערך modifiedLeads
            const updatedModifiedLeads = modifiedLeads!.map((l) => (l.id === lead.id ? updatedLead : l));
            setModifiedLeads(updatedModifiedLeads);
      
            // עדכון מערך leadsChanges באותו אינדקס
            const updatedIndex = modifiedLeads!.findIndex((l) => l.id === lead.id);
            if (updatedIndex !== -1) {
              const updatedChanges = [...leadsChanges!]; // עותק של leadsChanges
              updatedChanges[updatedIndex] = true; // עדכון ל-true במיקום המתאים
              setLeadsChanges(updatedChanges); // עדכון ערך המשתנה בסטייט
            }
      
            Swal.fire('Success', 'הליד עודכן בהצלחה', 'success');
          }
        });
      };

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };

      
  return (
    <div className="page-container">
      <div className="lead-management-container">
        <h1 className="lead-management-title">Lead Management</h1>
        <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          {/* <HiSearch style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="חיפוש..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ padding: '5px', width: '200px' }}
          /> */}
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {(['הערות','טקסט חופשי', 'שם העסק', 'תאריך פניה אחרונה', 'תאריך יצירת הליד', 'מקור הליד','סטטוס', 'אימייל', 'טלפון', 'שם משפחה', 'שם פרטי'] as const).map((col) => (
                  <th key={col}>
                    {col}
                    <button onClick={() => toggleFilterInput(col)} style={{ backgroundColor: "white", border: 0 }}><HiChevronDown />
                    </button>
                    <div style={{ display: "flex" }}>
                      {filterInputsVisible[col] && (
                        <input
                          type="text"
                          value={filters[col]}
                          onChange={(e) => handleFilterChange(e, col)}
                        />
                      )}
                    </div>
                  </th>
                ))}
                <th></th>
                {/* {currentUserType === 'Manager' && <th className="table-header">שינוי סטטוס</th>} */}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} onClick={() => setSelectedLeadId(lead.id)}>
                  <td
                    className="editable"
                    onClick={() => {
                      handleChange(lead.id)
                    }}
                  >
              </td>
              <td>{convertDateTimeToDate(lead.lastContacted)}</td>
                  <td>{convertDateTimeToDate(lead.createdDate)}</td>
                  <td>{lead.source}</td>
                  <td>{lead.businessName}</td>
                  <td>
                      <select
                        value={lead.id}
                        onChange={(e) => handleStatus2Change(lead.id, e.target.value)}
                        className={getStatusClass(lead.status)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className='select'>{status}</option>
                        ))}
                      </select>
                   
                  </td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.lastName}</td>
                  <td>{lead.firstName}</td>
                  <td>
                    {currentUserType === 'Manager' &&
                      <button
                        className={`circle-button ${selectedLeadId === lead.id ? 'clicked' : ''}`}
                        onClick={() => setSelectedLeadId(lead.id)}
                      ></button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <td colSpan={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#636363' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <button className="add-lead-button" onClick={handleAddLead} style={{ color: '#636363', backgroundColor: "white", border: 0 }}>
                +
                <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>להוספת ליד</span>
              </button>
            </div>
            {currentUserType === 'Manager' && selectedLeadId && (
              <div className="add-lead-button-container" style={{ display: 'flex', alignItems: 'center' }}>
                <button className="convert-lead-button" onClick={handleConvertLead} style={{ fontSize: 15, color: '#636363', backgroundColor: "white", border: 0 }}>→
                  <span className='add' style={{ fontSize: 15, color: '#636363' }}>המרת ליד ללקוח</span>
                </button>
              </div>
            )}
          {currentUserType === 'Manager' && selectedLeadId && (
              <div className="add-lead-button-container" style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
                <button className="convert-lead-button" onClick={handleEditLead} style={{ fontSize: 15, color: '#636363', backgroundColor: "white", border: 0 }}><GrUpdate />
                  <span className='add' style={{ fontSize: 15, color: '#636363' }}> עדכון ליד </span>
                </button>
              </div>
            )}
          </div>

        </td>


      </div>
    </div>
  );
};

export default Leads;
