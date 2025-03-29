/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useValidatePhone Hook:
 * - Accepts digits, spaces, '+', and '.' as valid characters
 * - Removes spaces and dots to count actual digits
 * - Validates that there are between 7 and 18 numeric digits
 **************************************************************************************************/
export const useValidatePhone = () => {
  const logger = new Logger("useValidatePhone")

  const validatePhone = (phone) => {
    if (!phone) {
      const emptyErrorText = "Debes introducir un número de teléfono válido."
      logger.error(emptyErrorText)
      return emptyErrorText
    }

    // Regex: solo permite números, espacios, puntos y '+' al inicio
    const formatRegex = /^\+?[0-9\s.]+$/
    if (!formatRegex.test(phone)) {
      const formatError = "El número solo debe contener dígitos, espacios, '+' y/o puntos ('.')."
      logger.error(formatError)
      return formatError
    }

    // Contar cuántos dígitos reales hay (ignorando espacios y puntos)
    const digitsOnly = phone.replace(/[^\d]/g, "") // remueve todo lo que no sea número
    if (digitsOnly.length < 7 || digitsOnly.length > 18) {
      const lengthError = "El número de teléfono debe tener entre 7 y 18 dígitos numéricos reales."
      logger.error(lengthError)
      return lengthError
    }

    return true
  }

  return { validatePhone }
}
