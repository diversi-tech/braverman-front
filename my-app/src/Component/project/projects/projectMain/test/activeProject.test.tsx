import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { deleteProject, getProject } from '../../../../../api/project.api';
import ActiveProjects from '../activeProject.component';

jest.mock('../../../../../api/project.api', () => ({
  getProject: jest.fn(),
  deleteProject: jest.fn()
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true })
}));

const mockStore = configureMockStore([thunk]);

describe('ActiveProjects Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      projectStatus: { allStatusProject: [] },
      Project: { allProject: [] }
    });

    jest.clearAllMocks();
  });

  test('renders loading indicator', () => {
    render(
      <Provider store={store}>
        <ActiveProjects onChangeStatus={() => {}} />
      </Provider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders projects table', async () => {
    (getProject as jest.Mock).mockResolvedValue({
      data: [
        {
          projectId: '1',
          businessName: 'Test Business',
          source: 'Test Source',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          status: { value: 'In Progress' }
        }
      ]
    });

    render(
      <Provider store={store}>
        <ActiveProjects onChangeStatus={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Business')).toBeInTheDocument();
    });
  });

  test('handles delete project', async () => {
    (deleteProject as jest.Mock).mockResolvedValue({});

    (getProject as jest.Mock).mockResolvedValue({
      data: [
        {
          projectId: '1',
          businessName: 'Test Business',
          source: 'Test Source',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          status: { value: 'In Progress' }
        }
      ]
    });

    render(
      <Provider store={store}>
        <ActiveProjects onChangeStatus={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Business')).toBeInTheDocument();
    });

    // Simulate the delete button click
    const deleteButton = screen.getByText('מחק'); // Adjust to match your button text
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteProject).toHaveBeenCalledWith('1');
    });
  });
});
