import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDetail from '../projectDetail.component';
import { Project } from "../../../../model/project.model";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

const project: Project = {
  projectId: '1',
  firstName: 'John',
  lastName: 'Doe',
  businessName: 'JD Inc.',
  email: 'john.doe@example.com',
  source: 'Referral',
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
  workLog: []
};

test('renders ProjectDetail component', () => {      
  render(
    <MemoryRouter> {/* Wrap your component with MemoryRouter */}
      <ProjectDetail project={project} />
    </MemoryRouter>
  );

  // Check for the business name
  expect(screen.getByText('stYut')).toBeInTheDocument(); 

  // Check for the project description text
  expect(screen.getByText(/תאור הפרויקט/i)).toBeInTheDocument();
});
