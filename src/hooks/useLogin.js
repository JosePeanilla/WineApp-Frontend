/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useLogin Hook:
 * Handles user authentication.
 * - Sends credentials to backend API
 * - Stores token in localStorage on success
 * - Returns error message on failure
 * - Uses logger for debugging and tracking
 **************************************************************************************************/
export const useLogin = () => {
  const logger = new Logger("useLogin")

  /****************************** Login Function ******************************/
  const login = async (credentials) => {
    try {
      // Send POST request with credentials
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      const jsonData = await response.json()

      // Handle invalid login attempt
      if (!response.ok) {
        const errorMessage = jsonData.error || "Los datos de inicio de sesión no son correctos. Por favor, inténtelo de nuevo con los datos correctos."
        logger.error("Error en el inicio de sesión:", errorMessage)
        return { error: errorMessage }
      }

      // Successful login
      localStorage.setItem("token", jsonData.data)
      logger.info("Usuario autenticado con éxito.")
      return { error: null }

    } catch (err) {
      // Network or unexpected error
      const errorText = "Hubo un error al intentar iniciar sesión. Verifique su conexión e inténtelo nuevamente."
      logger.error(errorText, err)
      return { error: errorText }
    }
  }

  /****************************** Return Login Handler ******************************/
  return { login }
}
