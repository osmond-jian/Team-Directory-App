import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Modal } from '../../components/Modal'; 

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
    render(<Modal teamMember={teamMember} modalState={true} closeModalState={mockOnClick}/>);

    const modalElement = screen.getByTestId('modaltest');
    expect(modalElement).toBeInTheDocument(); //sees if the name is correctly rendered
    // Assert that the button is in the document and displays the correct label
    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveTextContent('tester'); //sees if role is displayed properly
    expect(modalElement).toHaveTextContent('osmond@test.com');
  });

    it('should call closeModalState when the close button is pressed', () => {
    //mock the closeModal function
    const closeModalStateMock = vi.fn();

    render(
        <Modal
        teamMember={teamMember}
        modalState={true}
        closeModalState={closeModalStateMock}
        />
    );

    const closeButton = screen.getByText('Close');

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

  it('should toggle edit mode, update input, and save changes', () => {
    render(<Modal teamMember={teamMember} modalState={true} closeModalState={closeModalMock} />);

    // 1. Verify initial display (no input)
    expect(screen.getByText('Osmond Test')).toBeInTheDocument();

    // 2. Click the "Edit" button for Name field
    const nameField = screen.getByText('Name:').parentElement; // get container div of the Name field
    const editButton = within(nameField!).getByText('Edit', { selector: 'button' });
    fireEvent.click(editButton);

    // 3. Input should appear with current value
    const nameInput = screen.getByDisplayValue('Osmond Test');
    expect(nameInput).toBeInTheDocument();

    // 4. Change the input value
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput).toHaveValue('New Name');

    // 5. Click the "Finish" button (the same button toggles label)
    fireEvent.click(editButton);

    // 6. Input should disappear and new text should show
    expect(screen.queryByDisplayValue('New Name')).not.toBeInTheDocument();
    expect(screen.getByText('New Name')).toBeInTheDocument();
  });
});