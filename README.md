# Wine Application (Frontend) - Grupo Rojo

This project contains the frontend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (React and JS).

## Table of Contents

1. [Description](#description)
2. [Features](#features)
   1. [General](#general-features)
   2. [Users](#users)
      1. [Administrator](#administrator)
      2. [Consumer](#consumer)
      3. [Visitor](#visitor)
      4. [Winery](#winery)
3. [How to run the project](#how-to-run-the-project)
    1. [Prerequisites](#prerequisites)
    2. [Execution](#execution)
4. [How it was created](#how-it-was-created)
5. [Additional dependencies installed](#additional-dependencies-installed)
    1. [Moment](#moment)
    2. [React Hook Form](#react-hook-form)
    3. [React Router](#react-router)

---

## Description

This project is the user interface for the wine app, designed to provide an intuitive and personalized experience.  
Users can register, browse wines, rate bottles, and manage their profiles.  
The app is focused primarly on consumers. Therefore, wineries have the chance to promote their brand, products and regions.

## Features

The wine app offers the following features, divided by topic:

### General Features

1. **Age review** - Visitor is requested to provide its age, and is permitted to access the content only if it has +18 years.
2. **Cookies** - Visitor is requested to accept (or deny) the cookies.
3. **Language** - The application is completely in Spanish.
4. **Backend Framework** - The server is developed in `Express.js`.
5. **Database** - `MongoDB`.
6. **Frontend Framework** - The web application is developed with `Vite + React`.
7. **Authentication** - `JWT` library is used.
8. **Email** - It is yet not decided which mail service will be used.

### Users

#### Administrator

This is the kind of user only team members can be, no visitors.  
They will have access and permission to everything, as well as "superpowers" to accept or deny users requests.

1. A team member shall be able to **register** as administrator, and shall be given **admin credentials**.
2. An administrator shall be able to **login** and **logout** from the web app with its credentials.
3. An administrator shall be able to **accept** or **deny** a winery request to add a bottle to its profile.
4. An administrator shall be able to **accept** or **deny** a winery request to add more information to its profile.
5. An administrator shall be able to **delete** any user account.

#### Consumer

This is the usual kind of user, a wine bottles consumer which would like to rate or search this kind of product.

1. A visitor shall be able to **register** as a consumer user, and shall be given **consumer credentials**.
    > It must be over 18 years old, and it must select its expertise:
    > - Newbie (no experience in wines)
    > - Apprentice (starting in this world)
    > - Professional (have a job related)
    >
    > Once all the requirements have been met, the user is registered, and a confirmation email is sent.
2. A consumer user shall be able to **login** and **logout** from the web app with its credentials.
3. A consumer user shall be able to **see** and **filter** wine bottles and wineries.
    > All the information shall be displayed.
4. A consumer user shall be able to **subscribe** to receive notifications when a *new bottle* (which meets defined parameters) is *added* to the web app.
    > These notifications shall be handled by sending an email to the user.
5. A consumer user shall be able to **subscribe** to receive a *monthly newsletter*.
    > This newsletter shall contain the application updates information, and shall be handled by sending an email to the user.
6. A consumer user shall be able to **edit** is profile freely.
7. A consumer user shall be able to **contact** an administrator user.
8. A consumer user shall be able to **delete** its account freely.
9. A consumer user can have **internal achievements** (years of experience, reviewed bottles, time in the system).
10. A consumer user can have different **user status** (e.g. `TOP`).

#### Winery

This is the kind of user which will actually fill the web app data.  
They will provide which wines they offer, but will require always admin checks when adding information.

1. A visitor shall be able to **register** as a winery user, and shall be given **winery credentials**.
    > It must be over 18 years old, and it must provide a certificate to verify its authenticity.  
    > Once all the requirements have been met, the user is registered, and a confirmation email is sent.
2. A winery user shall be able to **login** and **logout** from the web app with its credentials.
3. A winery user shall be able to **request** approval to add a *wine bottle* to its profile.
    > It will require admin approval.
4. A winery user shall be able to **see** and **filter** wine bottles and wineries.
    > All the information shall be displayed.
5. A winery user shall be able to **request** approval to *add* or *edit* information in its profile.
    > Such as Location or Website, among others.  
    > It will require admin approval.
6. A winery user shall be able to **contact** an administrator user.
7. A winery user can have different **verification status** (e.g. `Verified`).

#### Visitor

This is the kind of user which is not registered to the web app.  
They will have access to everything, but with limited displayed information.

1. A visitor shall be able to **access** the web app *without registering*.
2. A non-registered user shall be able to **see** and **filter** wine bottles and wineries.
    > Limited information shall be displayed.

## How to run the project

### Prerequisites

These are the steps needed to be **executed only once**, to set the environment:

1. Install the Node packages:
    ```bash
    npm install
    ```
2. Create a .env file at the root of the project:
    ```bash
    touch .env
    ```
3. Fill the created .env file with:
    ```env
    PORT=<backend_server_port>
    VITE_SERVER_URL=<backend_server_url>:$PORT
    ```

### Execution

As this is a React (front-end) application, it is set to be launched simply with: `npm run dev`.

Frontend (web app) should be running, by default, at **http://localhost:5173/**.

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

### **[Moment](https://momentjs.com/)**:

This package is used to get date and time with specific format in a simpler way.

```bash
npm install moment
```

### **[React Hook Form](https://www.react-hook-form.com/)**:

This package is used to provide the frontend the ability to handle forms in a simpler manner.

```bash
npm install react-hook-form
```

### **[React Router](https://reactrouter.com/)**:

This package is used to provide the frontend the ability to navigate and route.

```bash
npm install react-router-dom
```
