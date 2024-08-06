import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLeadChanges } from '../../api/leads.api';
import { Lead } from '../../model/leads.model';
import Swal from 'sweetalert2';
import { Enum } from '../../model/enum.model';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import Rtl from '../rtl/rtl';
import withReactContent from 'sweetalert2-react-content';
import './addLead.css'


interface UpdateLeadProps {
  lead: Lead;
  statusOptions: Enum[];
  onUpdate: (updatedLead: Lead) => void;
}
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

const UpdateLead: React.FC<UpdateLeadProps> = ({ lead, statusOptions, onUpdate }) => {
  const [formValues, setFormValues] = useState({
    firstName: lead.firstName,
    lastName: lead.lastName,
    phone: lead.phone,
    email: lead.email,
    source: lead.source,
    businessName: lead.businessName,
    freeText: lead.freeText,
    status: lead.status,
  });
  const MySwal = withReactContent(Swal);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name as string]: value });
  };

  const handleChange2 = (event: SelectChangeEvent<string>) => {    
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      const updatedLead = {
        ...lead,
        ...formValues,
      };
      await updateLeadChanges(updatedLead,updatedLead.id);
      onUpdate(updatedLead);
      MySwal.fire({
        title: 'success',
        text: 'הליד עודכן בהצלחה',
        icon: 'success',
        confirmButtonText: 'אישור',
        customClass: {
          confirmButton: 'my-confirm-button'
        }
      }); 
      // Swal.fire('Success', 'הליד עודכן בהצלחה', 'success');
    } catch (error) {
      Swal.fire('Error', 'עדכון הליד נכשל', 'error');
    }
  };
  
  return (
    <div>
       <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        name="firstName"
        label="שם פרטי"
        value={formValues.firstName}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      </Rtl>
      <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        name="lastName"
        label="שם משפחה"
        value={formValues.lastName}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      </Rtl>
      <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
         dir='rtl'
        name="phone"
        label="טלפון"
        value={formValues.phone}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      </Rtl>
      <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        name="email"
        label="אימייל"
        value={formValues.email}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      </Rtl>
     
      <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        name="businessName"
        label="שם העסק"
        value={formValues.businessName}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
    </Rtl>
    <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        name="freeText"
        label="טקסט חופשי"
        value={formValues.freeText}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      </Rtl>
      <Rtl>
      <FormControl fullWidth margin="dense">
          <InputLabel id="source-label" style={{ fontFamily: 'CustomFont' }}>מקור הליד</InputLabel>
          <Select
            labelId="source-label"
            id="source-select"
            name="source"
            value={formValues.source}
            onChange={handleChange2}
            input={<OutlinedInput sx={{fontFamily: 'CustomFont'}} label="מקור הליד" />}
            sx={{ fontFamily: 'CustomFont' ,direction:'rtl'}}
          >
            {leadSources.map(option => (
              <MenuItem key={option} value={option} style={{direction:'rtl'}}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Rtl>
      <Rtl>
      <FormControl fullWidth margin="normal">
        <InputLabel>סטטוס</InputLabel>
        <Select
          label="סטטוס"
          name="status"
          value={formValues.status}
          onChange={handleChange2}
          input={<OutlinedInput sx={{fontFamily: 'CustomFont'}} label="סטטוס" />}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status.value} value={status.value} sx={{fontFamily: 'CustomFont' ,direction: 'ltr'}}>
              {status.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Rtl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
         עדכון
      </Button>
    </div>
  );
};

export default UpdateLead;
