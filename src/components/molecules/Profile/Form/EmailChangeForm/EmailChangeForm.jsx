/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useForm } from "react-hook-form"
import { useUpdateEmail } from "/src/hooks/useUpdateEmail"
import { useValidateEmail } from "/src/hooks/useValidateEmail"
import { notify } from "/src/utils/notifications"

/************************************************** UI Components ***************************************************/
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * EmailChangeForm:
 * Form to allow the user to update their email address.
 * - Validates current and new emails
 * - Prevents redundant changes or mismatches
 * - Displays validation errors and success/failure notifications
 **************************************************************************************************/
export const EmailChangeForm = ({ user, setUser, setShowEmailForm }) => {
  const logger = new Logger("EmailChangeForm")

  const { register, handleSubmit, formState, watch } = useForm() 
  const { updateEmail } = useUpdateEmail()
  const { validateEmail } = useValidateEmail()

  /*************************************** Submit Handler ***************************************/
  const handleEmailChange = async (data) => {
    logger.info("Email change form submitted.", data)

    if (!user?.id || !user?.role) {
      logger.error("User not valid or role undefined.", user)
      notify.error("Error: Usuario no válido o rol indefinido.")
      return
    }

    if (data.new_email === user.email) {
      logger.warn("Attempted to change to same email.")
      notify.warning("La información que intentas introducir es la misma que tu perfil actual.")
      return
    }

    if (data.current_email !== user.email) {
      logger.warn("Current email does not match user email.")
      notify.warning("El email actual no coincide con el registrado.")
      return
    }

    if (data.new_email !== data.confirm_new_email) {
      logger.warn("New email and confirmation do not match.")
      notify.warning("El nuevo email y su confirmación no coinciden.")
      return
    }

    try {
      const response = await updateEmail(user.id, user.role, data.current_email, data.new_email || "")
      if (response.error) {
        logger.error("Error updating email:", response.error)
        notify.error(`Error: ${response.error}`)
      } else {
        setUser({ ...user, email: data.new_email })
        logger.info("Email updated successfully.")
        notify.info("Email actualizado correctamente.")
        setShowEmailForm(false)
      }
    } catch (err) {
      logger.error("Unexpected error updating email:", err)
      notify.error("Error inesperado al actualizar el email.")
    }
  }

  /*************************************** Validation Error Handler ***************************************/
  const onError = (errors) => {
    logger.error("Validation errors in email change form:", errors)
    const firstError = Object.values(errors)[0]
    const message = firstError?.message || "Error de validación"
    notify.warning(message)
  }

  /*************************************** Render Email Form ***************************************/
  return (
    <FormContainer onSubmit={handleSubmit(handleEmailChange, onError)} noValidate className="email_form">
      <h3 className="email_form_title">Actualizar Email</h3>
      
      <div>
        {/* Current Email */}
        <RegisterField
          name="current_email"
          text="Email Actual"
          type="email"
          register={register}
          required={true}
          validate={validateEmail}
          formState={formState} 
        />

        {/* New Email */}
        <RegisterField
          name="new_email"
          text="Nuevo Email"
          type="email"
          register={register}
          required={true}
          validate={validateEmail}
          formState={formState} 
        />

        {/* Confirm New Email */}
        <RegisterField
          name="confirm_new_email"
          text="Confirmar Nuevo Email"
          type="email"
          register={register}
          required={true}
          validate={(value) => value === watch("new_email") || "Los emails no coinciden"}
          formState={formState} 
        />
      </div>

      {/* Submit Button */}
      <Button variant="moderado" type="submit" className="email_form_button">
        Guardar Email
      </Button>
    </FormContainer>
  )
}
