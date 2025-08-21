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
            email:'osmond@test.com'
        };
    // Mocking the onclick function for the button
    const mockOnClick = vi.fn();
    // Get the button element by its text content (label)
  it('should render and display the correct button label', () => {

    // Render the Button component with the label prop and the mock onClick function
    render(<Modal teamMember={teamMember} />);

    const modalElement = screen.getByText('Osmond Test');  //sees if the name is correctly rendered
    // Assert that the button is in the document and displays the correct label
    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveTextContent('tester'); //sees if role is displayed properly
    expect(modalElement).toHaveTextContent('osmond@test.com');
  });

  it('should close when the close button is pressed', () => {

    // Render the Button component with the mock onClick function
    render(<Modal teamMember={teamMember} />);

    const modalElement = screen.getByText('Osmond Test');  // Use the 'label' variable for flexibility
    const closeButton = screen.getByText('Close')

    // Fire a click event on the button
    fireEvent.click(closeButton);

    // Assert that the onClick function was called once when the button is clicked
    expect(modalElement).toHaveBeenCalledTimes(1);  // Check if it was called exactly once
  });
});
