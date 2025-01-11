# Wine Application (Frontend) - Grupo Rojo
This project contains the frontend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (React and JS).

## Table of Contents
1. [Description](#description)
2. [Features](#features)
   1. [Users](#users)
      1. [Consumer](#consumer)
      2. [Store](#store)
      3. [Administrator](#administrator)
      4. [Visitors](#visitors)
      5. [Registered users](#registered-users)

   2. [Product](#product) 
      1. [Wine bottles](#wine-bottles)

   3. [General](#general)
3. [How it was created](#how-it-was-created)
4. [Additional dependencies installed](#additional-dependencies-installed)
    1. [React Router](#1-react-router)
    2. [React Hook Form](#2-react-hook-form)
5. [How to run the project](#how-to-run-the-project)



---

## Description

This project is the user interface for the wine app, designed to provide an intuitive and personalized experience. Users can register, browse wines, rate bottles, and manage their profiles. The app is focused on consumers, wineries, and managers, with specific functions for each type of user.

## Features

   **Users**

   1. **Consumer**

      Register:

      Must be over 18 years old.
      Define geolocation.
      Mandatory list of experience: Newbie, Apprentice, Expert, Master, Professional.
      Optional descriptive text (with examples in the placeholders).
      A confirmation email is sent upon registration.

      Features:

      Login and Logout.
      Rate bottles of wine.
      Filter bottles and wineries with detailed information.
      Verification status.
      Internal achievements (years of experience, reviewed bottles, time in the system).
      User status (for example, "TOP").
      Contact administrators.
      Edit profile.
      Delete account.
      Subscription to notifications of new bottles of wine that meet certain parameters:
      An email is sent when there is a new "match".
      Receive a monthly email with an informative newsletter.

    
    2. **Store**
       
      Register:

      You must be over 18 years old.
      A confirmation email is sent upon registration.

      Features:

      Login and Logout.
      Request approval to register wine bottles.
      Request approval to offer information about the winery:
      Website.
      Location.
      Filter bottles and wineries with detailed information.
      Verification status.
      Contact administrators.
      Modify profile.


    
    3. **Administrator**

      Register:

      Team members can register as administrators.   

      Features:

      Login and Logout.
      Accept or deny requests to register bottles from wineries.
      Accept or deny requests to provide information from wineries.
      Delete accounts of consumer users or wineries.
      Contact consumer users and wineries.   
 


    4. **Visitors**

      Features:

      Filter bottles and wineries with limited information.


    5. **Registered users**

      Features:
         
      Filter bottles and wineries with complete information.   

    **Product**

    1. **Wine bottles**

      Features:

      Rated by consumer users.
      Associated with:
      Wine regions (which offer additional information).
      Denominations of Origin (DO), if applicable.
      Registration requested by winery users and approved by administrators.
      Initial database includes:
      Data from Europe, America and Oceania.
      Filtering   

    **General**

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

To initialize the project, below steps were followed:

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