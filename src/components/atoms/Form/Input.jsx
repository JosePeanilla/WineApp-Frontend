/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useState } from "react"

const logger = new Logger("Input")

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  const handleTogglePassword = () => {
    setIsPasswordVisible((prevState) => {
      const newState = !prevState
      logger.info(`Visibilidad de contraseña cambiada a: ${newState ? "visible" : "oculta"}`)
      return newState;
    })
  }

  logger.debug(`Renderizando Input de tipo: ${type}`)

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
        className={`border border-gray-300 rounded-md p-2 w-full pr-10 ${className || ""}`}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
        >
          {isPasswordVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 012 12c2.292-4.325 6.708-7 10-7s7.708 2.675 10 7a10.05 10.05 0 01-3.308 3.69M9.9 16.675a3 3 0 004.2 0" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.457 4.457l15.086 15.086M10.125 10.125A3.375 3.375 0 1113.875 13.875" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 13.875A3.375 3.375 0 0110.125 10.125" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
})
