import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JournalEntryModal from '../JournalEntryModal';
import styles from '../JournalEntryModal.module.css';

describe('JournalEntryModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    country: 'Norway',
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
  };

  // 1. Renders correctly when open
  it('renders correctly when open', () => {
    const { asFragment } = render(<JournalEntryModal {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // 2. Does not render when closed
  it('does not render when closed', () => {
    render(<JournalEntryModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // 3. Calls onClose when the close button is clicked
  it('calls onClose when the close button is clicked', () => {
    render(<JournalEntryModal {...defaultProps} />);
    const closeButton = screen.getByLabelText('Close modal');
    
    // Using fireEvent.click for better event control
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // 4. Calls onSubmit with the correct data when the form is submitted
  it('calls onSubmit with the correct data when the form is submitted', () => {
    render(<JournalEntryModal {...defaultProps} />);
    
    const titleInput = screen.getByLabelText('Title input');
    const dateInput = screen.getByLabelText('Date input');
    const textArea = screen.getByLabelText('Journal entry text area');
    const checkbox = screen.getByLabelText('Public checkbox');
    const submitButton = screen.getByLabelText('Submit journal entry');

    // Fill in the form fields using fireEvent for controlled form submission
    fireEvent.change(titleInput, { target: { value: 'My Trip to Norway' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(textArea, { target: { value: 'It was an amazing trip!' } });
    fireEvent.click(checkbox);  // Toggle checkbox for public
    fireEvent.click(submitButton);  // Submit the form

    // Expect the mock onSubmit function to be called with the correct arguments
    expect(mockOnSubmit).toHaveBeenCalledWith({
      country: 'Norway',
      reviews: [
        {
          id: expect.any(Number),
          title: 'My Trip to Norway',
          dato: '2023-01-01',
          rating: 0,  // Default rating since no rating was given
          text: 'It was an amazing trip!',
          public: true,  // Checkbox was checked
        },
      ],
    });
  });

  // 5. Allows the user to rate the trip
  it('allows the user to rate the trip', () => {
    render(<JournalEntryModal {...defaultProps} />);
    
    // Retrieve the star rating buttons
    const stars = screen.getAllByRole('button', { name: /Rate \d star/ });

    // Simulate clicking the 5th star
    fireEvent.click(stars[4]);

    // Check if the correct star has been selected
    expect(stars[4]).toHaveAttribute('aria-pressed', 'true');
    expect(stars[4]).toHaveClass(styles.starActive);  // Ensure it has the active class

    // Submit the form and check the rating in the onSubmit call
    const submitButton = screen.getByLabelText('Submit journal entry');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      country: 'Norway',
      reviews: [
        {
          id: expect.any(Number),
          title: '',  // Default title since it wasn't filled
          dato: '',   // Default date since it wasn't filled
          rating: 5,  // The rating after clicking the 5th star
          text: '',   // Default text since it wasn't filled
          public: false,  // Default checkbox state (unchecked)
        },
      ],
    });
  });
});
