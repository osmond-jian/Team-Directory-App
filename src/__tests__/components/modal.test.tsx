import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { Modal } from '../../components/Modal'; 

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

    const modalElement = screen.getByText('Osmond Test');  //sees if the name is correctly rendered
    // Assert that the button is in the document and displays the correct label
    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveTextContent('tester'); //sees if role is displayed properly
    expect(modalElement).toHaveTextContent('osmond@test.com');
  });

    it('should call closeModalState when the close button is pressed', () => {
    //mock the closeModal function
    const closeModalStateMock = jest.fn();

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
  const closeModalMock = jest.fn();

  beforeEach(() => {
    closeModalMock.mockClear();
  });

  it('should toggle edit mode, update input, and save changes', () => {
    render(<Modal teamMember={teamMember} modalState={true} closeModalState={closeModalMock} />);

    // 1. Verify initial display (no input)
    expect(screen.getByText('Osmond Test')).toBeInTheDocument();

    // 2. Click the "Edit" button for Name field
    const editNameButton = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(editNameButton);

    // 3. Input should appear with current value
    const nameInput = screen.getByDisplayValue('Osmond Test');
    expect(nameInput).toBeInTheDocument();

    // 4. Change the input value
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput).toHaveValue('New Name');

    // 5. Click the "Finish" button (the same button toggles label)
    const finishButton = screen.getByRole('button', { name: 'Finish' });
    fireEvent.click(finishButton);

    // 6. Input should disappear and new text should show
    expect(screen.queryByDisplayValue('New Name')).not.toBeInTheDocument();
    expect(screen.getByText('New Name')).toBeInTheDocument();
  });
});