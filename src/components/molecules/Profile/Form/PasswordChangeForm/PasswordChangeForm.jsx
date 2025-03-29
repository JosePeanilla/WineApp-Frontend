/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useForm } from "react-hook-form"
import { useUpdatePassword } from "/src/hooks/useUpdatePassword"
import { useValidatePassword } from "/src/hooks/useValidatePassword"
import { notify } from "/src/utils/notifications"

/************************************************** UI Components ***************************************************/
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * PasswordChangeForm:
 * Form to update the user's password
 * - Validates password strength and confirmation
 * - Prevents password reuse or mismatches
 * - Displays validation and backend error messages
 **************************************************************************************************/
export const PasswordChangeForm = ({ user, setUser, setShowPasswordForm }) => {
  const logger = new Logger("PasswordChangeForm")

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { updatePassword } = useUpdatePassword()
  const { validatePassword } = useValidatePassword()

  /*************************************** Submit Handler ***************************************/
  const handlePasswordChange = async (data) => {
    logger.info("Password change form submitted.", data)

    if (!user?.id || !user?.role) {
      logger.error("Invalid user or undefined role.", user)
      notify.error("Error: Usuario no válido o rol indefinido.")
      return
    }

    if (data.new_password === data.current_password) {
      logger.warn("Attempt to reuse current password.")
      notify.warning("La nueva contraseña no puede ser igual a la actual.")
      return
    }

    // Optional: If password is stored in frontend state (which it shouldn't be)
    if (data.current_password !== user.password) {
      logger.warn("Provided current password does not match user password.")
      notify.warning("La contraseña actual no coincide con la registrada.")
      return
    }

    if (data.new_password !== data.confirm_new_password) {
      logger.warn("Password confirmation does not match.")
      notify.warning("La nueva contraseña y su confirmación no coinciden.")
      return
    }

    try {
      const response = await updatePassword(user.id, user.role, data.current_password, data.new_password)
      if (response.error) {
        logger.error("Failed to update password:", response.error)
        notify.error(`Error: ${response.error}`)
      } else {
        setUser({ ...user, password: data.new_password }) // Optional: avoid storing password client-side
        logger.info("Password updated successfully.")
        notify.info("Contraseña actualizada correctamente.")
        setShowPasswordForm(false)
      }
    } catch (err) {
      logger.error("Unexpected error while updating password:", err)
      notify.error("Error inesperado al actualizar la contraseña.")
    }
  }

  /*************************************** Validation Error Handler ***************************************/
  const onError = (errors) => {
    logger.error("Validation errors in password change form:", errors)
    const firstError = Object.values(errors)[0]
    const message = firstError?.message || "Error de validación"
    notify.warning(message)
  }

  /*************************************** Render Password Form ***************************************/
  return (
    <FormContainer onSubmit={handleSubmit(handlePasswordChange, onError)} className="password_form">
      <h3 className="password_form_title">Actualizar Contraseña</h3>

      {/* Current Password */}
      <RegisterField
        name="current_password"
        text="Contraseña Actual"
        type="password"
        register={register}
        required={true}
      />
      {errors.current_password && <FieldErrorP error={errors.current_password} />}

      {/* New Password */}
      <RegisterField
        name="new_password"
        text="Nueva Contraseña"
        type="password"
        register={register}
        required={true}
        validate={(value) => validatePassword(value)}
      />
      {errors.new_password && <FieldErrorP error={errors.new_password} />}

      {/* Confirm New Password */}
      <RegisterField
        name="confirm_new_password"
        text="Confirmar Nueva Contraseña"
        type="password"
        register={register}
        required={true}
        validate={(value) =>
          value === watch("new_password") || "La confirmación no coincide con la nueva contraseña."
        }
      />
      {errors.confirm_new_password && <FieldErrorP error={errors.confirm_new_password} />}

      {/* Submit Button */}
      <Button variant="moderado" type="submit" className="password_form_button">
        Guardar Contraseña
      </Button>
    </FormContainer>
  )
}
