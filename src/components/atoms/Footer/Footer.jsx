/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect } from "react"

const logger = new Logger("Footer")

export const Footer = () => {
  
  useEffect(() => {
    logger.info("Componente Footer montado correctamente.")
  }, [])

  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center text-center space-y-4">
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved by  
          <span className="text-[#9f2042] font-semibold"> Grupo Rojo</span> 
          (Jose Peanilla, Nico Rende, Maria Zamora)
        </p>

        <nav>
          <ul className="flex space-x-4 text-sm">
            <li><a href="/about" className="hover:underline">Sobre Nosotros</a></li>
            <li><a href="/wines" className="hover:underline">Explorar Vinos</a></li>
            <li><a href="/contact" className="hover:underline">Contacto</a></li>
            <li><a href="/terms" className="hover:underline">Términos y Condiciones</a></li>
          </ul>
        </nav>

        <div className="flex space-x-4">
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

        <form className="flex flex-col items-center">
          <label htmlFor="email" className="text-sm">Suscríbete a nuestras novedades:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Tu correo electrónico" 
            className="p-2 border rounded w-64 mt-2 text-black"
          />
          <button 
            type="submit" 
            className="bg-[#9f2042] text-white px-4 py-2 rounded mt-2 hover:bg-[#7b0d1e] transition-all"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </footer>
  )
}
