import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './leads.css';
import { HiChevronDown ,HiSearch } from "react-icons/hi";
import { GrUpdate } from "react-icons/gr";
import { addLead, convertToCustomer, getAllLeads, updateLeadChanges,filterByStatus,convertToProject } from '../../api/leads.api';
import { Lead } from '../../model/leads.model';
import { Notes } from '../../model/notes.model';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { setAllLeads,deleteLead,addLead2 } from '../../Redux/Leads/leadsAction';
import {Project} from '../../model/project.model'
import { getAllEnumFromServer } from '../../api/enum.api';
import { Enum } from '../../model/enum.model';
import { setAllStatusLeads } from '../../Redux/enum/statusLeadAction';
type NotesColumnProps = {
  notes: Notes[];
};

 //Notes
 const NotesColumn: React.FC<NotesColumnProps> = ({ notes }) => {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);


  const toggleNotes = () => {
    setShowAllNotes(!showAllNotes);
  }; 

  const toggleNoteDetails = (index: number) => {
    setSelectedNoteIndex(selectedNoteIndex === index ? null : index);
  };

  return (
    <div>
      <button onClick={toggleNotes} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        {showAllNotes ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
      </button>
      {showAllNotes && (
        <ul style={{ padding: '0', listStyle: 'none', margin: 0 }}>
          {notes.map((note: Notes, index: number) => (
            <li 
              key={index} 
              style={{ borderBottom: '1px solid #ccc', padding: '10px', cursor: 'pointer' }} 
              onClick={() => toggleNoteDetails(index)}
            >
              {note.content}
              {selectedNoteIndex === index && (
                <div style={{ marginTop: '10px' }}>
                  <p><strong>Creator:</strong> {note.createdBy}</p>
                  <p><strong>Due Date:</strong> </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
// const leadsData: Lead[] = [
//   { Id: 1, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'שיחה ראשונית', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 5, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'נקבעה פגישה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 2, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'נשלחה הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 3, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 4, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'ממתין למקדמה', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 6, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לשלוח הצעמ', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() },
//   { Id: 7, Name: 'ruti', Phone: '0583209640', Email: 'r583209640@gmail.com', Status: 'lead', Status2: 'לא טופל', BusinessName: 'cloth', LeadSource: 'shira', ActionToPerform: 'change color', Date: new Date() }];


const Leads: React.FC = () => {

const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusOptions2, setStatusOptions2] = useState<Enum[]>([]);
  const [balanceStatusOptions, setBalanceStatusOptions] = useState<Enum[]>([]);
  const [statusOptions, setStatusOptions] = useState<Enum[]>([]);

 //עמודים
  const [page, setPage] = useState(0);
  const leadsPerPage = 6;
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  // מערך לאחסון סטטוס השינויים של הלידים
  const [leadsChanges, setLeadsChanges] = useState<boolean[]>();
  // מערך לאחסון האובייקטים של הלידים ששונו
  // const [modifiedLeads, setModifiedLeads] = useState<Lead[]>();
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
  const leadStatus=useSelector((state: { statusLead: { allStatusLead: { [key: string]: Enum[] } } }) => state.statusLead.allStatusLead);
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
        // setModifiedLeads(data);
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
        let data;
        console.log(leadStatus.allStatusLead);
        if (leadsState.allLeads.length) {
          data = leadsState.allLeads;
        } else {
          const resAllLeads = await getAllEnumFromServer(5);
          dispatch(setAllStatusLeads(resAllLeads));
          debugger
          setAllStatusLeads(resAllLeads);

        }
        debugger
        console.log(leadStatus.allStatusLead);
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

  const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  const currentUserType = 'Manager';
    

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
    debugger
    Swal.fire({
      title: 'הוספת ליד חדש',
      html:'<input id="swal-input1" class="swal2-input" placeholder="שם פרטי" >'+
        '<input id="swal-input2" class="swal2-input" placeholder="שם משפחה" >'+
        '<input id="swal-input3" class="swal2-input" placeholder="טלפון" >'+
        '<input id="swal-input4" class="swal2-input" placeholder="אמייל" >'+
        '<input id="swal-input5" class="swal2-input" placeholder="מקור הליד" >'+
        '<input id="swal-input8" class="swal2-input" placeholder="שם העסק">'+
        '<textarea id="swal-input9" class="swal2-input" placeholder="טקסט חופשי"></textarea>',
        focusConfirm: false,
      showCancelButton: true,

      preConfirm: () => {
        debugger
        const firstName = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastName = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLSelectElement).value ;
        const source = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const businessName = (document.getElementById('swal-input8') as HTMLInputElement).value;
        const freeText = (document.getElementById('swal-input9') as HTMLInputElement).value;

        if (!firstName || !lastName || !phone || !email || !source || !businessName || !freeText ) {
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
          createdDate: new Date().toISOString(),
          lastContacted: new Date().toISOString(),
          businessName: businessName,
          freeText:freeText,
          notes: new Array<Notes>,
          status: 'ליד חדש'
        };
      }
    }).then(async (result) => {
      debugger
      console.log(result);
      
      if (result.isConfirmed && result.value) {

        try {
        const response =await addLead(result.value)
        const newLead = response.data;
        newLead.createdDate = new Date(newLead.createdDate);
        newLead.lastContacted = new Date(newLead.lastContacted);
        setLeads([...leads!, newLead]);
        setLeads([...leads, newLead]);
        dispatch(addLead2(newLead))  
        Swal.fire('Success', 'הליד נוסף בהצלחה', 'success');
      }

      catch(error){
        Swal.fire("error", 'שגיאה בהוספת הליד', 'error');

      }
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
        `,
        // <select id="swal-input11" class="swal2-input">
        //     ${statusOptions2.map(
        //       (status) =>
        //         `<option value="${status.key}">${status.value}</option>`
        //     ).join('')}
        //   </select>
        //   <select id="swal-input12" class="swal2-input">
        //     ${balanceStatusOptions.map(
        //       (balanceStatus) =>
        //         `<option value="${balanceStatus.key}">${balanceStatus.value}</option>`
        //     ).join('')}
        //   </select>
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return {
            firstName: (document.getElementById('swal-input1') as HTMLInputElement).value,
            lastName: (document.getElementById('swal-input2') as HTMLInputElement).value,
            email: (document.getElementById('swal-input3') as HTMLInputElement).value,
            businessName: (document.getElementById('swal-input4') as HTMLInputElement).value,
            source: (document.getElementById('swal-input5') as HTMLInputElement).value,
            totalPrice: parseFloat((document.getElementById('swal-input6') as HTMLInputElement).value),
            pricePaid: parseFloat((document.getElementById('swal-input7') as HTMLInputElement).value),
            urlDrive: (document.getElementById('swal-input8') as HTMLInputElement).value,
            urlFigma: (document.getElementById('swal-input9') as HTMLInputElement).value,
            UrlWordpress: (document.getElementById('swal-input10') as HTMLInputElement).value,
            // statusKey: ((document.getElementById('swal-input11') as HTMLSelectElement).value),
            // balanceStatusKey: ((document.getElementById('swal-input12') as HTMLSelectElement).value)
          };
        }
      });
  
      if (formValues) {
        debugger
        const selectedStatus = statusOptions2.find(status => status.value === "TODO");
        const selectedBalanceStatus = balanceStatusOptions.find(balanceStatus => balanceStatus.value === "DUE");
        console.log(selectedBalanceStatus);
        console.log(selectedStatus);
        
        
        const defaultEnum = { id: '', key: "", value: '' };
  
        const project: Project = {
          ProjectId: '',
          FirstName: formValues.firstName,
          LastName: formValues.lastName,
          BusinessName: formValues.businessName,
          Email: formValues.email,
          Source: formValues.source,
          Status:  selectedStatus!,
          EndDate: new Date(),
          BalanceStatus: selectedBalanceStatus!,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
          TotalPrice: formValues.totalPrice,
          PricePaid: formValues.pricePaid,
          _balance: formValues.totalPrice - formValues.pricePaid,
          Tasks: [],
          Credentials: [],
          UrlWordpress: formValues.UrlWordpress,
          UrlDrive: formValues.urlDrive,
          UrlFigma: formValues.urlFigma
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
        console.log(currentUser);
        
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
                <input id="swal-input7" class="swal2-input" type="date" placeholder="תאריך פניה אחרונה" value="${formatDateForInput(lead.lastContacted)}">
                <input id="swal-input8" class="swal2-input" placeholder="שם העסק" value="${lead.businessName}">
                 <input id="swal-input9" class="swal2-input" placeholder="טקסט חופשי" value="${lead.freeText}">
                 <select id="swal-input10" class="swal2-input class={getStatusClass(lead.Status2)}">
                  ${statusOptions.map ((status) => `<option value="${status.value}" 'selected' : ''}>${status.value}</option>`) }
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
            const lastContacted = (document.getElementById('swal-input7') as HTMLInputElement).value;
            const businessName = (document.getElementById('swal-input8') as HTMLInputElement).value;
            const freeText = (document.getElementById('swal-input9') as HTMLInputElement).value;
            const status = (document.getElementById('swal-input10') as HTMLInputElement).value;

            if (!firstName || !lastName || !phone || !email || !source  || !lastContacted || !businessName || !freeText || !status) {
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
              id: lead.id,
              firstName: firstName,
              lastName: lastName,
              phone:phone,
              email: email,
              source: source,
              createdDate: lead.createdDate,
              lastContacted: convertDateTimeToDate(lastContacted),
              businessName: businessName,
              freeText:freeText,
              notes:lead.notes,
              status: status
            };
          }
        }).then((result) => {
          debugger
          if (result.isConfirmed && result.value) {
            const updatedLead = result.value;
            const updatedModifiedLeads = leads!.map((l) => (l.id === lead.id ? updatedLead : l));
            setLeads(updatedModifiedLeads);
      
            const updatedIndex = leads!.findIndex((l) => l.id === lead.id);
            if (updatedIndex !== -1) {
              const updatedChanges = [...leadsChanges!]; 
              updatedChanges[updatedIndex] = true;
              setLeadsChanges(updatedChanges);
            }
      
            Swal.fire('Success', 'הליד עודכן בהצלחה', 'success');
          }
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
                {(['הערות','טקסט חופשי', 'שם העסק', 'תאריך פניה אחרונה', 'תאריך יצירת הליד', 'מקור הליד','סטטוס', 'אימייל', 'טלפון', 'שם משפחה', 'שם פרטי'] as const).map((col) => (
                  <th key={col}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {col}
                    <button onClick={() => toggleFilterInput(col)} style={{ backgroundColor: "white", border: 0 ,}}><HiChevronDown  style={{ marginTop:  "5px" , alignItems: "center" }}/>
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
              {filteredLeads.map((lead) => (
                <tr key={lead.id} onClick={() => setSelectedLeadId(lead.id)}>
                  <td>
                    <NotesColumn notes={lead.notes} />
                  </td>
                  <td
                    className="editable"
                    onClick={() => {
                      handleChange(lead.id)
                    }}
                  >
                    {lead.freeText}
              </td>
                  <td>{lead.businessName}</td>
                  <td>{convertDateTimeToDate(lead.lastContacted)}</td>
                  <td>{convertDateTimeToDate(lead.createdDate)}</td>
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
        <td 
        colSpan={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#636363' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <button className="add-lead-button" onClick={handleAddLead} style={{ color: '#636363', backgroundColor: "white", border: 0 }}>
                +
                <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>להוספת ליד</span>
              </button>
            </div>
            {currentUserType === 'Manager' && selectedLeadId && (
              <div className="add-lead-button-container" style={{ display: 'flex', alignItems: 'center' }}>
                <button className="convert-lead-button" onClick={handleConvertLeadToProject} style={{ fontSize: 15, color: '#636363', backgroundColor: "white", border: 0 }}>→
                  <span className='add' style={{ fontSize: 15, color: '#636363' }}>המרת ליד ללקוח</span>
                </button>
              </div>
            )}
          { currentUser && selectedLeadId && (
              <div className="add-lead-button-container" style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
                <button className="convert-lead-button" onClick={handleEditLead} style={{ fontSize: 15, color: '#636363', backgroundColor: "white", border: 0 }}><GrUpdate />
                  <span className='add' style={{ fontSize: 15, color: '#636363' }}> עדכון ליד </span>
                </button>
              </div>
            )}
          </div>

        </td>

    <button onClick={()=>save()}>save</button>
      </div>
    </div>
  );
};

export default Leads;
