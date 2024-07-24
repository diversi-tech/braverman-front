import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { updateLeadChanges } from '../../api/leads.api';
import { Lead } from '../../model/leads.model';
import Swal from 'sweetalert2';
import { Enum } from '../../model/enum.model';

interface UpdateLeadProps {
  lead: Lead;
  statusOptions: Enum[];
  onUpdate: (updatedLead: Lead) => void;
}

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
      Swal.fire('Success', 'הליד עודכן בהצלחה', 'success');
    } catch (error) {
      Swal.fire('Error', 'עדכון הליד נכשל', 'error');
    }
  };

  return (
    <div>
      <TextField
        name="firstName"
        label="שם פרטי"
        value={formValues.firstName}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        name="lastName"
        label="שם משפחה"
        value={formValues.lastName}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        name="phone"
        label="טלפון"
        value={formValues.phone}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        name="email"
        label="אימייל"
        value={formValues.email}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        name="source"
        label="מקור הליד"
        value={formValues.source}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        name="businessName"
        label="שם העסק"
        value={formValues.businessName}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        name="freeText"
        label="טקסט חופשי"
        value={formValues.freeText}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>סטטוס</InputLabel>
        <Select
          name="status"
          value={formValues.status}
          onChange={handleChange2}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
         עדכון
      </Button>
    </div>
  );
};

export default UpdateLead;
