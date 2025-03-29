/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useValidatePassword Hook:
 * Provides a utility function to validate password strength using regex.
 * - Requires at least 8 characters
 * - Must include at least one uppercase letter and one number
 * - Allows special characters
 * - Returns true if valid, or a specific error message if invalid
 * - Logs errors with a consistent logger instance
 **************************************************************************************************/
export const useValidatePassword = () => {
  const logger = new Logger("useValidatePassword")

  /****************************** Password Format Validator ******************************/
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/

    if (passwordRegex.test(password)) return true

    const errorText = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número. Puede incluir caracteres especiales."
    logger.error(errorText)
    return errorText
  }

  /****************************** Return Validator ******************************/
  return { validatePassword }
}
