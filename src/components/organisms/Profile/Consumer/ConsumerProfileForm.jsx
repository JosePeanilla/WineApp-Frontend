/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External dependencies ***************************************************/
import { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ProfileForm } from "/src/components/molecules/Profile/Form"
import { notify } from "/src/utils/notifications"

/************************************************** ConsumerProfileForm Component ***************************************************/
export const ConsumerProfileForm = ({ user, navigate }) => {
  const logger = new Logger("ConsumerProfileForm")
  const { setUser } = useContext(AuthContext) 

  /*************************************** Handle form submission ***************************************/
  const handleOnSubmit = async (formData) => {
    // Check if the new form data is the same as the current user data
    const isSameData = Object.keys(formData).every(key => formData[key] === user[key])

    if (isSameData) {
        notify.warning("La información que intentas introducir es la misma que tu perfil actual.")
        return
    }

    try {
      logger.debug("Enviando datos al backend:", formData)

      // Make an API call to update the user's profile data
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/consumers/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const jsonData = await response.json()
      logger.debug("Respuesta del backend:", jsonData)

      if (!response.ok) throw jsonData

      notify.success("Perfil actualizado correctamente!")

      // Update user state with the new profile data
      setUser((prevUser) => ({ 
        ...prevUser, 
        ...formData,
        id: prevUser.id, 
        _id: prevUser._id 
      }))

      logger.info("Perfil actualizado con éxito")
      
      navigate("/") // Redirect to home page after successful update
    } catch (err) {
      logger.error("Error en la actualización del perfil:", err)
      notify.error(`${err?.msg || "Error desconocido"}`)
    }
  }

  // Define the fields for the profile form
  const formFields = [
    { /* Name */
      name: "name",
      text: "Nombre"
    },
    { /* Surname */
      name: "surname",
      text: "Apellidos"
    },
    { /* Address */ 
      name: "address", 
      text: "Dirección", 
      required: false
    },
    { /* City */ 
      name: "city", 
      text: "Ciudad", 
      required: false 
    },
    { /* Country */
      name: "country",
      text: "País",
      type: "select"
   }
  ]

  /*************************************** Render Profile Form ***************************************/
  return (
    <ProfileForm
      formFields={formFields}
      formTitle="Editar Perfil de Consumidor"
      user={user}
      handleOnSubmit={handleOnSubmit}
    />
  )
}
