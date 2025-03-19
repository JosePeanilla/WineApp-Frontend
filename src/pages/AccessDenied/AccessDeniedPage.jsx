/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect } from "react"

const logger = new Logger("AccessDeniedPage")

export const AccessDeniedPage = () => {
  useEffect(() => {
    logger.warn("Acceso denegado: Usuario menor de 18 años")
  }, []) 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#211103] text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-[#f8e5ee]">Acceso Denegado</h1>
      <p className="text-lg mb-6 text-[#f8e5ee] text-center">
        Lo sentimos, debes ser mayor de 18 años para acceder a esta aplicación.
      </p>
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
