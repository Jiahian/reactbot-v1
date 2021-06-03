# Careerpedia - Career guidance website
Built with MERN (React.js, Express, Node.js, MongoDB) stack and includes a Google Dialogflow chatbot.

## General Info
repo name: reactbot-v1

Technologies: 
  - React 17.0.1
  - Node 13.6.0
  - Express 4.17.1
  - Mongoose 5.11.11
  - vis-react 0.5.1
  - Bootstrap 4

## Setup 
1.  You need to have these few accounts setup:
    * google dialogflow & google service account
    * MongoDB

2. Under ```config``` folder, create a new file ```dev.js```.
Write this code, and fill them in: 
```
module.exports = {
  googleProjectID: "",
  dialogFlowSessionID: "",
  dialogFlowSessionLanguageCode: "",
  googleClientEmail: "",
  googlePrivateKey: "",
  mongoURI: "",
};
```

3. Install it locally using npm: 
```
$ npm install
$ cd client
$ npm install
```

4. Run the project, ``` $npm run dev```.

## Features 
Created with 2 different users in mind: General User and Adminstrator.

General User:
* Explore careers with career pathways
* Career-tailored related course
* Ask Chatbot

Adminstrator: 
* Login & Signup
* Manage Career, Industry & Track
* Manage Career Pathways
* Manage Courses, Category & Subcategory 
