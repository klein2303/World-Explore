import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar Tests (Desktop)', () => {
    it('renders the navigation bar correctly', () => {
      // Render the component 
      const { asFragment } = render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
      );

      // Take a snapshot of the initial render
      expect(asFragment()).toMatchSnapshot();
  

      // Check if the navigation title is in the document
      expect(screen.getByText('WorldExplore')).toBeInTheDocument();

      // Check if the links are in the document
      expect(screen.getByText('Explore Countries')).toBeInTheDocument();
      expect(screen.getByText('My Journals')).toBeInTheDocument();
  
      // Check if the profile menu button is visible
      const profileMenuButton = screen.getByLabelText('Open Profile Menu');
      expect(profileMenuButton).toBeInTheDocument();
    });

  
    it('opens and closes the profile menu', () => {
        render(
            <MemoryRouter>
              <Navbar />
            </MemoryRouter>
          );
          
        // Fire event to open the menu
        const profileMenuButton = screen.getByLabelText('Open Profile Menu');
        fireEvent.click(profileMenuButton);
    
        // Expect the profile menu to be open and then close it
        const profileMenuButtonOpen = screen.getByLabelText('Close Profile Menu');
        expect(profileMenuButtonOpen).toBeInTheDocument();
        fireEvent.click(profileMenuButtonOpen);

        // Checks if it got closed
        const profileMenuButtonClosed = screen.getByLabelText('Open Profile Menu');
        expect(profileMenuButtonClosed).toBeInTheDocument();
    });
});


describe('Navbar Tests (Mobile)', () => {
    // Simulate a mobile screen size before each test
    beforeEach(() => {
        window.innerWidth = 375; 
        window.dispatchEvent(new Event('resize')); 
    });

    it('renders the mobile navigation bar correctly', () => {
        // Render the Navbar component inside a MemoryRouter
        const { asFragment } = render(
          <MemoryRouter>
            <Navbar/>
          </MemoryRouter>
        );

        // Take a snapshot of the initial mobile version render
        expect(asFragment()).toMatchSnapshot();

        // The hamburger menu button should be present on mobile screen
        const hamburgerMenuButton = screen.getByLabelText('Open Mobile Menu');
        expect(hamburgerMenuButton).toBeInTheDocument();
    });

    it('opens and closes the mobile navigation menu', () => {
        render(
            <MemoryRouter>
              <Navbar/>
            </MemoryRouter>
        );

        // Fire event to open the menu
        const menuButton = screen.getByLabelText('Open Mobile Menu');
        fireEvent.click(menuButton);

        // Checks if all the links are present
        expect(screen.getByText('Home')).toBeInTheDocument();
        screen.debug();
        expect(screen.getByLabelText('Explore Countries')).toBeInTheDocument();
        expect(screen.getByLabelText('My Journals')).toBeInTheDocument();
        expect(screen.getByText('Sign out')).toBeInTheDocument();
    
        // Expect the profile menu to be open and then close it
        const menuButtonOpen = screen.getByLabelText('Close Mobile Menu');
        expect(menuButtonOpen).toBeInTheDocument();


        // Closes the menu
        fireEvent.click(menuButtonOpen);

        // Checks if it got closed
        const menuButtonClosed = screen.getByLabelText('Open Mobile Menu');
        expect(menuButtonClosed).toBeInTheDocument();
    });
});