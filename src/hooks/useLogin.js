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
      const json = await response.json()
      if (json.error) return json
      else {
        localStorage.setItem("token", json.data)
        return { error: null }
      }
    } catch (err) {
      const errorText = "Error al intentar iniciar sesión!"
      logger.error(errorText, err)
      return { error: errorText }
    }
  }

  return { login }
}
