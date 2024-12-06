# IT2810: Project 2

## Virtual Machine link

Link to virtual machine: it2810-10.idi.ntnu.no/project2 

## Table of content:

- [About the project](#about-the-project)
- [Running the project](#running-the-project)
- [Running tests](#running-tests)
- [Running eslint](#running-eslint)

## About the project

Welcome to WorldExplore! This is a travel diary website where one can explore different countries, and write journal entries about them based on your own experience. The journals can be made public for other people to view, or just be your own private entries. This project is build based on Typescript and React, and uses HTML to create the website. Styling is done using CSS-modules.

When visiting the website you have the opportunity log in or create a user. You need to create a user or log in, in order to see the major functionalities of the website. 

In the Explore-Countries-page the user has the ability to browse through different countries in the world. The user can search for å spesific country, sort based on the names and filter by continents. The user also have the option to write a journal entry directly from this page, by pressing on the pencil for the specific country one wants to write an entry for. 

By clicking on a country card, one gets navigated to a country page where there's a picture of the country, some key facts and an information box. In addition to this, the user has the ability to write a journal entry for the country, or read other public entries. 

By navigating to the My Journals page, the user can browse through all their journals for different countries. By clicking on a journal, the user can read all of their journal entries for that country. A journal entry has a title, date, description, and rating, and a message that tells the user if the entry is public or not. One can also delete a journal entry if one wishes.

The website is also made mobile friendly, as it will adapt to the smaller screen if viewed on one.

## Running the project

To run the project, you need to have Node 22 installed. Clone the repository from git with `git clone https://git.ntnu.no/IT2810-H24/T10-Project-2.git`. Then navigate to the folder `frontend` by writing `cd frontend` in the terminal. Make sure you are located in the main branch when running the project. To ckeckout to the main branch you can run `git checkout main` in the terminal.

Then you need to create two files: `.env` and `.env.local` in the backend folder on root level, if they are not already there. Also make sure the content inside the files are correct.
<br />
<br />
In `.env` copy in this:

```
DATABASE_URL="postgresql://postgres@it2810-10.idi.ntnu.no:5432/worldexploredb?schema=public"
```

While in `.env.local` copy in this:

```
POSTGRES_USER=postgres
POSTGRES_HOST="it2810-10.idi.ntnu.no"
POSTGRES_PORT=5342
POSTGRES_PASSWORD=
POSTGRES_DB=worldexploredb
```

<br />

Lastly, make sure that App.tsx in the frontend-folder has the following uri:

``` typescript
uri: "http://it2810-10.idi.ntnu.no:3001/",
```

This will run the project via the backend on the virtual machine. You can also run the project locally through a local backend. If so, refer to [this guide](backend/README.md)

Now you need to install some npm components.
To do so, run the following commands in a terminal while inside the mentioned folder has the following uri: 




- `npm install`
- `npm install react-router-dom`
- `npm install react-icons`
- `npm install recoil`

Make sure you are connected to the NTNU VPN before runnning the project. 

Now run `npm run dev` in order to run the project

## Dummy user and dummy data

We have prepared a dummy user so you don't need to register a new user (although, feel free to do so): 

```
Email: john@gmail.com
Password: password
```

We have also prepared dummy data for some countries, i.e journal entries for some countries (John loves to travel). 

Specifically: Japan, Italy, Spain, France, Australia, Egypt, Angola, Afghanistan

## Running tests

In order to run the component tests first navigate to the correct folder as described under "Running the project". Then run the following command in the terminal:

`npm test`

To run the E2E tests with cypress you have to first start the frontend. If the frontend isn't connected to the backend VM you have to start backend too. Then you have to run the command:

```
npx cypress open
```

in the terminal. When a site pops up click on the E2E option, and then choose your preferred browser. Click on a spesific test to run it.

## Running eslint

In order to run eslint to check for issues and problems with the code, run the following command after navigating to the `frontend` folder:

`npm run lint`
