
# Backend Setup

![alt text](public/image.png)

## Table of content
-   [Setting everything up](#setting-everything-up)
-   [Running Docker](#running-docker)
-   [Visualising the database](#visualising-the-database)

#

## Setting everything up
The first thing you need to do is run `npm i`. The you need to download docker desktop. After docker desktop is downloaded, open up the docker desktop app. Then run the command `docker compose up --build -d` in the terminal. After that run the commands:
- `npx prisma generate`
- `npx prisma db push` (this pushes the schema to the postgresql server)  

To run the Apollo server run the command `npm start` in the terminal. If you have done any changes to the schema run the command `npm run migrate` in the terminal.

## Running Docker
To run docker after the initial installation you have to run the command `docker compose up -d` in the terminal. To stup down docker you need to run the command `docker compose down`

## Visualising the database
To visualise the database download the extension PostgreSQL in VSCode. After you have done that click on the PostgreSQL icon in the menu. To add the database for this project click the `+` button. Writhe inn this information:
- Hostname: localhost
- User: user
- Password: 1234
- Port number: 5432
- Click on the standard conenction
- Then name the database worldexploreDB
To se any of the information in the databse right click on the database and choose `Select` and then click `Run Select Top 1000`

