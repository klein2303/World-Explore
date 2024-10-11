# IT2810: Project 1

## Virtual Machine link

it2810-10.idi.ntnu.no/project2

## Table of content:

-   [About the project](#about-the-project)
-   [Running the project](#running-the-project)

## About the project

Welcome to WorldExplore! This is a travel diary website where one can explore different countries, and write journal entries about them based on your own experience. The journals can be made public for other people to view. This project is build based on Typescript and React, and uses HTML to create the website. Styling is done using CSS-modules.

In the Explore Countries page the user has the ability to search for å spesific country, sort based on the name and filter on continents. By clicking on a country card one gets navigated to a country page where there's a picture of the country, some key facts and a information box. In addition to this, the user has the ability to mark a country as visited. By navigating to the My Journals page, the user can se all their journal entries and read them. A journal entry has a title, date, description, and rating. The entry can also be made public.

In the future we're going to add logg in and register functionality so that journals and data is connected to a profile. Public journal entries are supposed to be shown as reviews in the country page. Each journal is categorised into written journals and non written journals. There is going to be a button inside each jounrnal to add an entry.

The website is also made mobile friendly, as it will adapt to the smaller screen if viewed on one.

## Running the project

To run the project, you need to have Node 22 installed. Clone the repository from git with `git clone https://git.ntnu.no/IT2810-H24/T10-Project-2.git`. Then navigate to the folder `frontend` by writing `cd frontend` in the terminal.

Now you need to install some npm components.
To do so, run the following commands in a terminal while inside the mentioned folder:

-   `npm install`
-   `npm install react-router-dom`
-   `npm install react-icons`

Now run `npm run dev` in order to run the project

## Running tests

In order to run the tests first navigate to the correct folder as described under "Running the project". Then run the following command in the terminal:

`npm test`

## Running eslint

In order to run eslint to check for issues and problems with the code, run the following command after navigating to the `frontend` folder:

`npm run lint`