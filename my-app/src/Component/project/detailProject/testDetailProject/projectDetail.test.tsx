import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDetail from '../projectDetail.component';
import { Project } from "../../../../model/project.model";
  const project: Project = {
    projectId: '1',
    firstName: 'John',
    lastName: 'Doe',
    businessName: 'JD Inc.',
    email: 'john.doe@example.com',
    source: 'Referral',
    status: {
        id:"string",
        key:"string",
        value:"string" 
    },
    endDate: new Date(),
    balanceStatus:  {
        id:"string",
        key:"string",
        value:"string" 
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    totalPrice: 1000,
    pricePaid: 500,
    balance: 500,
    stageStatus: {
        id:"string",
        key:"string",
        value:"string" 
    },
    tasks: [],
    credentials: [],
    urlFigma: '',
    urlDrive: '',
    urlWordpress: '',
    freeText: '',
    workLog: []
  };

test('renders AnyDeskChecker component', () => {
  render(<ProjectDetail project={project} />);
  const projectDetailText = screen.getByText(/תאור הפרויקט/i);
  expect(projectDetailText).toBeInTheDocument();
});
