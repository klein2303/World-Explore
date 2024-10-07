import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, describe } from 'vitest';
import MyJournals from '../MyJournals';
import Countries from '../../data/Countries';

describe('MyJournals', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithRouter(<MyJournals />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct page title based on the active tab', () => {
    renderWithRouter(<MyJournals />);
    expect(screen.getByText('Captured Adventures')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Unwritten Adventures'));
    expect(screen.getByText('Places Yet to Journal')).toBeInTheDocument();
  });

  it('displays the correct subtitle based on the active tab', () => {
    renderWithRouter(<MyJournals />);
    expect(screen.getByText("Your travel stories, captured and cherished forever.")).toBeInTheDocument();

    fireEvent.click(screen.getByText('Unwritten Adventures'));
    expect(screen.getByText("You’ve visited, but the story’s still untold. Ready to write?")).toBeInTheDocument();
  });

  it('displays the correct content based on the active tab', () => {
    renderWithRouter(<MyJournals />);
    expect(screen.getByLabelText('Journal card for ' + Countries[0].name)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Unwritten Adventures'));
    expect(screen.getByLabelText('Journal card for ' + Countries[10].name)).toBeInTheDocument();
  });

  it('toggles the active tab correctly', () => {
    renderWithRouter(<MyJournals />);
    const journalsTab = screen.getByText('Journal Entries');
    const unwrittenTab = screen.getByText('Unwritten Adventures');

    expect(journalsTab).toHaveAttribute('aria-selected', 'true');
    expect(unwrittenTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(unwrittenTab);

    expect(journalsTab).toHaveAttribute('aria-selected', 'false');
    expect(unwrittenTab).toHaveAttribute('aria-selected', 'true');
  });
});