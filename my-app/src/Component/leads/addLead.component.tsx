import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addLead } from  '../../api/leads.api';
import { addLead2 } from '../../Redux/Leads/leadsAction';
import validateEmail from './leads.component';
import handlePhoneNumberChange from './leads.component'
import { Lead } from '../../model/leads.model';
import store from '../../Redux/Store'

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
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };
  
    const handleAddLead = async () => {
        const { firstName, lastName, phone, email, source, businessName, freeText } = formValues;
    
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
          await handleLeadAdded(newLead); // Use the provided function to handle lead addition
        } catch (error) {
          Swal.fire('Error', 'שגיאה בהוספת הליד', 'error');
        }
      };
  return (
    <div>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="שם פרטי"
          type="text"
          fullWidth
          value={formValues.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="שם משפחה"
          type="text"
          fullWidth
          value={formValues.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="טלפון"
          type="text"
          fullWidth
          value={formValues.phone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="אמייל"
          type="email"
          fullWidth
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="source"
          label="מקור הליד"
          type="text"
          fullWidth
          value={formValues.source}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="businessName"
          label="שם העסק"
          type="text"
          fullWidth
          value={formValues.businessName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="freeText"
          label="טקסט חופשי"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={formValues.freeText}
          onChange={handleChange}
        />
        <Button onClick={handleAddLead} color="primary">
          הוסף ליד
        </Button>
        </div>
  );
};

export default AddLeadForm;
