import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './leads.css';
import { SlArrowDown } from "react-icons/sl";
import { HiChevronDown ,HiChevronRight,HiChevronLeft } from "react-icons/hi";
import { SlArrowUp } from "react-icons/sl";
import { GrUpdate } from "react-icons/gr";
import { addLead, convertToCustomer, getAllLeads, updateLeadChanges,filterByStatus,convertToProject, addNewNote } from '../../api/leads.api';
import { Lead } from '../../model/leads.model';
import { Notes } from '../../model/notes.model';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { setAllLeads,deleteLead,addLead2,updateLead } from '../../Redux/Leads/leadsAction';
import {Project} from '../../model/project.model'
import { getAllEnumFromServer } from '../../api/enum.api';
import { Enum } from '../../model/enum.model';
import { setAllStatusLeads } from '../../Redux/enum/statusLeadAction';
import { NoteColumn } from './note.component';
import ReactDOM from 'react-dom';
import UpdateLead from './updateLead.component';
import AddLeadForm from './addLead.component';



const Leads: React.FC = () => {

const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusOptions2, setStatusOptions2] = useState<Enum[]>([]);
  const [balanceStatusOptions, setBalanceStatusOptions] = useState<Enum[]>([]);
  const [statusOptions, setStatusOptions] = useState<Enum[]>([]);

 //עמודים
  const [page, setPage] = useState(0);
  const leadsPerPage = 7;
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  const [leadsChanges, setLeadsChanges] = useState<boolean[]>();
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
  const dispatch = useDispatch();
  const leadsState = useSelector((state: { leads: { allLeads: { [key: string]: Lead[] } } }) => state.leads);
  const leadStatus=useSelector((state: { statusLead: { allStatusLead: { [key: string]: Enum[] } } }) => state.statusLead);
  console.log("status",leadStatus,"leads",leadsState);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        console.log(leadsState.allLeads);
        if (leadsState.allLeads.length) {
          data = leadsState.allLeads;
        } else {
          const resAllLeads = await getAllLeads();
          data = resAllLeads.data.map((lead: any) => ({
            ...lead,
            createdDate: new Date(lead.createdDate),
            lastContacted: lead.lastContacted ? new Date(lead.lastContacted) : null,
          }));
          dispatch(setAllLeads(data));
        }
        setLeads(data);
        setLeadsChanges(new Array(data.length).fill(false));
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
    const fetchEnums = async () => {
      try {
        const statusEnums = await getAllEnumFromServer(3); 
        const balanceStatusEnums = await getAllEnumFromServer(2); 
       console.log(statusEnums);
       console.log(balanceStatusEnums);
        setStatusOptions2(statusEnums);
        setBalanceStatusOptions(balanceStatusEnums);
        
      } catch (error) {
        console.error('Error fetching enums:', error);
      }
    };

    const fetchStatusEnums = async () => {
      debugger
      try {
        let data ;
        console.log("Current status lead state:", leadStatus.allStatusLead);
        if (leadStatus.allStatusLead.length) {
          data = leadStatus.allStatusLead;
        } else {
          data = await getAllEnumFromServer(5);
        }
        console.log("Data to dispatch:", data); // בדוק את הנתונים לפני שליחתם
        dispatch(setAllStatusLeads(data));
        setStatusOptions(data);
        console.log("Updated status lead state:", leadStatus.allStatusLead);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
    fetchStatusEnums();fetchEnums(); fetchData();
  }, [dispatch]);
  
  //convert date
  const convertDateTimeToDate = (date:any) => {
  if (typeof date === 'string') 
    if (date.includes('-')) {
      date = new Date(date);
    } else {
      return date;
    }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}/${month}/${year}`;
};



const formatDateForInput = (date:any) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
 const userId= sessionStorage.getItem('userId')  
 const currentUserType=sessionStorage.getItem('userType') 
 console.log(currentUserType);
 

  const handleStatus2Change = (id: string, newStatus2: string) => {
    const updatedLeads = leads!.map((lead) =>
      lead.id === id ? { ...lead, status: newStatus2 } : lead
    );
    setLeads(updatedLeads);

    const updatedIndex = leads!.findIndex((l) => l.id === id);
           if (updatedIndex !== -1) {
             const updatedChanges = [...leadsChanges!]; 
             updatedChanges[updatedIndex] = true; 
             setLeadsChanges(updatedChanges);
           }
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
    Swal.fire({
      title: 'הוספת ליד חדש',
      html: '<div id="add-lead-container"></div>',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('add-lead-container');
        if (container) {
          ReactDOM.render(
            <AddLeadForm
              // open={true}
              leads={leads}
              setLeads={setLeads}
              handleLeadAdded={async (newLead: Lead) => {
                try {
                  const response = await addLead(newLead);
                  const addedLead = response.data;
                  addedLead.createdDate = new Date(addedLead.createdDate);
                  addedLead.lastContacted = new Date(addedLead.lastContacted);
                  setLeads([...leads, addedLead]);
                  dispatch(addLead2(addedLead));
                  Swal.fire('Success', 'הליד נוסף בהצלחה', 'success');
                } catch (error) {
                  Swal.fire('Error', 'שגיאה בהוספת הליד', 'error');
                }
              }}
            />,
            container
          );
        }
      },
    });
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    setPage((prevPage) => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, totalPages - 1);
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 0);
      } else {
        return prevPage;
      }
    });
  };

  // פונקציה להמרת ליד ללקוח
  const handleConvertLeadToProject = async () => {
    const result = await Swal.fire({
      title: 'האם אתה בטוח?',
      text: "האם אתה בטוח שאתה רוצה להמיר את הליד לפרויקט?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן!, המיר לפרויקט',
      cancelButtonText: 'ביטול',
      customClass: {
        confirmButton: 'button1',
        cancelButton: 'button1'
      }
    });
  
    if (result.isConfirmed) {
      const lead = leads.find(lead => lead.id === selectedLeadId);
  
      if (!lead) {
        Swal.fire('Error', 'לא נמצא ליד להמרה', 'error');
        return;
      }
  
      const { firstName, lastName, email, businessName, source } = lead;
  
      const { value: formValues } = await Swal.fire({
        title: 'יצירת פרויקט חדש',
        html: `
          <input id="swal-input1" class="swal2-input" value="${firstName}" placeholder="שם פרטי">
          <input id="swal-input2" class="swal2-input" value="${lastName}" placeholder="שם משפחה">
          <input id="swal-input3" class="swal2-input" value="${email}" placeholder="אימייל">
          <input id="swal-input4" class="swal2-input" value="${businessName}" placeholder="שם העסק">
          <input id="swal-input5" class="swal2-input" value="${source}" placeholder="מקור הליד">
          <input id="swal-input6" class="swal2-input" placeholder="מחיר כולל">
          <input id="swal-input7" class="swal2-input" placeholder="מחיר ששולם">
          <input id="swal-input8" class="swal2-input" placeholder="קישור דרייב">
          <input id="swal-input9" class="swal2-input" placeholder="קישור פיגמה">
          <input id="swal-input10" class="swal2-input" placeholder="קישור וורדפרס">
           <input id="swal-input11" class="swal2-input" placeholder="טקסט חופשי">

        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const firstName = (document.getElementById('swal-input1') as HTMLInputElement).value;
          const lastName = (document.getElementById('swal-input2') as HTMLInputElement).value;
          const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
          const businessName = (document.getElementById('swal-input4') as HTMLInputElement).value;
          const source = (document.getElementById('swal-input5') as HTMLInputElement).value;
          const totalPrice = (document.getElementById('swal-input6') as HTMLInputElement).value;
          const pricePaid = (document.getElementById('swal-input7') as HTMLInputElement).value;
          const urlDrive = (document.getElementById('swal-input8') as HTMLInputElement).value;
          const urlFigma = (document.getElementById('swal-input9') as HTMLInputElement).value;
          const urlWordpress = (document.getElementById('swal-input10') as HTMLInputElement).value;
          const freeText = (document.getElementById('swal-input11') as HTMLInputElement).value;
      
          if (!firstName || !lastName || !email || !businessName || !source || !totalPrice || !pricePaid || !urlDrive || !urlFigma || !urlWordpress) {
            Swal.showValidationMessage('יש למלא את כל השדות');
            return null;
          }
      
          return {
            firstName,
            lastName,
            email,
            businessName,
            source,
            totalPrice,
            pricePaid,
            urlDrive,
            urlFigma,
            urlWordpress,
            freeText

          };
        }
      });
      
      if (formValues) {
        const selectedStatus = statusOptions2.find(status => status.value === "TODO");
        const selectedBalanceStatus = balanceStatusOptions.find(balanceStatus => balanceStatus.value === "DUE");
      
        const project: Project = {
          projectId: '',
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          businessName: formValues.businessName,
          email: formValues.email,
          source: formValues.source,
          status: selectedStatus!,
          endDate: new Date(),
          balanceStatus: selectedBalanceStatus!,
          createdAt: new Date(),
          updatedAt: new Date(),
          totalPrice: formValues.totalPrice,
          pricePaid: formValues.pricePaid,
          balance: formValues.totalPrice - formValues.pricePaid,
          tasks: [],
          credentials: [],
          urlWordpress: formValues.urlWordpress,
          urlDrive: formValues.urlDrive,
          urlFigma: formValues.urlFigma,
          freeText: formValues.freeText
        };
      

          debugger
          const response = await convertToProject(project);
          if (response.status === 200) {
            console.log('New Project Created:', response.data);
            setLeads(leads.filter((lead) => lead.id !== selectedLeadId));
            dispatch(deleteLead(selectedLeadId!));
           const response2=await convertToCustomer(lead.id);
           if(response2.status===200){
             console.log("sucess");
           }
           else
           console.log("fail");         
            setSelectedLeadId(null);
            Swal.fire('Success', 'הפרויקט נוצר בהצלחה!', 'success');
          } else {
            Swal.fire('Error', ' שגיאה ביצירת הפרויקט ', 'error');
          }
        
      }
    }
  };
  
  
  const getStatusClass = (status: string) => {
    switch (status.trim()) {
      case 'ליד חדש':
        return 'First';
      case 'שיחה ראשונית':
        return 'InitialConversation';
      case 'פגישת אפיון':
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
      case 'נסגר':
        return 'closed';
      default:
        return '';
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof typeof filters) => {
    setFilters({ ...filters, [key]: e.target.value });
};

 const filterStatus =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof typeof filters) => {
  setFilters({ ...filters, [key]: e.target.value });
  console.log(e.target.value);
   filterByStatus(e.target.value).then
   ((response) => {
     if (response.status === 200) {
      setFilters({ ...filters, [key]: e.target.value }); 
      console.log(response.data);
     }
   })
   .catch((error) => {  
     console.log(error);
   });
 }
  const toggleFilterInput = (key: keyof typeof filterInputsVisible) => {
    setFilterInputsVisible({ ...filterInputsVisible, [key]: !filterInputsVisible[key] });
  };

  const filteredLeads = leads.filter(lead => {
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
          return value === '' || lead.status.toLowerCase() === value.toLowerCase();
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
   //   case 'הערות':
         // return lead.notes.toLowerCase().includes(value.toLowerCase());
        default:
          return true;
      }
    });
  });
  
  //change Action
  const handleActionToPerformChange = (id: string, newValue: string) => {
     const updatedLeads = leads!.map((lead) =>
       lead.id === id ? { ...lead, freeText: newValue } : lead
     );
     setLeads(updatedLeads);

     const updatedIndex = leads!.findIndex((l) => l.id === id);
            if (updatedIndex !== -1) {
              const updatedChanges = [...leadsChanges!]; 
              updatedChanges[updatedIndex] = true; 
              setLeadsChanges(updatedChanges);
            }

  };

  const filteredLeads2 = filteredLeads.slice(page * leadsPerPage, (page + 1) * leadsPerPage);

  const handleChange=(id:string)=>{
    Swal.fire({
      title: "הכנס טקסט חופשי",
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
              Swal.fire('Error', 'Selected lead not found', 'error');
              return;
            }
        
            Swal.fire({
              title: 'עריכת ליד',
              html: '<div id="update-lead-container"></div>',
              showCloseButton: true,
              showCancelButton: false,
              showConfirmButton: false,
              didOpen: () => {
                const container = document.getElementById('update-lead-container');
                if (container) {
                  ReactDOM.render(
                    <UpdateLead lead={lead} statusOptions={statusOptions} onUpdate={(updatedLead: Lead) => {
                      const updatedLeads = leads.map(l => l.id === updatedLead.id ? updatedLead : l);
                      setLeads(updatedLeads);
                      dispatch(updateLead(updatedLead));
                    }} />,
                    container
                  );
                }
              },
            });
          };
  

     const save= async()=>{
      debugger
      try {
        for (let i = 0; i < leadsChanges!.length; i++) {
          if (leadsChanges![i]) {
            const updatedLead = leads![i];
            const response = await updateLeadChanges(updatedLead,updatedLead.id);
            console.log(response);      
          }
        }
        Swal.fire('Success', 'שמירה בוצעה בהצלחה', 'success');
        setLeadsChanges(new Array<boolean>(leads.length).fill(false)); 
        console.log(leads);
        
        setLeads(leads!)
      } catch (error) {
        console.error('Error saving leads:', error);
        Swal.fire('Error', 'השמירה נכשלה', 'error');
      }
     }
     const addNote = (newNote: Notes) => {
      addNewNote(newNote).then(x=>{
        if(x.status===201){
          setLeads(leads.map(lead => 
            lead.id === newNote.leadId 
            ? { ...lead, notes: [...lead.notes, newNote] } 
            : lead
        ));
        }
        
       
      })
      .catch(x=>{
        console.log("error");
        
      })
      


  };

  
      
      
  return (
    <div className="page-container">
      <div className="lead-management-container">
        <h1 className="lead-management-title">Lead Management</h1>
        <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {(['הערות', 'שם העסק', 'תאריך פניה אחרונה', 'מקור הליד','סטטוס', 'אימייל', 'טלפון', 'שם משפחה', 'שם פרטי'] as const).map((col) => (
                  <th key={col}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {col}
                    <button onClick={() => toggleFilterInput(col)} style={{ backgroundColor: "white", border: 0 }}><HiChevronDown  style={{ marginTop:  "5px" , alignItems: "center" }}/>
                    </button>
                    </div>
                    <div style={{ display: "flex" }}>
                      
                    {filterInputsVisible[col] && (
                   col === 'סטטוס' ? (
                  <select
                 value={filters[col]}
                 onChange={(e) => filterStatus(e, col)}
                style={{ width: "100%" }}>
               <option value="">הכל</option> 
              {statusOptions.map(option => (
               <option key={option.key} value={option.value}>
               {option.value}
              </option>
             ))}
               </select>
                    ) : 
                        <input
                          type="text"
                          value={filters[col]}
                          onChange={(e) => handleFilterChange(e, col)}
                          style={{width:"100%"}}
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
              {filteredLeads2.map((lead) => (
                <tr key={lead.id} onClick={() => setSelectedLeadId(lead.id)}>
                  <td style={{width:'17%',alignItems:'right'}}>
                    <NoteColumn notes={lead.notes} leadId={lead.id} addNote={addNote} />
                  </td>
                  <td>{lead.businessName}</td>
                  <td>{convertDateTimeToDate(lead.lastContacted)}</td>
                  <td>{lead.source}</td>
                  <td>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatus2Change(lead.id, e.target.value)}
                        className={getStatusClass(lead.status)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status.key} value={status.value} className='select'>{status.value}</option>
                        ))}
                      </select>
                   
                  </td>
                  <td className='email'>{lead.email}</td>
                  <td className='phone'>{lead.phone}</td>
                  <td >{lead.lastName}</td>
                  <td >{lead.firstName}</td>

                  <td>
                    {currentUserType === 'admin' &&
                      <button
                        className={`circle-button ${selectedLeadId === lead.id ? 'clicked' : ''}`}
                        onClick={() => setSelectedLeadId(lead.id)}
                      ></button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot >
  <tr>
    <td colSpan={11} style={{ textAlign: 'right', padding: '7px 0', color: '#636363' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>    
        {currentUserType === 'admin' && selectedLeadId && (
          <button className="convert-lead-button" onClick={handleConvertLeadToProject}>
            →
            <span className='add' style={{ fontSize: 15, color: '#636363' }}>המרת ליד ללקוח</span>
          </button>
        )}
        { selectedLeadId && (
          <button className="convert-lead-button" onClick={handleEditLead}>
            <GrUpdate className="icon" />
            <span className='add' style={{ fontSize: 15, color: '#636363' }}>עדכון ליד</span>
          </button>
        )}
        <button className="add-lead-button" onClick={handleAddLead}>
          +
          <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>להוספת ליד</span>
        </button>
      </div>
    </td>
  </tr>
</tfoot>
          </table>
          </div>
        <div className="pagination">
        <button onClick={() => handlePageChange('next')} disabled={page === totalPages - 1} >
          <SlArrowDown className="icon" />
          </button>
          <button onClick={() => handlePageChange('prev')} disabled={page === 0}>
          <SlArrowUp className="icon"/>
          </button>
        </div>
        <button onClick={()=>save()} style={{}}>save</button>

      </div>
    </div>
  );
};

export default Leads;
