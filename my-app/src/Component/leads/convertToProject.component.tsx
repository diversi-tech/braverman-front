import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { convertToProject, convertToCustomer } from '../../api/leads.api';
import { Project } from '../../model/project.model';
import { deleteLead } from '../../Redux/Leads/leadsAction';
import { Lead } from '../../model/leads.model';
import { Enum } from '../../model/enum.model';

interface ConvertLeadToProjectProps {
  lead: Lead;
  statusOptions2: Enum[];
  balanceStatusOptions: Enum[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  handleProjectAdded: (project: Project) => void;
}

const ConvertLeadToProject: React.FC<ConvertLeadToProjectProps> = ({ lead, statusOptions2, balanceStatusOptions, setLeads, handleProjectAdded }) => {
  const [formValues, setFormValues] = useState({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    businessName: lead.businessName,
    source: lead.source,
    totalPrice: 0,
    pricePaid: 0,
    urlDrive: '',
    urlFigma: '',
    urlWordpress: '',
    freeText: ''
  });
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, businessName, source, totalPrice, pricePaid, urlDrive, urlFigma, urlWordpress, freeText } = formValues;

    if (!firstName || !lastName || !email || !businessName || !source || !totalPrice || !pricePaid || !urlDrive || !urlFigma || !urlWordpress) {
      alert('יש למלא את כל השדות');
      return;
    }

    const selectedStatus = statusOptions2.find(status => status.key === "1");
    const selectedBalanceStatus = balanceStatusOptions.find(balanceStatus => balanceStatus.key === "4");

    const project : Project = {
      projectId: '',
      firstName,
      lastName,
      businessName,
      email,
      source,
      status: selectedStatus!,
      endDate: new Date(),
      balanceStatus: selectedBalanceStatus!,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalPrice: totalPrice,
      pricePaid: pricePaid,
      balance: totalPrice - pricePaid,
      tasks: [],
      credentials: [],
      urlWordpress,
      urlDrive,
      urlFigma,
      freeText,
      workLog: []
    };

    const response = await convertToProject(project);
    if (response.status === 200) {
      setLeads(leads => leads.filter((l) => l.id !== lead.id));
      dispatch(deleteLead(lead.id));
      const response2 = await convertToCustomer(lead.id);
      if (response2.status === 200) {
        handleProjectAdded(project);
      } else {
        console.log("fail");
      }
    } else {
      alert('שגיאה ביצירת הפרויקט');
    }
  };

  return (
    <div>
      <TextField
        label="שם פרטי"
        name="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="שם משפחה"
        name="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="אימייל"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="שם העסק"
        name="businessName"
        value={formValues.businessName}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="מקור הליד"
        name="source"
        value={formValues.source}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="מחיר כולל"
        name="totalPrice"
        value={formValues.totalPrice}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="מחיר ששולם"
        name="pricePaid"
        value={formValues.pricePaid}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="קישור דרייב"
        name="urlDrive"
        value={formValues.urlDrive}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="קישור פיגמה"
        name="urlFigma"
        value={formValues.urlFigma}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="קישור וורדפרס"
        name="urlWordpress"
        value={formValues.urlWordpress}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="טקסט חופשי"
        name="freeText"
        value={formValues.freeText}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <Button onClick={handleSubmit} color="primary">צור פרויקט</Button>
    </div>
  );
};

export default ConvertLeadToProject;
