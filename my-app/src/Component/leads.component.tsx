import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { setUser } from '../Redux/userAction';
import { useNavigate } from 'react-router-dom';

const leadsData = [
  { id: 1, name: 'ruti ', email: 'r583209640@gmail.com', status: 'lead' },
  { id: 2, name: 'rhachel ', email: 'r@gmail.com', status: 'lead' },
];

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface LeadsProps {
  userType: string;
}

const Leads = () => {
  const role = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
  const navigate=useNavigate();
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  const currentUserType = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
  const dispatch = useDispatch();

  const handleStatusChange = (id: number) => {
    setLeads(leads.map(lead =>
      lead.id === id ? { ...lead, status: 'לקוח' } : lead
    ));
  };
  useEffect(() => {
    if (role !== "admin"&&role!=="worker") {
        navigate("/not-found");
    }
}, [role, navigate]);
  return (
    <>
    {role!=="customer"&&<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>קוד</TableCell>
            <TableCell>שם</TableCell>
            <TableCell>מייל</TableCell>
            <TableCell>סטטוס</TableCell>
            {currentUserType === 'admin' && <TableCell>שינוי סטטוס</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.id}</TableCell>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.status}</TableCell>
              {currentUserType === 'Manager' && (
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusChange(lead.id)}
                    disabled={lead.status === 'Customer'}
                  >
                    העברה למצב לקוח 
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  );
  
};

export default Leads;
