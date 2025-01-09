import "./RegisterPage.css"

import { useState } from "react"

import { ConsumerUserRegisterForm } from "/src/components/atoms/Forms/ConsumerUserRegister"

export const RegisterPage = () => {
  const [viewConsumerUserForm, setViewConsumerUserForm] = useState(false)
  const [viewWineryUserForm, setViewWineryUserForm] = useState(false)

  const handleConsumerUserButtonClick = () => {
    setViewConsumerUserForm(true)
    setViewWineryUserForm(false)
  }

  const handleWineryUserButtonClick = () => {
    setViewConsumerUserForm(false)
    setViewWineryUserForm(true)
  }

  return (
    <section id="register_page">
      <h2>Some Register-page title here</h2>
      <h3>¿Qué tipo de usuario eres?</h3>
      <ul id="users_kind_buttons">
        <li>
          <button onClick={handleConsumerUserButtonClick}>Consumidor</button>
        </li>
        <li>
          <button onClick={handleWineryUserButtonClick}>Bodega</button>
        </li>
      </ul>
      {viewConsumerUserForm && <ConsumerUserRegisterForm />}
      {viewWineryUserForm && <h4>Showing Winery User Form</h4>}
    </section>
  )
}
