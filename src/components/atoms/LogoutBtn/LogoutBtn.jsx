/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"

/************************************************** Context & Custom Hooks ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { useLogout } from "/src/hooks/useLogout"

/**************************************************************************************************
 * LogoutBtn:
 * Renders a logout button that:
 * - Clears the authentication token and context
 * - Logs the action and shows feedback via toast
 * - Navigates to home and reloads the app
 **************************************************************************************************/
export const LogoutBtn = () => {
  const logger = new Logger("LogoutBtn")

  const { setToken } = useContext(AuthContext)              // Access context to clear token
  const { logout } = useLogout()                            // Custom hook to handle logout logic
  const navigate = useNavigate()                            // For redirection

  /*************************************** Handle Logout ***************************************/
  const handleLogout = useCallback(() => {
    try {
      logout()                                              // Remove token from localStorage
      setToken(null)                                        // Clear token in context
      logger.info("Usuario cerró sesión exitosamente.")
      notify.info("¡El usuario cerró la sesión con éxito!")

      if (window.location.pathname !== "/") navigate("/")   // Redirect to home if not already there
      window.location.reload()                              // Reload app to reset state
    } catch (error) {
      logger.error("Error al cerrar sesión:", error)
      notify.error("Hubo un error al cerrar la sesión.")
    }
  }, [logout, setToken, navigate, logger])

  /*************************************** Render Button ***************************************/
  return (
    <button
      className="btn bg-wineapp-ligero text-white"
      onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  )
}
