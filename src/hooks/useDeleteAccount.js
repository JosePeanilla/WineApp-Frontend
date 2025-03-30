/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useDeleteAccount Hook:
 * Handles user account deletion for both "consumers" and "wineries".
 * - Sends DELETE request to the appropriate backend endpoint
 * - Requires user ID and role to determine the endpoint path
 * - Includes Authorization header using token from localStorage
 * - Returns success or error result
 * - Logs actions and errors
 **************************************************************************************************/
export const useDeleteAccount = () => {
  const logger = new Logger("useDeleteAccount")

  /****************************** Delete Account Function ******************************/
  const deleteAccount = async (userId, role) => {
    // Validate inputs
    if (!userId || !role) {
      logger.error("Error: Usuario o rol no definidos.")
      return { error: "Usuario o rol no válidos." }
    }

    try {
      // Send DELETE request to API
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${role}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const jsonData = await response.json()

      // Check for unsuccessful response
      if (!response.ok) {
        throw new Error(jsonData.error || "Error desconocido al eliminar la cuenta")
      }

      logger.info(`Cuenta eliminada correctamente: ID ${userId}`)
      return { success: true }

    } catch (error) {
      logger.error("Error al eliminar la cuenta:", error)
      return { error: error.message || "Error desconocido al eliminar la cuenta" }
    }
  }

  /****************************** Return Handler ******************************/
  return { deleteAccount }
}
