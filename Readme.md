# UsefulNodeTechniques

This application provides some useful techniques that come handy while working on a large project.

---
## Config file separation for dev and prod environments

The project uses the npm package: config that allows fetching the configurations based on the environment set in the machine where application is running. 

It contains files: development.json, production.json for getting configurations based on environment and some sensitive information that is set as environment variable in the machine kept in custom-environment-variables.json file. 

---
## Promisify example

In the utils folder, Promisify.js shows example to how to convert a function that accepts a callback to be called after an async task completes into a function that returns a promise and internally calls the callback using function.

You can test it by running: node utils/Promisify in terminal

---
## Alert user by email and on simple frontend when certain metric from database cross a value using WebSocket

A simple front end page can be opened on root path where we can see the sample list of orders in a tabular form. Whenever in a recent minute, the length of orders created reaches 10, a notification is displayed below the table and disappears after 20 seconds.

The interval for checking when the order length exceeds 10, can be changed in config folder configuration with key: broadcastInterval

The main code for this functionality is placed at startup/webSocketServer.js for server and public/js/webSocketClient.js for client.

For testing this functionality, we can create more than 10 orders in a minute using the api: 

POST /api/order/ and body data like:

{
    "order_id": 45744546645474,
    "order_status": "ordered"
}

---

## 


---
## Author
Rahul Midha

rahul.midha31@gmail.com