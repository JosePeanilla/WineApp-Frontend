/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect } from "react"

/**************************************************************************************************
 * AboutPage Component:
 * This component renders the "About Us" page for the WineApp application.
 * It logs an informational message when the page is loaded and displays details about
 * the team and contact information.
 **************************************************************************************************/

// Create a Logger instance with "AboutPage" as the identifier for logging events from this page.
const logger = new Logger("AboutPage")

export const AboutPage = () => {
  /****************************** Log Page Load ******************************/
  /*
   * useEffect is used here to perform an action when the component is mounted.
   * With an empty dependency array, this effect runs only once.
   * It logs an informational message indicating that the AboutPage has loaded successfully.
   */
  useEffect(() => {
    logger.info("Página 'Sobre Nosotros' cargada correctamente.")
  }, [])

  /****************************** Render Page Content ******************************/
  /*
   * The return statement below renders the JSX layout of the page, including:
   *  - A main title ("Sobre Nosotros").
   *  - A brief introduction about WineApp and its mission.
   *  - A section displaying team members and their roles.
   *  - A contact section with the application's email address.
   */
  return (
    <div className="container mx-auto p-6 text-center">
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-[#9f2042]">Sobre Nosotros</h1>
      
      {/* Introduction Paragraph */}
      <p className="mt-4 text-gray-700 text-lg">
        Bienvenido a <span className="font-semibold">WineApp</span>, una comunidad apasionada por los vinos. 
        Nuestra misión es conectar a amantes del vino con bodegas y experiencias únicas.
      </p>

      {/* Team Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#7b0d1e]">Nuestro Equipo</h2>
        <div className="flex flex-wrap justify-center mt-4 gap-8">
          {/* Team Member */}
          <div className="text-center">
            <p className="font-semibold mt-2">Jose Peanilla</p>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          {/* Team Member */}
          <div className="text-center">
            <p className="font-semibold mt-2">Nicolas Rende</p>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          {/* Team Member */}
          <div className="text-center">
            <p className="font-semibold mt-2">Maria Zamora</p>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#7b0d1e]">Contáctanos</h2>
        <p className="text-gray-600 mt-2">Si tienes preguntas o sugerencias, escríbenos a:</p>
        <p className="font-semibold text-[#9f2042]">contacto@wineapp.com</p>
      </div>
    </div>
  )
}
