/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React from "react"

/**************************************************************************************************
 * Button Component:
 * Reusable button component with support for multiple visual variants.
 * - Applies consistent base styles and predefined color variants
 * - Logs button render and click events for traceability
 * - Accepts custom className, children and other native props
 **************************************************************************************************/
const logger = new Logger("Button")

export const Button = ({ children, className, variant = "primary", ...props }) => {
  /*************************************** Base + Variant Styles ***************************************/
  const baseStyles = "rounded-md py-2 px-4 transition-colors duration-300"

  const variants = {
    muyFuerte: "bg-[#211103] hover:bg-[#3d1308] text-white",
    fuerte: "bg-[#3d1308] hover:bg-[#7b0d1e] text-white",
    moderado: "bg-[#7b0d1e] hover:bg-[#9f2042] text-white",
    ligero: "bg-[#9f2042] hover:bg-[#f8e5ee] text-white",
    muyLigero: "bg-[#f8e5ee] hover:bg-[#9f2042] text-black",
    eliminar: "bg-red-600 hover:bg-red-700 text-white",
  }

  /*************************************** Click Handler with Logging ***************************************/
  const handleClick = (event) => {
    logger.info(`Button "${children}" clicked. Variant: ${variant}`)
    if (props.onClick) {
      props.onClick(event)
    }
  }

  /*************************************** Debug Render ***************************************/
  logger.debug(`Rendering button with variant: ${variant}`)

  /*************************************** Render Element ***************************************/
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
