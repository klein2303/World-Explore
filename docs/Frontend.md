# IT2810: Project 2 Frontend

## Table of content:

- [Decisions](#decisions)
  - [Testing](#testing)
  - [Usage of Dev](#usage-of-dev)
  - [CSS modules](#css-modules)
  - [Design](#design)
  - [Accessibility](#accessibility)
  - [Technicalities](#technicalities)
- [Future](#future)
- [Usage of AI](#usage-of-ai)

# Decisions

In this section follows descriptions of the choices we have made so far while developing "WorldExplore", for different aspects of the project.

## Testing

In this project, we are using Vitest with the React testing library to ensure all components and pages are properly tested. Every component and page has its own set of tests. We use different types of testing to cover functionality, interactions, and UI consistency.

### Snapshot Testing
We use snapshot tests across the project to keep track of any changes in the UI. This helps us ensure that the visual appearance of components and pages remains consistent and prevents unintended changes.

### Unit Testing
For unit testing, we use @testing-library/react to verify the individual behavior of components. These tests check that components render correctly, handle state updates, and interact with the DOM as expected. Unit tests ensure each component works properly in isolation.

### Functional Testing
Functional tests are also written with @testing-library/react to simulate real user interactions, such as clicking buttons, submitting forms, and toggling options. This allows us to confirm that the components respond correctly to user actions and that everything behaves as it should when integrated together.

### Mocking and Event Handling
We use Vitest's built-in mocking tools to simulate external functions and event handlers. This is particularly useful when testing components that rely on callbacks, such as form submissions or closing modals. By mocking these, we can focus on testing the component’s internal logic and ensure that events are handled properly.


## Usage of Dev

We decided to implement a "Dev" stage to ensure a stable production environment. This helps prevent pushing incomplete products to the main branch. By only merging into main when the entire product is finished, we maintain a cleaner codebase and reduce the risk of introducing bugs or unfinished features into the live version.

## CSS modules

For this project we chose to use CSS Modules instead of regular CSS because they make it easier to manage each component's styles and keep the code more organized.

## Design

We chose a simple and straightforward design with focus on functionality. Our goal was to create an app that's intuitive and easy to navigate. Despite its simplicity, the design remains aesthetically appealing and visually engaging.

## Accessibility

We are committed to making our website accessible to a broad range of users by following established accessibility best practices. Below are some of the steps we’ve taken to ensure the site is usable for everyone, including those who rely on assistive technologies.

### Semantic HTML and ARIA Attributes
We use semantic HTML elements, like `<main>`, `<section>`, and `<button>`, to help browsers and assistive technologies understand th structure of our pages. In addition, we’ve added ARIA (Accessible Rich Internet Applications) attributes where needed to provide extra context for users. For example:

- **aria-label** is used to clarify the purpose of buttons, links, and icons, especially when the visual text may not provide enough detail.
- **aria-pressed** is applied to interactive elements like the map pin icon, making it clear to users whether a country is marked as visited or not.
- **role** attributes define sections and groups of content, helping users who rely on screen readers to navigate more easily.

### Keyboard Navigation
While not all interactive elements on the site are fully keyboard accessible yet, most elements, such as the JournalEntryModal, CountryCardList and MyJournals are. This allows users who rely on keyboards to interact smoothly with those specific components. We are actively working to make the rest of the interactive elements keyboard-friendly in future iterations.

### Clear and Descriptive Labels
We provide descriptive labels for buttons and input fields, ensuring that users understand the function of each element without needing to rely solely on visual cues. For instance, the "Add new journal entry" button and the country card’s "Mark/Unmark as visited" icons have meaningful and clear labels.

### Focus Management
We aim to carefully manage focus states to improve navigation, particularly when opening and closing modals like the JournalEntryModal. When a modal opens, the user’s focus is moved directly to it, and when it closes, focus is returned to a logical point on the page, allowing for smoother interaction.

### Consistent Navigation and Structure
Our pages are designed with consistent navigation, making them easy to understand and explore. We use clear headings, well-structured links, and features like "Return to all journals" to help users find their way around the site without confusion.

### Visual Design
Icons and images are paired with descriptive alternative text, or are hidden from screen readers if they are not essential to understanding the content

## Technicalities

<!-- Write more here -->

# Future

<!-- Write more here -->

## Usage of AI

We used AI to transform our divs into more suitable elements. We also used it for improving our tests.
