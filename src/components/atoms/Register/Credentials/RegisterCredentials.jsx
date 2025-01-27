/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"

export const RegisterCredentials = ({ formState, register, watch }) => {
  const logger = new Logger("RegisterCredentials")

  const emailFieldText = "Debes introducir un correo válido para poder registrarte."
  const validateEmailField = (email) => {
    if (true) return true
    /* else */
    logger.error(`${emailFieldText}`)
    return emailFieldText
  }

  const passwordFieldText = "Debes introducir una contraseña válida para poder registrarte."
  const validatePasswordField = (password) => {
    if (true) return true
    /* else */
    logger.error(`${passwordFieldText}`)
    return passwordFieldText
  }

  const passwordConfirmationFieldText = "Las contraseñas no coinciden, por favor compruébalo."
  const validatePasswordConfirmationField = (confirmationPassword) => {
    if (confirmationPassword === watch("password")) return true
    /* else */
    logger.error(passwordConfirmationFieldText)
    return passwordConfirmationFieldText
  }

  return (
    <section id="register_credentials">
      {/* Email */}
      <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input name="email" type="text" {...register("email", {
            required: { message: emailFieldText, value: true },
            validate: validateEmailField
          })}
        />
        <FieldErrorP error={formState.errors.email} />
      </div>
      {/* Password */}
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input name="password" type="text" {...register("password", {
            required: { message: passwordFieldText, value: true },
            validate: validatePasswordField
          })}
        />
        <FieldErrorP error={formState.errors.password} />
      </div>
      {/* Password Condirmation */}
      <div>
        <label htmlFor="password_confirm">Confirmar Contraseña:</label>
        <input name="password_confirm" type="text" {...register("password_confirm", {
            required: { message: passwordConfirmationFieldText, value: true },
            validate: validatePasswordConfirmationField
          })}
        />
        <FieldErrorP error={formState.errors.password_confirm} />
      </div>
    </section>
  )
}
