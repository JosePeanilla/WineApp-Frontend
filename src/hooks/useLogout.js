/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useLogout = () => {
  const logger = new Logger("useLogout")

  const logout = () => {
    try {
      localStorage.removeItem("token")
      logger.info("Usuario ha cerrado sesión exitosamente.")
    } catch (error) {
      logger.error("Error al intentar cerrar sesión:", error)
    }
  }

  return { logout }
}
