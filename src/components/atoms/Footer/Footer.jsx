/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect, useState } from "react"

/**************************************************************************************************
 * Footer Component:
 * Displays application footer with:
 * - Copyright information
 * - Navigation links
 * - Social media links
 * - Email subscription form with basic validation
 * Logs subscription and usage events via the custom logger
 **************************************************************************************************/
const logger = new Logger("Footer")

export const Footer = () => {
  /*************************************** Local State ***************************************/
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  /*************************************** Lifecycle Log ***************************************/
  useEffect(() => {
    logger.info("Footer component mounted successfully.")
  }, [])

  /*************************************** Email Subscription Handler ***************************************/
  const handleSubmit = (e) => {
    e.preventDefault()

    const isValidEmail = /\S+@\S+\.\S+/.test(email)

    if (email.trim() === "" || !isValidEmail) {
      setMessage("Por favor, introduce un correo electrónico válido.")
      notify.warning("Por favor, introduce un correo electrónico válido.")
      setIsError(true)
      return
    }

    logger.info(`New subscription received: ${email}`)
    setMessage("Gracias por suscribirte, pronto recibirás nuestras novedades.")
    notify.success("Gracias por suscribirte, pronto recibirás nuestras novedades.")
    setIsError(false)
    setEmail("")
  }

  /*************************************** Render UI ***************************************/
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-6">
        
        {/* Copyright & Team */}
        <p className="text-xs sm:text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved by
          <span className="text-[#9f2042] font-semibold"> Grupo Rojo</span>
          <span className="block xs:inline mt-1 xs:mt-0">
            (Jose Peanilla, Nicolas Rende, Maria Zamora)
          </span>
        </p>

        {/* Navigation Links */}
        <nav className="w-full">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm">
            <li><a href="/about" className="hover:underline">Sobre Nosotros</a></li>
            <li><a href="/wines" className="hover:underline">Explorar Vinos</a></li>
            <li><a href="/contact" className="hover:underline">Contacto</a></li>
            <li><a href="/terms" className="hover:underline">Términos y Condiciones</a></li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <i className="fab fa-facebook text-lg"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <i className="fab fa-twitter text-lg"></i>
          </a>
        </div>

        {/* Email Subscription Form */}
        <form
          className="flex flex-col items-center w-full max-w-xs"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="email" className="text-xs sm:text-sm">Suscríbete a nuestras novedades:</label>
          <input
            type="email"
            id="email-secondary"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full mt-2 text-black text-sm"
          />
          <button
            type="submit"
            className="bg-[#9f2042] text-white px-4 py-2 rounded mt-2 hover:bg-[#7b0d1e] transition-all text-sm w-full sm:w-auto"
          >
            Suscribirme
          </button>

          {message && (
            <p className={`mt-2 text-xs sm:text-sm ${isError ? "text-red-500" : "text-green-400"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </footer>
  )
}
