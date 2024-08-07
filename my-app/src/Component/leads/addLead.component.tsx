import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addLead } from  '../../api/leads.api';
import { addLead2 } from '../../Redux/Leads/leadsAction';
// import validateEmail from './leads.component';
// import handlePhoneNumberChange from './leads.component'
import { Lead } from '../../model/leads.model';
import store from '../../Redux/Store'
import './addLead.css'
import Rtl from '../rtl/rtl';


interface AddLeadFormProps {
    // open: boolean;
    // handleClose: () => void;
    leads: Lead[];
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    handleLeadAdded: (newLead: Lead) => Promise<void>;
  }
  const AddLeadForm: React.FC<AddLeadFormProps> = ({leads, setLeads, handleLeadAdded }) => {
    const [formValues, setFormValues] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      source: '',
      businessName: '',
      freeText: ''
    });
    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      freeText: '',
      source: ''
  });
  
  const leadSources = [
    'פרסום בגוגל',
    'פרסום ברשתות חברתיות',
    'המלצה מחברים',
    'המלצה מלקוחות',
    'חיפוש אקראי בגוגל',
    'היכרות אישית',
    'לקוח קיים',
    'פניות מהאתר',
    'פרסום בפרינט',
    'אחר'
  ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };
  const handlePhoneNumberChange = (phone: string) => {
      const regex = /^(\+972|0)([23489]\d{7,8}|5[0-9]\d{7})$/;
      return regex.test(phone);
};
    const validateFields = () => {
      debugger
      const newErrors = {
          firstName: formValues.firstName ? '' : 'שדה חובה',
          lastName: formValues.lastName ? '' : 'שדה חובה',
          email: validateEmail(formValues.email) ? '' : 'כתובת אימייל לא תקינה',
          phone: handlePhoneNumberChange(formValues.phone) ? '' : 'מספר טלפון לא תקין',
          businessName: formValues.businessName ? '' : 'שדה חובה',
          freeText: formValues.freeText ? '' : 'שדה חובה',
          source: formValues.source ? '' : 'שדה חובה',
      };
      setErrors(newErrors);

      return Object.values(newErrors).every(error => error === '');
  };
    const handleAddLead = async () => {
      debugger
      
        const { firstName, lastName, phone, email, source, businessName, freeText } = formValues;
        if (!validateFields()) {
          return;
      }
        if (!firstName || !lastName || !phone || !email || !source || !businessName || !freeText) {
          Swal.fire('Error', 'אנא מלא את כל השדות', 'error');
          return;
        }
    
        const newLead = {
          id: '',
          firstName,
          lastName,
          phone,
          email,
          source,
          createdDate: new Date(),
          lastContacted: new Date(),
          businessName,
          freeText,
          notes: [],
          status: 'ליד חדש'
        };
    
        try {
          debugger
          await handleLeadAdded(newLead); // Use the provided function to handle lead addition
        } catch (error) {
          Swal.fire('Error', 'שגיאה בהוספת הליד', 'error');
        }
      };
  return (
    <div>
        <Rtl>
        <TextField
           dir='rtl'
          sx={{ textAlign: 'right' , fontFamily: 'CustomFont',fontSize: '20px' }}
          inputProps={{style: {fontFamily: 'CustomFont'}}} 
          InputLabelProps={{style:  {fontFamily: 'CustomFont'}}} 
          className='textt'
          autoFocus
          margin="dense"
          name="firstName"
          label="שם פרטי"
          type="text"
          fullWidth
          multiline
          value={formValues.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}

        />
        <TextField
        inputProps={{style: {fontFamily: 'CustomFont'}}} 
        InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
          dir='rtl'
           sx={{ textAlign: 'right' }}
          className='textt'
          margin="dense"
          name="lastName"
          label="שם משפחה"
          type="text"
          fullWidth
          multiline
          value={formValues.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}

        />
        <TextField
        inputProps={{style: {fontFamily: 'CustomFont'}}} 
        InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
         dir='rtl'
          sx={{ textAlign: 'right' }}
         className='textt'
          margin="dense"
          name="phone"
          label="טלפון"
          type="text"
          fullWidth
          multiline
          value={formValues.phone}
          onChange={handleChange}
          // error={!!errors.phone}
          // helperText={errors.phone}

        />
        <TextField
        inputProps={{style: {fontFamily: 'CustomFont'}}} 
        InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
          dir='rtl'
          sx={{ textAlign: 'right' }}
          className='textt'
          margin="dense"
          name="email"
          label="אמייל"
          type="email"
          fullWidth
          multiline
          value={formValues.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
       


        <TextField
        inputProps={{style: {fontFamily: 'CustomFont'}}} 
        InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
         dir='rtl'
          sx={{ textAlign: 'right' }}
          className='textt'
          margin="dense"
          name="businessName"
          label="שם העסק"
          type="text"
          fullWidth
          multiline
          value={formValues.businessName}
          onChange={handleChange}
          error={!!errors.businessName}
          helperText={errors.businessName}
        />
        <TextField
        inputProps={{style: {fontFamily: 'CustomFont'}}} 
        InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
         dir='rtl'
          sx={{ textAlign: 'right',fontFamily:'CustomFont' }}
          className='textt'
          margin="dense"
          name="freeText"
          label="טקסט חופשי"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={formValues.freeText}
          onChange={handleChange}
          // error={!!errors.freeText}
          // helperText={errors.freeText}
        />

<FormControl fullWidth margin="dense">
          <InputLabel id="source-label" style={{ fontFamily: 'CustomFont' }}>מקור הליד</InputLabel>
          <Select
            labelId="source-label"
            id="source-select"
            name="source"
            value={formValues.source}
            onChange={handleChange}
            input={<OutlinedInput sx={{fontFamily: 'CustomFont'}} label="מקור הליד" />}
            sx={{ fontFamily: 'CustomFont' ,direction:'rtl'}}
          >
            {leadSources.map(option => (
              <MenuItem key={option} value={option} style={{direction:'rtl'}}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Rtl>
        <button onClick={handleAddLead}  className="btn-primary" style={{marginLeft:'33%',marginTop:'6px', marginBottom:'-6px'}}>
  <span className="button__text"> הוספת ליד</span>
  <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
</button>
        {/* <Button  color="primary">
        </Button> */}
        </div>
  );
};

export default AddLeadForm;
