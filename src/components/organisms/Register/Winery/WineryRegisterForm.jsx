/* Internal logger */
import { Logger } from "/src/utils/Logger.jsx"

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RegisterForm } from "/src/components/molecules/Register/Form"

export const WineryRegisterForm = () => {
  const logger = new Logger("WineryRegisterForm")
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(async (formsData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/wineries`, {
        body: JSON.stringify(formsData),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      })
      const newWinery = await response.json()
      if (!response.ok) throw new Error(newWinery.msg)
      /* else */
      logger.debug("Winery user created successfully, with ID:", newWinery.ID)
      alert("[SUCCESS] Winery user created successfully!")
      navigate('/')
    } catch (error) {
      logger.error("Winery user could not be created!\n", error)
      alert(`[ERROR] Winery user could not be created!\n${error}`)
    }
  }, [])

  const formFields = [
    { /* Name */
      name: "name",
      text: "Nombre"
    },
    { /* Description */
      name: "description",
      required: false,
      text: "Descripción"
    },
    { /* Contact Email */
      name: "contact_email",
      required: false,
      text: "Correo electrónico de contacto"
    },
    { /* Contact Telephone */
      name: "contact_telephone",
      required: false,
      text: "Teléfono de contacto"
    },
    { /* Webpage */
      name: "web_page",
      text: "Página web"
    }
  ]
  return (
    <RegisterForm
      formFields={formFields}
      formTitle="Showing NEW Winery User Form"
      handleOnSubmit={handleOnSubmit}
    />
  )
}
