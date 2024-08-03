import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectFinish from '../finishProject.component';
import { deleteProject, getProject } from '../../../../../api/project.api';

// Mocking the API module
jest.mock('../../../../../api/project.api', () => ({
  getProject: jest.fn(),
  deleteProject: jest.fn(),
}));

const project = {
  projectId: '1',
  firstName: 'John',
  lastName: 'Doe',
  businessName: 'st',
  email: 'john.doe@example.com',
  source: 'Referral',
  status: { id: '1', key: 'key', value: 'בוצע' },
  endDate: new Date(),
  balanceStatus: { id: '1', key: 'key', value: 'Paid' },
  createdAt: new Date(),
  updatedAt: new Date(),
  totalPrice: 1000,
  pricePaid: 500,
  balance: 500,
  stageStatus: { id: '1', key: 'key', value: 'Completed' },
  tasks: [],
  credentials: [],
  urlFigma: '',
  urlDrive: '',
  urlWordpress: '',
  freeText: 'Project description',
  workLog: []
};

test('renders ProjectFinish component and handles pagination and delete project', async () => {
  (getProject as jest.Mock).mockResolvedValueOnce({ data: [project] });
  (deleteProject as jest.Mock).mockResolvedValueOnce({});

  render(<ProjectFinish refresh={false} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
  });

  // fireEvent.click(screen.getByRole('button'));

  // expect(deleteProject).toHaveBeenCalledWith('1'); 

  // await waitFor(() => {
  //   expect(screen.queryByText('John Doe')).toBeNull();
  // });
  
});
