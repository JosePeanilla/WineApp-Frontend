# Wine Application (Frontend) - Grupo Rojo
This project contains the frontend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (React and JS).

## Table of Contents
1. [Description](#description)
2. [Features](#features)
   1. [Users](#users)
      1. [Consumer](#consumer)
      2. [Wineries](#wineries)
      3. [Administrator](#administrator)
      4. [Visitors](#visitors)

   2. [Product](#product) 
      1. [Wine bottles](#wine-bottles)
      2. [General](#general)
3. [How it was created](#how-it-was-created)
4. [Additional dependencies installed](#additional-dependencies-installed)
    1. [React Router](#1-react-router)
    2. [React Hook Form](#2-react-hook-form)
5. [How to run the project](#how-to-run-the-project)



---

## Description

This project is the user interface for the wine app, designed to provide an intuitive and personalized experience. Users can register, browse wines, rate bottles, and manage their profiles. The app is focused on consumers, wineries, and managers, with specific functions for each type of user.

## Features

The wine app offers the following features, divided by topic:

### Users

#### Consumer

      Register:

      Must be over 18 years old.
      Mandatory list of experience: Newbie - 0 experience in wines, Apprentice - starting, Professional - Have a job related.

      A consumer user should be able to:

      Login.
      Logout.
      Once all the requirements have been met, the user is registered and a confirmation email is sent.
      Filter bottles and wineries with complete information. 
      Rate bottles of wine.
      Verification status.
      Internal achievements (years of experience, reviewed bottles, time in the system).
      User status (for example, "TOP").
      Contact administrators.
      Edit profile.
      Delete account.
      Subscription to notifications of new bottles of wine that meet certain parameters:
      An email is sent when there is a new "match".
      Receive a monthly email with an informative newsletter.
      A confirmation email is sent upon registration.

#### Wineries
       
      Register:

      You must be over 18 years old.
      A confirmation email is sent upon registration.

      A winery user should be able to:

      Login and Logout.
      Request approval to register wine bottles.
      Request approval to offer information about the winery:
      Website.
      Location.
      Filter bottles and wineries with detailed information.
      Verification status.
      Contact administrators.
      Modify profile.


    
#### Administrator

      Register:

      Team members can register as administrators.   

      An administrator user should be able to:

      Login and Logout.
      Accept or deny requests to register bottles from wineries.
      Accept or deny requests to provide information from wineries.
      Delete accounts of consumer users or wineries.
      Contact consumer users and wineries.   
 


#### Visitors

    They are unregistered visitors, they will have limited functionality, for example: view and filter bottles with partial information

      Visitors should be able to:

      Filter bottles and wineries with limited information.

### Product

#### Wine bottles

      Features:

      Rated by consumer users.
      Associated with:
      Wine regions (which offer additional information).
      Denominations of Origin (DO), if applicable.
      Registration requested by winery users and approved by administrators.
      Initial database includes:
      Data from Europe, America and Oceania.
      Filtering   

#### General

      Features:

      Confirmation of age upon entering the application.
      Confirmation of acceptance of cookies.
      Application completely in Spanish.
      Technologies Used
      Backend Framework: [Framework name, for example, Django, Express.js, etc.]
      Database: [Database name, for example, PostgreSQL, MongoDB, etc.]
      Authentication: [JWT, OAuth2, etc.]
      Email: [Mail service, for example, SendGrid, Nodemailer, etc.]
      Geolocation: [API used, for example, Google Maps, OpenStreetMap, etc.]
      DO/Regions: [Data source, for example, external databases, manual, etc.]

## How it was created

To initialize the project, follow these steps:

1. **Clone** the repository
    ```bash
    git clone https://github.com/FSDSTR1024/TFM-frontend-rojo.git
    ```

2. **Navigate** to the project directory
    ```bash
    cd TFM-frontend-rojo
    ```

3. **Initialize** the *VITE framework* project:
    ```bash
    npm create vite@latest
    ```
    - **Framework**: React
    - **Variant**: JavaScript

4. **Move** the created project files into the parent folder (to remove an additional unnecessary nesting folder level):
    ```bash
    cd <vite_project_name>
    move * ..
    ```

5. **Install** the necessary React *dependency packages*:
    ```bash
    cd ..
    npm install
    ```

## Additional dependencies installed

### **[React Router](https://reactrouter.com/)**:

This package is used to provide the frontend the ability to navigate and route.

```bash
npm install react-router-dom
```

### **[React Hook Form](https://www.react-hook-form.com/)**:

This package is used to provide the frontend the ability to handle forms in a simpler manner.

```bash
npm install react-hook-form
```

## How to run the project

As this is a React (front-end) application, it is set to be launched simply with:
```bash
npm run dev
```
Frontend should be running at **http://localhost:5173/**.
