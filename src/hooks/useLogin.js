/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useLogin = () => {
  const logger = new Logger("useLogin")

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      })

      const jsonData = await response.json()

      if (!response.ok) {
        logger.error("Error en el inicio de sesión:", jsonData.error || "Credenciales incorrectas.")
        
        const errorMessage = jsonData.error || "Los datos de inicio de sesión no son correctos. Por favor, inténtelo de nuevo con los datos correctos."
        return { error: errorMessage }
      }

      localStorage.setItem("token", jsonData.data)
      logger.info("Usuario autenticado con éxito.")
      return { error: null }

    } catch (err) {
      const errorText = "Hubo un error al intentar iniciar sesión. Verifique su conexión e inténtelo nuevamente."
      logger.error(errorText, err)
      return { error: errorText }
    }
  }

  return { login }
}
