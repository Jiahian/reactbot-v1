# Careerpedia - Career guidance website
Built with MERN (React.js, Express, Node.js, MongoDB) stack and includes a Google Dialogflow chatbot.

The project was created to help others to view their career pathways and recommend career-tailored courses. Some of the online resources used were based on [SkillsFramework](https://www.skillsfuture.gov.sg/skills-framework) from Singapore SkillsFuture. 
## Content 
* [General Info](#general-info)
* [Objectives & Features Implemented](#objectives-and-features-implemented)
* [Setup](#setup)

## General Info
repo name: reactbot-v1

Technologies: 
  - React 17.0.1
  - Node 13.6.0
  - Express 4.17.1
  - Mongoose 5.11.11
  - vis-react 0.5.1
  - Bootstrap 4

## Objectives and Features Implemented
The project was built with 2 users in mind, namely a General User and a Administrator.

### Objectives of Careerpedia
__For General Users:__
* View Career Pathways 
* Obtain Career information
* Find Related Courses

__For Administrator:__
* Manage website content 

### Sitemap of Careerpedia 
![Sitemap of Careerpedia](https://user-images.githubusercontent.com/45936149/120773804-41651380-c554-11eb-9907-b50638467df0.png)

__General User:__
1. Explore careers with career pathways

![feature1-Explore careers with career pathways](https://user-images.githubusercontent.com/45936149/120776023-5d69b480-c556-11eb-8114-1bc6ef7d278e.gif)

2. Career-tailored related course

![feature2-Career-tailored related course](https://user-images.githubusercontent.com/45936149/120776640-09130480-c557-11eb-9cba-37632cd301ae.gif)

3.   Ask Chatbot

![feature3-Ask Chatbot](https://user-images.githubusercontent.com/45936149/120779976-38774080-c55a-11eb-88d0-277a0e189647.gif)

__Adminstrator: __
4. Login & Signup

![feature4-Login & Signup](https://user-images.githubusercontent.com/45936149/120780867-1631f280-c55b-11eb-936e-30ea0e459a7f.gif)


5. Manage Career, Industry & Track

![feature5-Manage Career, Industry & Track](https://user-images.githubusercontent.com/45936149/120781777-f8b15880-c55b-11eb-8e39-709986141b9a.gif)


6. Manage Career Pathways

![feature6-Manage Career Pathways](https://user-images.githubusercontent.com/45936149/120782728-e08e0900-c55c-11eb-8fab-d59e360971fa.gif)


* Manage Courses, Category & Subcategory

![feature7](https://user-images.githubusercontent.com/45936149/120786998-75930100-c561-11eb-91b5-9541436cd123.gif)


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


