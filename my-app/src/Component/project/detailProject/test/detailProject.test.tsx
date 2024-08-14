import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Project } from "../../../../model/project.model";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import ProjectDetail, { convertDateTimeToDate } from '../detailProject.component';

const project: Project = {
  projectId: '1',
  firstName: 'John',
  lastName: 'Doe',
  businessName: 'JD Inc.',
  email: 'john.doe@example.com',
  source: 'Referral',
  address: '',
  phone:'',
  status: {
    id: "string",
    key: "string",
    value: "string"
  },
  endDate: new Date(),
  balanceStatus: {
    id: "string",
    key: "string",
    value: "string"
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  totalPrice: 1000,
  pricePaid: 500,
  balance: 500,
  stageStatus: {
    id: "string",
    key: "string",
    value: "string"
  },
  tasks: [],
  credentials: [],
  urlFigma: '',
  urlDrive: '',
  urlWordpress: '',
  freeText: 'stYut',
  workLog: [],
  projectType: '',
  
};

test('renders ProjectDetail component', () => {      
  render(
    <MemoryRouter> 
      <ProjectDetail project={project} />
    </MemoryRouter>
  );
  expect(screen.getByText(/פרטי הפרויקט/i)).toBeInTheDocument();
  expect(screen.getByText(/שולם: 500/i)).toBeInTheDocument();
});

test('convertDateTimeToDate function returns correct formatted date', () => {
    const testDate = new Date('2024-12-31T00:00:00Z');
    const formattedDate = convertDateTimeToDate(testDate);
  
    expect(formattedDate).toBe('31/12/2024');
  });

