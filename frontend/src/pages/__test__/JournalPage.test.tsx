// JournalPage.test.tsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JournalPage from '../JournalPage';
import { useParams } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

// Mocking useParams to avoid actual route dependency
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useParams: vi.fn(),
    };
  });
  
  describe('JournalPage', () => {
    // Test with a countryName provided
    it('renders correctly with a countryName', () => {
      vi.mocked(useParams).mockReturnValue({ countryName: 'Japan' });
  
      const { asFragment } = render(
        <MemoryRouter>
          <JournalPage />
        </MemoryRouter>
      );
  
      // Check if the correct title is rendered using aria-label
      expect(screen.getByLabelText('Title')).toHaveTextContent(/My Japan journals/i);
      // Check if the add button is rendered using aria-label
      expect(screen.getByLabelText('Add new journal entry')).toBeInTheDocument();
      // Check if the return link is rendered using aria-label
      expect(screen.getByLabelText('Return to all journals')).toBeInTheDocument();
  
      // Snapshot test
      expect(asFragment()).toMatchSnapshot();
    });
  
    // Test without a countryName
    it('renders correctly without a countryName', () => {
      vi.mocked(useParams).mockReturnValue({ countryName: undefined });
  
      const { asFragment } = render(
        <MemoryRouter>
          <JournalPage />
        </MemoryRouter>
      );
  
      // Check if the default "My journals" title is rendered using aria-label
      expect(screen.getByLabelText('Title')).toHaveTextContent(/My journals/i);
      // Check if the add button is rendered using aria-label
      expect(screen.getByLabelText('Add new journal entry')).toBeInTheDocument();
      // Check if the return link is rendered using aria-label
      expect(screen.getByLabelText('Return to all journals')).toBeInTheDocument();
  
      // Snapshot test
      expect(asFragment()).toMatchSnapshot();
    });
  });