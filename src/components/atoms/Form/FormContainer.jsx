/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect } from "react"

/**************************************************************************************************
 * FormContainer:
 * Wrapper component for forms with consistent layout and logging.
 * - Centralizes form width and vertical alignment
 * - Logs mount and submit events using the custom logger
 * - Accepts any children and a custom submit handler
 **************************************************************************************************/
const logger = new Logger("FormContainer")

export const FormContainer = ({ children, onSubmit }) => {
  
  /*************************************** Lifecycle Log ***************************************/
  useEffect(() => {
    logger.info("FormContainer mounted.")
  }, [])

  /*************************************** Submit Handler ***************************************/
  const handleSubmit = (event) => {
    event.preventDefault()
    logger.info("Form submitted.")
    onSubmit(event)
  }

  /*************************************** Render Form ***************************************/
  return (
    <section className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[300px]"
        noValidate
      >
        {children}
      </form>
    </section>
  )
}
