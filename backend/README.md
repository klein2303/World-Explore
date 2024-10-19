
# Backend Setup

![alt text](public/image.png)

## Table of content
-   [Setting everything up](#setting-everything-up)
-   [Updating](#updating)
-   [Running Docker](#running-docker)
-   [Adding default data into the database](#adding-default-data-into-the-database)
-   [Visualising the database](#visualising-the-database)

#

## Setting everything up
Fist you need to create two files: `.env` and `.env.local` in the backend folder.
<br />
<br />
In `.env` copy in this:

```
DATABASE_URL="postgresql://user:1234@localhost:5432/db?schema=public"
```

While in `.env.local` copy in this:
```
POSTGRES_USER=user
POSTGRES_PASSWORD=1234
POSTGRES_DB=db
```

<br />

Now you have to run:
```
npm i
```
Then you need to download docker desktop. After docker desktop is downloaded, open up the docker desktop app. Then run the command:

```
docker compose up --build -d
```

in the terminal. After that run the commands:

```
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init
```

`npx prisma db push` pushes the schema to the postgresql server.

Now to run the Apollo server run the command:

```
npm start
```

in the terminal. 

## Updating

If you have done any changes to the schema run the command:

```
npm run migrate
npx prisma db push
``` 

in the terminal after you have stopped running the server.

## Running Docker
To run docker after the initial installation you have to run the command:

```
docker compose up -d
``` 

in the terminal. 
<br /><br />
To shut down docker you need to run the command: 

```
docker compose down
```

## Adding default data into the database
To add the default data into the database run the script fictures.cjs in the terminal like:
```
node .\scripts\fixtures.cjs
```
and remember to update

## Visualising the database
To visualise the database download the extension PostgreSQL in VSCode. After you have done that click on the PostgreSQL icon in the menu. To add the database for this project click the `+` button. Writhe inn this information:
-   Hostname: localhost
-   User: user
-   Password: 1234
-   Port number: 5432
-   Click on the standard conenction
-   Then name the database worldexploreDB

To se any of the information in the databse right click on the database and choose `Select` and then click `Run Select Top 1000`

