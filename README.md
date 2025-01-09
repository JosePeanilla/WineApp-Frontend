# Wine Application (Frontend) - Grupo Rojo
This project contains the frontend part of the final ("*Full-Stack Developer*") master's work.  
It has been developed with all gathered information and knowledge learnt from the master (React and JS).

## Table of Contents
1. [How it was created](#how-it-was-created)
2. [Additional dependencies installed](#additional-dependencies-installed)
    1. [React Router](#1-react-router)
    2. [React Hook Form](#2-react-hook-form)
3. [How to run the project](#how-to-run-the-project)
4. [Description](#description)
5. [List of functions](#list-of-functions)
   1. [Users](#users)
      1. [Consumer](#consumer)
      2. [Store](#store)
      3. [Administrator](#administrator)
      4. [Visitors](#visitors)
      5. [Registered users](#registered-users)

   2. [Product](#product) 
      1. [Wine bottles](#wine-bottles)

   3. [General](#general)

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


## Description

Este proyecto es la interfaz de usuario para la aplicación de vinos, diseñada para proporcionar una experiencia intuitiva y personalizada. Los usuarios pueden registrarse, explorar vinos, valorar botellas, y gestionar sus perfiles. La aplicación está enfocada en consumidores, bodegas y administradores, con funciones específicas para cada tipo de usuario.



## List of functions

   **Users**

   1. **Consumer**

      Record:

        Debe ser mayor de 18 años.
        Definir geolocalización.
        Listado obligatorio de experiencia: Novato, Aprendiz, Experto, Master, Profesional.
        Texto descriptivo opcional (con ejemplos en los placeholders).
        Se envía un correo de confirmación al registrarse.

      Actions:

        Login y Logout.
        Valorar botellas de vino.
        Filtrar botellas y bodegas con información detallada.
        Estado de verificación.
        Logros internos (años de experiencia, botellas reseñadas, tiempo en el sistema).
        Estatus de usuario (por ejemplo, "TOP").
        Contactar con administradores.
        Modificar perfil.
        Eliminar cuenta.
        Suscripción a avisos de nuevas botellas de vino que cumplan ciertos parámetros:
        Se envía un correo cuando hay un nuevo "match".
        Recepción de un correo mensual con un newsletter informativo.


    
    2. **Store**
       
       Record:
         Debe ser mayor de 18 años.
         Se envía un correo de confirmación al registrarse.

       Actions:

         Login y Logout.
         Pedir aprobación para registrar botellas de vino.
         Pedir aprobación para ofrecer información sobre la bodega:
         Página web.
         Ubicación.
         Filtrar botellas y bodegas con información detallada.
         Estado de verificación.
         Contactar con administradores.
         Modificar perfil.


    
    3. **Administrator**

       Record:

         Los integrantes del equipo pueden registrarse como administradores.

       Actions:

         Login y Logout.
         Aceptar o denegar solicitudes de registro de botellas por parte de bodegas.
         Aceptar o denegar solicitudes de ofrecer información de bodegas.
         Eliminar cuentas de usuarios consumidores o bodegas.
         Contactar con usuarios consumidores y bodegas.
 


    4. **Visitors**

       Actions:

         Filtrar botellas y bodegas con información limitada.



    5. **Registered users**

       Actions:
         
         Filtrar botellas y bodegas con información completa.




    **Product**

    1. **Wine bottles**

       Actions:

         Valoradas por usuarios consumidores.
         Asociadas a:
         Regiones vitivinícolas (que ofrecen información adicional).
         Denominaciones de Origen (DO), si aplica.
         Registro solicitado por usuarios bodega y aprobado por administradores.
         Base de datos inicial incluye:
         Datos de Europa, América y Oceanía.
         Filtrado


    **General**

       Actions:

         Confirmación de mayoría de edad al entrar a la aplicación.
         Confirmación de aceptación de cookies.
         Aplicación completamente en castellano.
         Tecnologías Utilizadas
         Framework Backend: [Nombre del framework, por ejemplo, Django, Express.js, etc.]
         Base de Datos: [Nombre de la base de datos, por ejemplo, PostgreSQL, MongoDB, etc.]
         Autenticación: [JWT, OAuth2, etc.]
         Correo Electrónico: [Servicio de correo, por ejemplo, SendGrid, Nodemailer, etc.]
         Geolocalización: [API utilizada, por ejemplo, Google Maps, OpenStreetMap, etc.]
         DO/Regiones: [Fuente de datos, por ejemplo, bases de datos externas, manual, etc.]
