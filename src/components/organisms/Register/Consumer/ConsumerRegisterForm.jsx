/* Internal logger */
import { Logger } from "/src/utils/Logger.jsx"

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RegisterForm } from "/src/components/molecules/Register/Form"

export const ConsumerRegisterForm = () => {
  const logger = new Logger("ConsumerRegisterForm")
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(async (formsData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/consumers`, {
        body: JSON.stringify(formsData),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      })
      const newConsumer = await response.json()
      if (!response.ok) throw new Error(newConsumer.msg)
      /* else */
      logger.debug("Consumer user created successfully, with ID:", newConsumer.ID)
      alert("[SUCCESS] Consumer user created successfully!")
      navigate('/')
    } catch (error) {
      logger.error("Consumer user could not be created!\n", error)
      alert(`[ERROR] Consumer user could not be created!\n${error}`)
    }
  }, [])

  const formFields = [
    { /* Name */
      name: "name",
      text: "Nombre"
    },
    { /* Surname */
      name: "surname",
      text: "Apellidos"
    }
  ]
  return (
    <RegisterForm
      formFields={formFields}
      formTitle="Showing NEW Consumer User Form"
      handleOnSubmit={handleOnSubmit}
    />
  )
}
