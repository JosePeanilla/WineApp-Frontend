/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect } from "react"

// Create a Logger instance with "AccessDeniedPage" as the identifier for logging events from this page.
const logger = new Logger("AccessDeniedPage")

/**************************************************************************************************
 * AccessDeniedPage Component:
 * This component renders the "Access Denied" page for the WineApp application.
 * It logs a warning when the page loads and displays a notification if the user is underage.
 * Additionally, it provides a link to exit the application.
 **************************************************************************************************/
export const AccessDeniedPage = () => {
  /****************************** Log Warning and Display Notification ******************************/
  /*
   * useEffect is used here to perform actions when the component is mounted.
   * It logs a warning indicating access is denied due to the user being underage,
   * and it triggers a warning notification to inform the user.
   */
  useEffect(() => {
    logger.warn("Acceso denegado: Usuario menor de 18 años")
    notify.warning("No puedes continuar porque no eres mayor de edad.")
  }, [])

  /****************************** Render Access Denied Page Content ******************************/
  /*
   * The return statement renders the JSX for the AccessDeniedPage.
   * It includes:
   *  - A title indicating that access is denied.
   *  - A message explaining the age requirement.
   *  - A link that directs the user out of the application, logging the redirection event.
   */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#211103] text-white p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-4 text-[#f8e5ee]">Acceso Denegado</h1>
      {/* Informational Message */}
      <p className="text-lg mb-6 text-[#f8e5ee] text-center">
        Lo sentimos, debes ser mayor de 18 años para acceder a esta aplicación.
      </p>
      {/* Exit Link: Redirects to an external URL and logs the redirection event */}
      <a
        href="https://www.google.com"
        className="bg-[#DC2626] hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
        onClick={() => logger.info("Usuario redirigido fuera de la aplicación")}
      >
        Salir
      </a>
    </div>
  )
}
