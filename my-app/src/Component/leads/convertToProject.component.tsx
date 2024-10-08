import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { convertToProject, convertToCustomer } from '../../api/leads.api';
import { Project } from '../../model/project.model';
import { deleteLead } from '../../Redux/Leads/leadsAction';
import { Lead } from '../../model/leads.model';
import { Enum } from '../../model/enum.model';
import { Timer } from '../../model/Timer.model';
import Rtl from '../rtl/rtl';


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
    address:"",
    phone:"",
    totalPrice: 0,
    pricePaid: 0,
    urlDrive: '',
    urlFigma: '',
    urlWordpress: '',
    freeText: '',
    workLog: [],
    projectType: '',
  });
  const dispatch = useDispatch();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, businessName, source,address,phone, totalPrice, pricePaid, urlDrive, urlFigma, urlWordpress, freeText,projectType } = formValues;

    // if (!firstName || !lastName || !email || !businessName || !source || !totalPrice || !pricePaid || !urlDrive || !urlFigma || !urlWordpress) {
    //   alert('יש למלא את כל השדות');
    //   return;
    // }

    const selectedStatus = statusOptions2.find(status => status.key === "1");
    const selectedBalanceStatus = balanceStatusOptions.find(balanceStatus => balanceStatus.key === "4");


    const Project : Project = {
      projectType:'',
      projectId: '',
      firstName,
      lastName,
      businessName,
      email,
      source,
      address,
      phone,
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
      workLog: [],
      stageStatus: selectedStatus!,

    };

    const response = await convertToProject(Project);
    if (response.status === 200) {
      setLeads(leads => leads.filter((l) => l.id !== lead.id));
      dispatch(deleteLead(lead.id));
      const response2 = await convertToCustomer(lead.id);
      if (response2.status === 200) {
        handleProjectAdded(Project);
      } else {
        console.log("fail");
      }
    } else {
      alert('שגיאה ביצירת הפרויקט');
    }
  };
  const handleChange2 = (event: SelectChangeEvent<string>) => {    
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  return (
    <div>
      <Rtl>
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="שם פרטי"
        name="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="שם משפחה"
        name="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="אימייל"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="שם העסק"
        name="businessName"
        value={formValues.businessName}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
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
       <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="טלפון"
        name="phone"
        value={formValues.phone}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="מחיר כולל"
        name="totalPrice"
        value={formValues.totalPrice}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
          <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="סוג פרויקט"
        name="projectType"
        value={formValues.projectType}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="מחיר ששולם"
        name="pricePaid"
        value={formValues.pricePaid}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="קישור דרייב"
        name="urlDrive"
        value={formValues.urlDrive}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="קישור פיגמה"
        name="urlFigma"
        value={formValues.urlFigma}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="קישור וורדפרס"
        name="urlWordpress"
        value={formValues.urlWordpress}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
      inputProps={{style: {fontFamily: 'CustomFont'}}} 
      InputLabelProps={{style:  {fontFamily: 'CustomFont'}}}
        dir='rtl'
        label="טקסט חופשי"
        name="freeText"
        value={formValues.freeText}
        onChange={handleInputChange}
        fullWidth
        multiline
        margin="normal"
      />
      </Rtl>
      <Button onClick={handleSubmit} color="primary">צור פרויקט</Button>
    </div>
  );
};

export default ConvertLeadToProject;
