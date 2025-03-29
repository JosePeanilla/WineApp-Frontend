/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** Validation Hooks ***************************************************/
import { useValidateEmail } from "/src/hooks/useValidateEmail"
import { useValidatePhone } from "/src/hooks/useValidatePhone"
import { useValidatePassword } from "/src/hooks/useValidatePassword"
import { useValidateWebsite } from "/src/hooks/useValidateWebsite"

/************************************************** UI Components & Utils ***************************************************/
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { Input } from "/src/components/atoms/Form"
import { america, europa } from "/src/utils/countries"

/**************************************************************************************************
 * RegisterField:
 * Reusable input component that handles various field types:
 * - Input, Select, Textarea
 * - Auto-validates depending on type (email, phone, password, etc.)
 * - Allows custom validation via props
 * - Supports default country list for selects
 * - Displays error messages using FieldErrorP
 **************************************************************************************************/
export const RegisterField = ({ 
  name,                  // Field name (used in register & error access)
  required = true,       // Is the field required
  register = () => {},   // react-hook-form register function
  text,                  // Label text
  type = "text",         // Field type (text, email, password, select, etc.)
  validate,              // Optional custom validate function
  formState,             // react-hook-form state object (to access errors)
  options = []           // Options for select input
}) => {
  const logger = new Logger("RegisterField")

  // Custom validators
  const { validateEmail } = useValidateEmail()
  const { validatePhone } = useValidatePhone()
  const { validatePassword } = useValidatePassword()
  const { validateWebsite } = useValidateWebsite()

  // Default required messages
  const requiredFieldErrorMessage = "Este campo es necesario, por favor rellénalo."
  const requiredNonBlankTextMessage = "Este campo debe ser rellenado, al menos, por algún carácter que no sea un espacio."

  /**
   * Basic non-empty string validator
   */
  const validateNonBlankTextInTextField = (field_text) => {
    if (typeof field_text === "number") {
      field_text = String(field_text)
    }
    if (typeof field_text !== "string") {
      logger.error("Invalid value type for field:", field_text)
      return "Error: Valor inválido."
    }
    if (field_text.trim().length > 0) return true
    logger.error(requiredNonBlankTextMessage)
    return requiredNonBlankTextMessage
  }

  /**
   * Get default validator based on field type
   */
  const getValidationFunction = () => {
    if (type === "email") return validateEmail
    if (type === "phone") return validatePhone
    if (type === "password") return validatePassword
    if (type === "url") return validateWebsite
    return required ? validateNonBlankTextInTextField : undefined
  }

  /**
   * Combines custom validate function with default validation logic
   */
  const combinedValidation = (value) => {
    if (validate) {
      const customResult = validate(value)
      if (customResult !== true) return customResult
    }
    const defaultValidation = getValidationFunction()
    return defaultValidation ? defaultValidation(value) : true
  }

  const fieldId = `field-${name}`
  const useDefaultCountries = type === "select" && options.length === 0

  /*************************************** Field Rendering ***************************************/
  return (
    <div>
      {/* Label */}
      <label htmlFor={fieldId} className="block font-medium">{text}:</label>
      
      {/* Select Field */}
      {type === "select" ? (
        <select 
          id={fieldId} 
          name={name} 
          {...register(name, {
            required: required ? { message: requiredFieldErrorMessage, value: true } : undefined
          })}
          className="p-2 w-full bg-white border rounded focus:outline-none"
        >
          <option value="">Selecciona una opción</option>

          {/* Default Country List */}
          {useDefaultCountries ? (
            <>
              <optgroup label="🌍 Europa">
                {europa.map((country, index) => (
                  <option key={`eu-${index}`} value={country}>{country}</option>
                ))}
              </optgroup>
              <optgroup label="🌍 América">
                {america.map((country, index) => (
                  <option key={`am-${index}`} value={country}>{country}</option>
                ))}
              </optgroup>
            </>
          ) : (
            options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))
          )}
        </select>

      ) : type === "textarea" ? (
        // Textarea Field
        <textarea
          id={fieldId}
          name={name}
          className="p-2 w-full bg-white border rounded focus:outline-none"
          {...register(name, {
            required: required ? { message: requiredFieldErrorMessage, value: true } : undefined,
          })}
          rows="4"
        />
      ) : (
        // Input Field (text, email, password, etc.)
        <Input
          id={fieldId}
          name={name}
          type={type}
          className="input input-bordered w-full max-w-xs"
          autoComplete="off"
          {...register(name, {
            required: required ? { message: requiredFieldErrorMessage, value: true } : undefined,
            validate: combinedValidation,
          })}
        />
      )}

      {/* Display validation errors */}
      <FieldErrorP error={formState?.errors[name]} />
    </div>
  )
}
