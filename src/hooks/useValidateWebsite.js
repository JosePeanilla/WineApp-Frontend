/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useValidateWebsite Hook:
 * Validates the format of a website URL.
 * - Accepts optional protocols (http or https)
 * - Accepts optional 'www.'
 * - Accepts domain names with standard extensions (e.g., .com, .org)
 * - Allows additional URL path or query parameters
 * - If empty, it's considered valid (i.e. optional field)
 **************************************************************************************************/
export const useValidateWebsite = () => {
  const logger = new Logger("useValidateWebsite")

  /****************************** Website Format Validator ******************************/
  const validateWebsite = (url) => {
    if (!url) return true // Campo opcional, no requiere validación si está vacío

    // Regex para validar URL (protocolo opcional + dominio + path opcional)
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\S*)?$/

    if (websiteRegex.test(url)) return true

    const errorText = "Debe ser una URL válida (ejemplo: https://example.com)"
    logger.error(errorText)
    return errorText
  }

  /****************************** Return Validator ******************************/
  return { validateWebsite }
}
