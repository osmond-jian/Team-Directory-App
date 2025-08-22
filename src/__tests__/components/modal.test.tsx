import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../../components/Modal'; 
import { editTeamMembers } from '../../API/updateLocalStorageDatabase';

vi.mock('../../API/updateLocalStorageDatabase', () => ({
  editTeamMembers: vi.fn(),
  addTeamMember: vi.fn(),
}));

beforeAll(() => {
  // Polyfill the dialog element methods
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("Modal should render and work", () => {
    //adding label onto button
    const teamMember =
        {
            name:'Osmond Test',
            role:'tester',
            email:'osmond@test.com',
            picture:'',
            bio:''
        };
    // Mocking the onclick function for the button
    const mockOnClick = vi.fn();
    // Get the button element by its text content (label)
  it('should render and display the correct label', () => {

    // Render the Button component with the label prop and the mock onClick function
    render(<Modal teamMember={teamMember} modalState={true} closeModalState={mockOnClick} handleSearchRefresh={mockOnClick}/>);

    const modalElement = screen.getByTestId('modaltest');
    expect(modalElement).toBeInTheDocument(); //sees if the name is correctly rendered
    // Assert that the button is in the document and displays the correct label
    expect(modalElement).toBeInTheDocument();
    const nameInput = screen.getByDisplayValue('Osmond Test');
    expect(nameInput).toBeInTheDocument();
    const roleInput = screen.getByDisplayValue('tester');
    expect(roleInput).toBeInTheDocument();
    const emailInput = screen.getByDisplayValue('osmond@test.com');
    expect(emailInput).toBeInTheDocument();
  });

    it('should call closeModalState when the close button is pressed', () => {
    //mock the closeModal function
    const closeModalStateMock = vi.fn();

    render(
        <Modal
        teamMember={teamMember}
        modalState={true}
        closeModalState={closeModalStateMock}
        handleSearchRefresh={mockOnClick}
        />
    );

    const closeButton = screen.getByText('Cancel');

    // Click the close button
    fireEvent.click(closeButton);

    // Assert closeModalState callback was called once
    expect(closeModalStateMock).toHaveBeenCalledTimes(1);
    });
});


describe('Modal edit functionality', () => {
        const teamMember =
        {
            name:'Osmond Test',
            role:'tester',
            email:'osmond@test.com',
            picture:'',
            bio:''
        };
  const closeModalMock = vi.fn();

  beforeEach(() => {
    closeModalMock.mockClear();
  });


  it('should update name input and submit changes', () => {
    render(
      <Modal
        teamMember={teamMember}
        modalState={true}
        closeModalState={closeModalMock}
        handleSearchRefresh={closeModalMock}
      />
    );

    // 1. Find the name input and update it
    const nameInput = screen.getByLabelText(/name:/i); // Better than getByDisplayValue
    expect(nameInput).toHaveValue('Osmond Test');

    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput).toHaveValue('New Name');

    // 2. Submit the form
    // const form = screen.getByTestId('modalform'); // Add data-testid="modal-form" to the form
    const form = screen.getByTestId('modalform');
    fireEvent.submit(form); // ✅ This triggers the `handleSubmit` function

    // Now assert that internal update logic is triggered
    expect(editTeamMembers).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'osmond@test.com' }), // original
      expect.objectContaining({ name: 'New Name' }) // updated
    );
  });
});