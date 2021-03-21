# Sirate
A platform allowing users to review and rate police stops to enhance trust between communities and police.

## Setup
 - Install Node.js
 - Install Docker
 - run ```npm install``` in backend directory to download all dependencies
 - All backend work should be done in the **backend** directory and all frontend work should be done in the **frontend** directory

## How to run:
- cd into backend directory
- run ``` nodemon app.js ```
- visit http://localhost:3000/ on your machine
- docker *will* be setup eventually so you can just run that container

### Using the database:
1. Using locally
   - install postgres locally on your machine
   - start the postgres server
   - cd into **backend** directory
   - create a .env file and add a postgres connection string in the form of: ```postgres://username:pword@localhost:5432/sirate```
   - import the migrations.sql file
2. Using docker
   - have docker installed
   - run shell command ``` bash db_start.sh ``` to setup your postgres container - this will automatically import the sql to run your database.
### Using redis:
Redis is needed for session storage
1. Using locally
   - install redis on your machine
   - start the redis server
2. Using docker
   - have docker installed
   - run ``` bash redis_start.sh ``` to setup the cotnainer
