import "./RegisterPage.css"

import { useState } from "react"

import { ConsumerRegisterForm } from "/src/components/organisms/Register/Consumer"
import { WineryRegisterForm } from "/src/components/organisms/Register/Winery"

export const RegisterPage = () => {
  const [viewConsumerForm, setViewConsumerForm] = useState(false)
  const [viewWineryForm, setViewWineryForm] = useState(false)

  const handleConsumerButtonClick = () => {
    setViewConsumerForm(true)
    setViewWineryForm(false)
  }

  const handleWineryButtonClick = () => {
    setViewConsumerForm(false)
    setViewWineryForm(true)
  }

  return (
    <section className="text-center" id="register_page">
      <h1 >Registrate Aqui</h1>
      <h2>¿Qué tipo de usuario eres?</h2>
      <ul id="users_kind_buttons" className="d-flex flex-row">
        <li>
          <button className="btn" onClick={handleConsumerButtonClick}>Consumidor</button>
        </li>
        <li>
          <button className="btn" onClick={handleWineryButtonClick}>Bodega</button>
        </li>
      </ul>
      {viewConsumerForm && <ConsumerRegisterForm />}
      {viewWineryForm && <WineryRegisterForm />}
    </section>
  )
}
