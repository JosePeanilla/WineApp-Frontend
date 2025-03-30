/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useValidateEmail Hook:
 * Provides a simple utility to validate email format using regex.
 * - Returns true if the email is valid
 * - Logs and returns a validation error message if invalid
 **************************************************************************************************/
export const useValidateEmail = () => {
  const logger = new Logger("useValidateEmail")

  /****************************** Email Format Validator ******************************/
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailRegex.test(email)) return true

    const errorMsg = "El correo electrónico debe tener un formato válido y un dominio. Ejemplo: 2s7Q4@example.com"
    logger.error(errorMsg)
    return errorMsg
  }

  /****************************** Return Validator ******************************/
  return { validateEmail }
}
