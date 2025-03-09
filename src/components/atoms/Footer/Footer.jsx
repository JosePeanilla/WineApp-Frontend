/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect } from "react"

const logger = new Logger("Footer")

export const Footer = () => {
  
  useEffect(() => {
    logger.info("Componente Footer montado correctamente.")
  }, [])

  return (
    <footer className="footer footer-center p-4 bg-white">
      <aside>
        <p className="text-wineapp-muyfuerte">
          Copyright © {new Date().getFullYear()} - All right reserved by 
          <span className="text-wineapp-ligero"> Grupo Rojo</span> 
          (Jose Peanilla, Nico Rende, Maria Zamora)
        </p>
      </aside>
    </footer>
  )
}
