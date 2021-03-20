# Sirate
Enhancing trust between communities and police

## Setup
 - Install Node.js
 - Install Docker
 - run ```npm install``` in directory (right now just backend) to download all dependencies
 - All backend work should be done in the **backend** directory and all frontend work should be done in the **frontend** directory

### Using the database:
 - install postgres locally on your machine
 - cd into **backend** directory
 - create a .env file and add the following credentials:
    - USER
    - DB
    - HOST
 - run ``` psql sirate < migrations.sql ```
