/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** Validation Hooks ***************************************************/
import { useValidateEmail } from "/src/hooks/useValidateEmail"
import { useValidatePassword } from "/src/hooks/useValidatePassword"

/************************************************** UI Components ***************************************************/
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { Input } from "/src/components/atoms/Form"

/**************************************************************************************************
 * UserCredentials:
 * Reusable form component to render email and password input fields.
 * - Supports both login and register forms
 * - Includes validation using custom hooks
 * - Shows password confirmation field only in register mode
 **************************************************************************************************/
export const UserCredentials = ({ formState, is_register = false, register, section_id, watch = null }) => {
  const logger = new Logger("UserCredentials")
  const { validateEmail } = useValidateEmail()
  const { validatePassword } = useValidatePassword()

  // Local field error texts (used if custom error logic is added later)
  const emailFieldText = "Debes introducir un correo válido."
  const validateEmailField = (email) => {
    if (true) return true
    logger.error(`${emailFieldText}`)
    return emailFieldText
  }

  const passwordFieldText = "Debes introducir una contraseña válida."
  const validatePasswordField = (password) => {
    if (true) return true
    logger.error(`${passwordFieldText}`)
    return passwordFieldText
  }

  const passwordConfirmationFieldText = "Las contraseñas no coinciden, por favor compruébalo."
  const validatePasswordConfirmationField = (confirmationPassword) => {
    if (confirmationPassword === watch("password")) return true
    logger.error(passwordConfirmationFieldText)
    return passwordConfirmationFieldText
  }

  return (
    <section id={section_id} className="w-full max-w-md mx-auto">

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium">Correo electrónico:</label>
        <Input
          id="email"
          name="email"
          autoComplete="off"
          className="w-full"
          {...register("email", {
            required: { message: emailFieldText, value: true },
            validate: validateEmail
          })}
        />
        <FieldErrorP error={formState.errors.email} />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium">Contraseña:</label>
        <Input
          id="password"
          name="password"
          type="password"
          className="w-full"
          {...register("password", {
            required: { message: passwordFieldText, value: true },
            validate: validatePassword
          })}
        />
        <FieldErrorP error={formState.errors.password} />
      </div>

      {/* Password Confirmation Field (Only for Register Form) */}
      {is_register && (
        <div className="mb-4">
          <label htmlFor="password_confirm" className="block font-medium">Confirmar Contraseña:</label>
          <Input
            id="password_confirm"
            name="password_confirm"
            type="password"
            className="w-full"
            {...register("password_confirm", {
              required: { message: passwordConfirmationFieldText, value: true },
              validate: validatePasswordConfirmationField
            })}
          />
          <FieldErrorP error={formState.errors.password_confirm} />
        </div>
      )}
      
    </section>
  )
}
