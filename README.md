# Wine Application (Frontend) - Grupo Rojo
This project contains the frontend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (React and JS).

## Table of Contents
1. [How it was created](#how-it-was-created)
2. [Additional dependencies installed](#additional-dependencies-installed)
    1. [React Router](#1-react-router)
    2. [React Hook Form](#2-react-hook-form)
3. [How to run the project](#how-to-run-the-project)

---

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
