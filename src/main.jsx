/**************************************************************************************************
 * React Application Root Entry Point:
 * This file initializes the React application by creating the root element and wrapping the main App
 * component with necessary context providers for authentication and socket functionality.
 **************************************************************************************************/

/*********************************** Import Core Modules ***********************************/
/* StrictMode helps identify potential problems in an application by activating additional checks and warnings */
import { StrictMode } from "react"
/* createRoot from react-dom/client initializes the React application and attaches it to the DOM */
import { createRoot } from "react-dom/client"

/*********************************** Import Application Components and Providers ***********************************/
/* Main App component that serves as the entry point for the application's component tree */
import { App } from "/src/App.jsx"
/* AuthProvider supplies the authentication context, managing user session and credentials */
import { AuthProvider } from "/src/context/AuthContext"
/* SocketProvider supplies the socket connection context for handling real-time communications */
import { SocketProvider } from '/src/context/SocketContext'

/*********************************** Render Application to the DOM ***********************************/
/* Locate the DOM element with the id 'root' and render the React application into it */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the application with AuthProvider to manage authentication state */}
    <AuthProvider>
      {/* Wrap the application with SocketProvider to manage real-time socket connections */}
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </StrictMode>
)
