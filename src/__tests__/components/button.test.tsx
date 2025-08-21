import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { Button } from '../../components/Button'; 

describe("Button should render and work", () => {
    //adding label onto button
    const label = "Search";
    // Mocking the onclick function for the button
    const mockOnClick = vi.fn();
    // Get the button element by its text content (label)
  it('should render and display the correct button label', () => {

    // Render the Button component with the label prop and the mock onClick function
    render(<Button label={label} onClick={mockOnClick} selected={false}/>);

    const buttonElement = screen.getByText(label);  // Use the 'label' variable for flexibility
    // Assert that the button is in the document and displays the correct label
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);
  });

  it('should call the onClick function when clicked', () => {

    // Render the Button component with the mock onClick function
    render(<Button label={label} onClick={mockOnClick} selected={false} />);

    const buttonElement = screen.getByText(label);  // Use the 'label' variable for flexibility

    // Fire a click event on the button
    fireEvent.click(buttonElement);

    // Assert that the onClick function was called once when the button is clicked
    expect(mockOnClick).toHaveBeenCalledTimes(1);  // Check if it was called exactly once
  });

    it('should use the selected prop to change appearance', () => {

    // Test wrapper to manage selected state
    function TestWrapper(){
      const [selected, setSelected] = useState(false);

      function toggleSelected(){setSelected(prev => !prev)};

      return <Button label={label} onClick={toggleSelected} selected={selected} />;
    };

    // Render the Button component with the mock onClick function
    render(<TestWrapper/>);

    const buttonElement = screen.getByText(label);  // Use the 'label' variable for flexibility
    // Fire a click event on the button
    fireEvent.click(buttonElement);

    // Assert that the onClick function was called once when the button is clicked
    expect(buttonElement).toHaveClass('selected');  // Check if the className changed
  });
  
});
