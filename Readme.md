# UsefulNodeTechniques

This application provides some useful techniques that come handy while working on a large project.

---
## Config file separation for dev and prod environments

The project uses the npm package: config that allows fetching the configurations based on the environment set in the machine where application is running. 

It contains files: development.json, production.json for getting configurations based on environment and some sensitive information that is set as environment variable in the machine kept in custom-environment-variables.json file. 

---
## Promisify example

In the utils folder, Promisify.js shows example to how to convert a function that accepts a callback to be called after an async task completes into a function that returns a promise and internally calls the callback using function.

---


---
## Author
Rahul Midha

rahul.midha31@gmail.com