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
    <section id="register_page">
      <h2>Some Register-page title here</h2>
      <h3>¿Qué tipo de usuario eres?</h3>
      <ul id="users_kind_buttons">
        <li>
          <button onClick={handleConsumerButtonClick}>Consumidor</button>
        </li>
        <li>
          <button onClick={handleWineryButtonClick}>Bodega</button>
        </li>
      </ul>
      {viewConsumerForm && <ConsumerRegisterForm />}
      {viewWineryForm && <WineryRegisterForm />}
    </section>
  )
}
