/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useState, useEffect } from "react"
import { ConsumerRegisterForm } from "/src/components/organisms/Register/Consumer"
import { WineryRegisterForm } from "/src/components/organisms/Register/Winery"
import { Button } from "/src/components/atoms/Form"
export const RegisterPage = () => {
  const logger = new Logger("RegisterPage")

  const [viewConsumerForm, setViewConsumerForm] = useState(false)
  const [viewWineryForm, setViewWineryForm] = useState(false)

  useEffect(() => {
    logger.info("RegisterPage cargada correctamente.")
  }, [logger])

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

  return (
    <section className="text-center" id="register_page">
      <h1>Registrate Aqui</h1>
      <h2>¿Qué tipo de usuario eres?</h2>
      <ul id="users_kind_buttons" className="flex justify-center gap-6 mt-4">
        <li>
          <Button variant="muyLigero" onClick={handleConsumerButtonClick}>Consumidor</Button>
        </li>
        <li>
          <Button variant="muyLigero" onClick={handleWineryButtonClick}>Bodega</Button>
        </li>
      </ul>
      {viewConsumerForm && <ConsumerRegisterForm />}
      {viewWineryForm && <WineryRegisterForm />}
    </section>
  )
}
