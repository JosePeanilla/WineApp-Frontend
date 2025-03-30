/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useLogout Hook:
 * Handles user logout process.
 * - Removes the token from localStorage
 * - Logs the logout action or any error that occurs
 * - Can be combined with context cleanup and redirection if needed
 **************************************************************************************************/
export const useLogout = () => {
  const logger = new Logger("useLogout")

  /****************************** Logout Function ******************************/
  const logout = () => {
    try {
      localStorage.removeItem("token")
      logger.info("Usuario ha cerrado sesión exitosamente.")
    } catch (error) {
      logger.error("Error al intentar cerrar sesión:", error)
    }
  }

  /****************************** Return Logout Handler ******************************/
  return { logout }
}
