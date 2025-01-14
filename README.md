This repository contains one of two projects from the subject IT2810 Web Development at NTNU. The course covers technologies and methods used in development of web-applications. Through the projects, we leared about architectures, languages, formats and standards for web-applications and how real-life projects at companies can be developed. Together with three other students, I made this project and another one, that can be found here: https://github.com/klein2303/Realstore

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

To run the project, you need to have Node 22 installed. In order to run the project locally, you need to have docker desktop installed. After docker is installed, continue with this guide:

Clone the repository from git with `git clone https://git.ntnu.no/IT2810-H24/T10-Project-2.git`. Then navigate to the folder `frontend` by writing `cd frontend` in the terminal. Make sure you are located in the main branch when running the project. To ckeckout to the main branch you can run `git checkout main` in the terminal.


### Setting up the backend

First you need to create two files: `.env` and `.env.local` inside the backend folder by navigating into it.

In `.env` paste in the following:

```
DATABASE_URL="postgresql://user:1234@localhost:5432/db?schema=public"
```

While in `.env.local` paste in the following:

```
POSTGRES_USER=user
POSTGRES_PASSWORD=1234
POSTGRES_DB=db
```

Now you have to run:

```
npm i
```

### Set up docker and schema: 

Start by running the following command in the terminal:

```
docker compose up --build -d
```

After that run the commands:

```
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init
```

`npx prisma db push` pushes the schema to the postgresql server.

### Filling in data/Updating data:

We can now fill inn some premade data. The same steps apply for updating the schema.

Run the following scripts, one by one:

For Windows:

```
node .\scripts\fixtures.cjs
node .\scripts\addReviews.cjs
```

For Mac/Unix-based:

```
node ./scripts/fixtures.cjs
node ./scripts/addReviews.cjs
```

Now run the commands in the terminal to update the schema:

```
npm run migrate
npx prisma db push
```

### Starting the application:

Now you need to install some npm components.
To do so, run the following commands in a terminal while inside the frontend folder: 

- `npm install`

Now run `npm run dev` in order to run the project!

To shut down docker you need to run the command:

```
docker compose down
```

## Visualising the database

To visualise the database download the extension PostgreSQL in VSCode. After you have done that click on the PostgreSQL icon in the menu. To add the database for this project click the `+` button. Writhe inn this information:

-   Hostname: localhost
-   User: user
-   Password: 1234
-   Port number: 5432
-   Click on the standard conenction
-   Then name the database worldexploreDB

To se any of the information in the databse right click on the database and choose `Select` and then click `Run Select Top 1000`


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
