/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect } from "react"

const logger = new Logger("FormContainer")

export const FormContainer = ({ children, onSubmit }) => {
  
  useEffect(() => {
    logger.info("FormContainer montado.");
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    logger.info("Formulario enviado.")
    onSubmit(event)
  }

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
