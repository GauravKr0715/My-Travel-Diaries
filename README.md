# My-Travel-Diaries

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Purpose](#purpose)
  * [Built With](#built-with)
* [Usage](#usage)
  * [Using Deployed Application](#Using-Deployed-Application)
  * [Using in Developer mode](#Using-in-Developer-mode)
* [Documentation and Examples](#docs-and-examples)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project
My Travel Diaries is a Full Stack MERN Application. At it's present level, it is supposed to serve as a digital travel library, keeping personal records of visits with features
like adding an image and rating out of 5.

### Purpose

This project was inspired by some cool ideas of e-diaries I saw online. I took that and incorporated into a web application, with basic but vital login and registration feauters.

### Built With

* [create-react-app](https://github.com/facebook/create-react-app)
* [mapbox](https://github.com/mapbox)
* [express](https://github.com/expressjs/express)
* [MongoDB](https://github.com/mongodb/mongo)
* [NodeJS](https://github.com/nodejs/node)

<!-- Usage -->
## Usage

### Using Deployed Application

If you wanna use this in the deployed form, go to this [Heroku Link](https://sleepy-eyrie-19938.herokuapp.com/) where it is deployed.

### Using in Developer mode

If you have a knack for code and it's working, you can run this application in developer mode. Just follow the instructions given below:

#### Pre-requisites
* node
* npm
* MongoDB account
* Mapbox Account (for the API key)

#### Steps for installation
1. Download the code from the giant Green "Code" button (or use Git CLI)
2. Open a terminal and point to the location of the project and run the following command:
```sh
npm run dev
```
---
**NOTE**

Don't forget to place the following in your .env file at root:
<pre>
DB_KEY = "your mongo DB connection link
TOKEN_SECRET = "your JWT secret"
</pre> 
Also replace the *mapStyle* and *mapboxApiAccessToken* with your own Mapbox credentials in the following file:
<pre>
├──api/
├── client/
│   ├── public/
│   ├── src/
│   │   ├──components/
│   │   │   ├──AppNavBar.js
│   │   │   ├──Home.js
│   │   │   ├──*MapBoxComponent.js*  <------
│   │   │   └── ...
│   │   ├──images/
│   │   ├──styles/
│   │   ├──API.js
│   │   └── ...
│   └── package.json
│   └── ...
├── models/
├── package.json
└── ...
</pre>

---

<!-- DOCUMENTATION and EXAMPLES -->
## Docs-and-Examples
* When you visit the run the application for the first time, look for the register button and make a new account
* Once you have your credentials ready, login to your account using those.
* You will be presented with a world map
* Go over manually to the location where you'd like to make an entry and double click. Fill the form and click on *Create Entry* button
* The yellow marker comes on the map for where the new Entry was made. You can click on it and see the details about the entry.

<!-- CONTACT -->
## Contact

[LinkedIn@Gaurav Kumar](https://www.linkedin.com/in/gaurav-kumar-5b7412193/) 

[Instagram@Gaurav__kr0715](https://www.instagram.com/Gaurav__kr0715/)

Mail me at: laxaman.pal@gmail.com

Project Link: [https://github.com/GauravKr0715/My-Travel-Diaries](https://github.com/GauravKr0715/My-Travel-Diaries)
