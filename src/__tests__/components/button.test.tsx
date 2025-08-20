import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/button'; 

describe("Button should render and work", () => {
    //adding label onto button
    const label = "Search";
    // Mocking the onclick function for the button
    const mockOnClick = vi.fn();
  it('should render and display the correct button label', () => {

    // Render the Button component with the label prop and the mock onClick function
    render(<Button label={label} onClick={mockOnClick} />);

    // Get the button element by its text content (label)
    const buttonElement = screen.getByText(label);  // Use the 'label' variable for flexibility

    // Assert that the button is in the document and displays the correct label
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);
  });

  it('should call the onClick function when clicked', () => {

    // Render the Button component with the mock onClick function
    render(<Button label={label} onClick={mockOnClick} />);

    // Get the button element by its text content (label)
    const buttonElement = screen.getByText(label);

    // Fire a click event on the button
    fireEvent.click(buttonElement);

    // Assert that the onClick function was called once when the button is clicked
    expect(mockOnClick).toHaveBeenCalledTimes(1);  // Check if it was called exactly once
  });
});
