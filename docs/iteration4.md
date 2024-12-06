# Changes from previous iteration: 

We had some bugs from the previous iteration that we were aware of, that we have fixed. Furthermore, we received useful comments from the peer-reviews that we have worked on. The following changes were thus done: 

## Testing
- We made component tests for all components
- We added more E2E tests

## Features

- The user can now delete an entry they have written.
- It is possible to search among the journals in the My-Jorunals page
- The user now gets feedback whenever they successfully make a new entry
- The dark-mode button was previously not accessible with the keyboard, but this is now fixed 
- It is possible to go directly to a country's respective country-page from a journal page by pressing a button
- The Home-page got redesigned a bit according to feedback we received from peer-reviews. The "Start Now" button is not visible if the user is logged in, the text is bigger for mobile-version, and the arrow is clickable.
- According to Google lighthouse, we could enhance our accessibility by choosing a purple-colour with more contrast for darkmode. We have thus changed the purple-colour.

## Bugs

- There was an error with our custom 404-page not showing for "illegal sites". This is now fixed 
- When writing a new entry and uploading it, the modal didn't clear the old input if you wanted to write a new one. This is also fixed
- On the filters in the Explore-country page, there was an issue with the hovering-effect. This is also corrected.


# Technicalities: 

(Note that these are the final technicalities we have when delievering the final project)

- We wanted to make it possible for the user to edit their entries, but because of time crunch we didn't mangage to implement this
- We had intentions on adding more filtering options, but didn't have time. 
- The index.ts file in the backend in quite long. We wanted to split it into different files, but we got some issues when we tried to do so, which we unfortunately didn't have time to fix. Therefore, it is kept as one single file.
- There were some issues when trying to test the dark-mode button in the Navbar-component testfile. Because of this, the button is not tested in the component tests.
- We have used vitest for component tests, but there are some files were we used "vi.Mock". The project couldn't interpret "vi", and we couldn't figure out the problem. To fix this, we used "jest.Mock" instead. This is the only part were we used jest, and as you can see we still use vitest.
- We wanted to refactor the backend to use subscriptions for real-time updates, reducing polling, ensuring data consistency, and enhancing user experience. Unfortunately, we didn't have time to implement this.
- For Cypress E2E testing, we planned to use interception to avoid direct communication with the database. Unfortunately, due to time constraints, not all E2E tests have interception integrated. Specifically, the tests for login and register functionalities, lack interception.
- There are also some functionalities that haven't been testing since we didn't have time.
- We have noticed an issue were some webbrowser's UI-kit overwrites our CSS (specifically Safari and Firefox), which makes some parts of the application look different than intended. We were not able to figure out a solution for this problem. To clarify, most of the website looks as intended for these browsers, it is just some minor changes. The application looks as intended for Chrome.
