# Double Resource Mongo and Express API

## Overview
This application is a server with POST, GET, DELETE, and PUT functionality and utilizes MongoDB for storage

## Getting Started
- Clone this repository
- Ensure node.js is installed
    - If not, run the command `brew install node` in the terminal
- Ensure MongoDB is installed
    - If not, follow the instructions at [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- Navigate to the `/14-relationship-modeling/lab` directory and run the command `npm i` to install dependencies
- Create a .env file
    - Set `PORT` to `8080`
    - Set `MONGODB_URI` to `mongodb://localhost:27017/candymaker`
- Create a folder to store the database
- In the terminal, run the command `mongod --dbpath=[path to database folder]` to start the database server
- In a different terminal window, run the command `node index.js` to start the web server

## Testing Instructions
- Open up Postman
    - Postman can be downloaded at [https://www.getpostman.com/](https://www.getpostman.com/)

- To make a POST request:
    - Click on the dropdown and change it to POST
    - For manufacturer, type `localhost:8080/api/maker` in the address bar
    - For candy, type `localhost:8080/api/candy` in the address bar
    - Click on the Body tab and set it to raw
    - In the body, type a note in JSON with the following format:
        - For manufacturer: `{ "name": "[name]", "location": "[location]" }`
        - For candy: `{ "name": "[name]", "manufacturer": "[manufacturer id]" }`
    - Click Send

- To make a GET request:
    - Click on the dropdown and change it to GET
    - For manufacturer, type `localhost:8080/api/maker/:id` in the address bar
    - For candy, type `localhost:8080/api/candy/:id` in the address bar
    - For the manufacturer of the candy selected, type `localhost:8080/api/candy/:id/maker` in the address bar
    - For a list of candy manufactured by the manufacturer selected, type `localhost:8080/api/maker/:id/candy` in the address bar
    - Click Send

- To make a DELETE request:
    - Click on the dropdown and change it to DELETE
    - For manufacturer, type `localhost:8080/api/maker/:id` in the address bar
    - For candy, type `localhost:8080/api/candy/:id` in the address bar
    - Click Send

- To make a PUT request:
    - Click on the dropdown and change it to PUT
    - For manufactuer, type `localhost:8080/api/maker/:id` in the address bar
    - For candy, type `localhost:8080/api/candy/:id` in the address bar
    - Click on the Body tab and set it to raw
    - In the body, type a note in JSON with the following format:
        - For manufacturer: `{ "name": "[name]", "location": "[location]" }`
        - For candy: `{ "name": "[name]", "manufacturer": "[manufacturer id]" }`
    - Click Send