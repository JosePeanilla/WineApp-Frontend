/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External dependencies ***************************************************/
import { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ProfileForm } from "/src/components/molecules/Profile/Form"
import { notify } from "/src/utils/notifications"

/************************************************** WineryProfileForm Component ***************************************************/
export const WineryProfileForm = ({ user, navigate }) => {
  const logger = new Logger("WineryProfileForm")
  const { setUser } = useContext(AuthContext) 

  /*************************************** Handle form submission ***************************************/
  const handleOnSubmit = async (formData) => {
    // Check if the submitted form data is the same as the current user data
    const isSameData = Object.keys(formData).every(key => formData[key] === user[key])

    if (isSameData) {
        notify.warning("La información que intentas introducir es la misma que tu perfil actual.")
        return
    }

    try {
      logger.debug("Enviando datos al backend:", formData) 

      // Make an API call to update the winery's profile
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/wineries/${user.id}`, {
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

      // Update the user state with the new form data
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

  /*************************************** Define form fields ***************************************/
  const formFields = [
    { /* Name */
      name: "name",
      text: "Nombre",
      required: true
    },
    { /* Description */
      name: "description",
      required: false,
      text: "Descripción"
    },
    { /* Phone */
      name: "phone",
      required: false,
      text: "Teléfono",
      type: "phone"
    },
    { /* Webpage */
      name: "web_page",
      text: "Página web",
      required: false,
      type: "url"
    },
    { /* Location */
      name: "location",
      text: "Localización (País)",
      required: true,
      type: "select"
    }
  ]

  /*************************************** Render the ProfileForm component ***************************************/
  return (
    <ProfileForm
      formFields={formFields}
      formTitle="Editar Perfil de Bodega"
      user={user}
      handleOnSubmit={handleOnSubmit}
    />
  )
}
