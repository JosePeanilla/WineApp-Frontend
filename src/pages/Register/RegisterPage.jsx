import "./RegisterPage.css"

import { useState } from "react"

import { ConsumerRegisterForm } from "/src/components/atoms/Forms/ConsumerRegister"

export const RegisterPage = () => {
  const [viewConsumerForm, setViewConsumerForm] = useState(false)
  const [viewWineryUserForm, setViewWineryUserForm] = useState(false)

  const handleConsumerButtonClick = () => {
    setViewConsumerForm(true)
    setViewWineryUserForm(false)
  }

  const handleWineryUserButtonClick = () => {
    setViewConsumerForm(false)
    setViewWineryUserForm(true)
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
          <button onClick={handleWineryUserButtonClick}>Bodega</button>
        </li>
      </ul>
      {viewConsumerForm && <ConsumerRegisterForm />}
      {viewWineryUserForm && <h4>Showing Winery User Form</h4>}
    </section>
  )
}
