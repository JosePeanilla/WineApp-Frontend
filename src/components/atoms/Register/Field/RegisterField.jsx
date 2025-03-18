/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useValidateEmail } from "/src/hooks/useValidateEmail"
import { useValidatePhone } from "/src/hooks/useValidatePhone"
import { useValidatePassword } from "/src/hooks/useValidatePassword"
import { useValidateWebsite } from "/src/hooks/useValidateWebsite"
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { Input } from "/src/components/atoms/Form"
import { america, europa } from "/src/utils/countries"

export const RegisterField = ({ 
  name, 
  required = true, 
  register = () => {}, 
  text, 
  type = "text", 
  validate, 
  formState, 
  options = [] 
}) => {
  const logger = new Logger("RegisterField")
  const { validateEmail } = useValidateEmail()
  const { validatePhone } = useValidatePhone()
  const { validatePassword } = useValidatePassword()
  const { validateWebsite } = useValidateWebsite()

  const requiredFieldErrorMessage = "Este campo es necesario, por favor rellénalo."
  const requiredNonBlankTextMessage = "Este campo debe ser rellenado, al menos, por algún carácter que no sea un espacio."

  const validateNonBlankTextInTextField = (field_text) => {
    if (typeof field_text === "number") {
      field_text = String(field_text)
    }
    if (typeof field_text !== "string") {
      logger.error("Error: El valor del campo no es un string válido.", field_text)
      return "Error: Valor inválido."
    }
    if (field_text.trim().length > 0) return true
    logger.error(`${requiredNonBlankTextMessage}`)
    return requiredNonBlankTextMessage
  }

  const getValidationFunction = () => {
    if (type === "email") return validateEmail
    if (type === "phone") return validatePhone
    if (type === "password") return validatePassword
    if (type === "url") return validateWebsite
    return required ? validateNonBlankTextInTextField : undefined
  }

  const fieldId = `field-${name}`

  const useDefaultCountries = type === "select" && options.length === 0
  
  return (
    <div>
      <label htmlFor={fieldId} className="block font-medium">{text}:</label>
      
      {type === "select" ? (
        <select 
          id={fieldId} 
          name={name} 
          {...register(name, {
            required: required ? { message: "Este campo es obligatorio.", value: true } : undefined
          })}
          className="p-2 w-full bg-white border rounded focus:outline-none"
        >
          <option value="">Selecciona una opción</option>

          {useDefaultCountries ? (
            <>
              <optgroup label="Europa">
                {europa.map((country, index) => (
                  <option key={`eu-${index}`} value={country}>{country}</option>
                ))}
              </optgroup>
              <optgroup label="América">
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
        <Input
          id={fieldId}
          name={name}
          type={type}
          className="input input-bordered w-full max-w-xs"
          autoComplete="off"
          {...register(name, {
            required: required ? { message: requiredFieldErrorMessage, value: true } : undefined,
            validate: getValidationFunction(),
          })}
        />
      )}

      <FieldErrorP error={formState?.errors[name]} />
    </div>
  )
}
