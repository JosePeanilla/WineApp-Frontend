/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useUpdateEmail Hook:
 * Handles user email update process.
 * - Validates required parameters
 * - Sends PATCH request to backend with new and current email values
 * - Verifies user role to avoid invalid operations
 * - Logs all steps and returns success or error
 **************************************************************************************************/
export const useUpdateEmail = () => {
  const logger = new Logger("useUpdateEmail")

  /****************************** Update Email Function ******************************/
  const updateEmail = async (userId, role, currentEmail, newEmail) => {
    // Basic validation
    if (!userId || !newEmail || !currentEmail || !role) {
      logger.error("Faltan parámetros: userId, role, currentEmail o newEmail es undefined.")
      return { error: "Error: Datos de usuario, rol o email no definidos." }
    }

    // Validate role
    if (role !== "consumers" && role !== "wineries") {
      logger.error(`Rol inválido: ${role}`)
      return { error: "Error: Rol de usuario no válido." }
    }

    try {
      // Send PATCH request to backend
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${role}/${userId}/email`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_value: currentEmail,
            new_value: newEmail,
            confirm_new_value: newEmail, // Confirmation for backend double-check
          }),
        }
      )

      const jsonData = await response.json()

      if (!response.ok) throw jsonData

      logger.info(`Email actualizado correctamente para el usuario ${userId} con rol ${role}`)
      return { data: jsonData }

    } catch (error) {
      logger.error("Error en la solicitud de actualización de email:", error)
      return {
        error: error.message || "Error desconocido al actualizar el email"
      }
    }
  }

  /****************************** Return Update Email Handler ******************************/
  return { updateEmail }
}
