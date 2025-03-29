/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useState, useEffect } from "react"

/************************************************** Internal Components ***************************************************/
import { ConsumerRegisterForm } from "/src/components/organisms/Register/Consumer"
import { WineryRegisterForm } from "/src/components/organisms/Register/Winery"
import { Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * RegisterPage Component:
 * This page allows users to choose between two registration paths:
 * - Consumer registration
 * - Winery registration
 * It manages form visibility and logs user selections.
 **************************************************************************************************/
export const RegisterPage = () => {
  const logger = new Logger("RegisterPage")

  /****************************** Local UI State ******************************/
  const [viewConsumerForm, setViewConsumerForm] = useState(false)
  const [viewWineryForm, setViewWineryForm] = useState(false)

  /****************************** Log Page Load ******************************/
  useEffect(() => {
    logger.info("RegisterPage cargada correctamente.")
  }, [logger])

  /****************************** Button Handlers ******************************/
  const handleConsumerButtonClick = () => {
    setViewConsumerForm(true)
    setViewWineryForm(false)
    logger.info("Usuario seleccionó formulario de Consumidor.")
  }

  const handleWineryButtonClick = () => {
    setViewConsumerForm(false)
    setViewWineryForm(true)
    logger.info("Usuario seleccionó formulario de Bodega.")
  }

  /****************************** Render Registration Page ******************************/
  return (
    <section className="text-center" id="register_page">
      {/* Page Heading */}
      <h1>Regístrate Aquí</h1>
      <h2>¿Qué tipo de usuario eres?</h2>

      {/* User Type Selection Buttons */}
      <ul id="users_kind_buttons" className="flex justify-center gap-6 mt-4">
        <li>
          <Button variant="muyLigero" onClick={handleConsumerButtonClick}>
            Consumidor
          </Button>
        </li>
        <li>
          <Button variant="muyLigero" onClick={handleWineryButtonClick}>
            Bodega
          </Button>
        </li>
      </ul>

      {/* Conditional Form Rendering */}
      {viewConsumerForm && <ConsumerRegisterForm />}
      {viewWineryForm && <WineryRegisterForm />}
    </section>
  )
}
