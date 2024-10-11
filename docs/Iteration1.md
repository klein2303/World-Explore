# IT2810: Project 2 Frontend

## Table of content:

- [IT2810: Project 2 Frontend](#it2810-project-2-frontend)
  - [Table of content:](#table-of-content)
- [Decisions](#decisions)
  - [Testing](#testing)
    - [Snapshot Testing](#snapshot-testing)
    - [Unit Testing](#unit-testing)
    - [Functional Testing](#functional-testing)
    - [Mocking and Event Handling](#mocking-and-event-handling)
  - [Usage of Dev](#usage-of-dev)
  - [CSS modules](#css-modules)
  - [Design](#design)
  - [Accessibility](#accessibility)
    - [Semantic HTML and ARIA Attributes](#semantic-html-and-aria-attributes)
    - [Keyboard Navigation](#keyboard-navigation)
    - [Clear and Descriptive Labels](#clear-and-descriptive-labels)
    - [Focus Management](#focus-management)
    - [Consistent Navigation and Structure](#consistent-navigation-and-structure)
    - [Visual Design](#visual-design)
  - [Sustainability](#sustainability)
  - [Technicalities](#technicalities)
- [Future](#future)
  - [Database and Backend](#database-and-backend)
  - [Data Loading](#data-loading)
  - [Review](#review)
  - [Profile](#profile)
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

## Sustainability

Our application uses no videoes to lower data trafic as well as energy usage.In our next iteration, we aim to enhance the sustainability of our travel diary app by implementing energy-efficient design practices, such as prioritizing lightweight images and optimizing file sizes with formats like WEBP and AVIF to reduce data transfer and energy consumption. Additionally, we will explore incorporating dark mode and limited color schemes to decrease energy use. We strive to be more mindful about sustainable development practises in the next iteration.

## Technicalities

- The background color and image for the "Log in"- page cuts of on the bottom. How much it cuts of depends on the size of the screen.
- It is not possible to save a journal entry or view your actual saved countries yet. This is all mock data.
- It is not possible to view other user's journal entries yet.
- The box that appears when pressing the profile icon is missing shading and contrast to the rest of the page, which can be confusing.
- The user experience is the same when logged in or not logged in at the moment. In the future we will slightly differentiate these experiences.
- When creating a user it is only saved in local storage.
- When logging in, you will not be sent back to the home-page. You need to navigate to it by pressing on the logo. 

<!-- Write more here -->

# Future

Theres a few different things we haven't implemented yet which we will implement in iteration 2 or iteration 3. In iteration 1 only a visuall draft of the project has been made.

## Database and Backend

In iteration 2 we're going to implement a GrapgQL backend in Typescript and a database for saving of data. The database is going to contain the data from https://www.kaggle.com/datasets/nelgiriyewithana/countries-of-the-world-2023 and https://www.kaggle.com/datasets/hserdaraltan/countries-by-continent. To get the pictures we're thinking about finding an api. The database is also going to have profile data and journal data.

## Data Loading

In iteration 2 we're going to implement functionality for partial loading of data, so that not all the data is loaded in at the same time.

## Review

In iteration 2 we're thinking of implementing reviews in each country page, which are public journal entries. There's going to be added functionality so that user can create reviews in the country page and journal, and this review will be saved in the database and be visible in the country page.

## Profile

There's going to be added functionality for log in and register, so that the user only can access Explore Countries page and My Journals page when the user is logged in. The only page visible for not logged in users will be Home page.

# Usage of AI

We used AI to transform our divs into more suitable elements. We also used it for improving our tests.
