/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useEffect } from "react"
import { useForm } from "react-hook-form"

/************************************************** UI Components ***************************************************/
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { useValidatePhone } from "/src/hooks/useValidatePhone"
import { FormContainer, Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * ProfileForm:
 * Generic profile editing form for user or winery
 * - Dynamically renders fields based on props
 * - Pre-fills user data on mount
 * - Handles field-specific validation (e.g. phone)
 * - Uses react-hook-form for validation and submission
 **************************************************************************************************/
export const ProfileForm = ({ formFields, formTitle, user, handleOnSubmit }) => {
  const logger = new Logger("ProfileForm")

  const { formState, handleSubmit, register, setValue } = useForm()
  const { validatePhone } = useValidatePhone()

  /*************************************** Initialize Form Values from User ***************************************/
  useEffect(() => {
    logger.info(`Form "${formTitle}" mounted successfully.`)

    if (user) {
      Object.keys(user).forEach(key => {
        // Avoid overwriting dirty fields
        if (!formState.dirtyFields[key]) {
          setValue(key, user[key])
        }
      })
      logger.debug("Initial form values set using user data:", user)
    }
  }, [user, formTitle, setValue, formState.dirtyFields, logger])

  /*************************************** Form Submit Handler ***************************************/
  const onSubmit = (data) => {
    logger.info(`Form "${formTitle}" submitted with data:`, data)
    handleOnSubmit(data)
  }

  /*************************************** Validation Error Handler ***************************************/
  const onError = (errors) => {
    logger.error(`Validation errors in form "${formTitle}":`, errors)
  }

  /*************************************** Render Profile Form ***************************************/
  return (
    <section id="profile_form">
      <h4>{formTitle}</h4>
      <FormContainer onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        {formFields.map(({ name, text, required = true, type = "text", options = [] }) => (
          <div key={name}>
            {/* Reusable Register Field with optional phone validator */}
            <RegisterField
              name={name}
              text={text}
              register={register}
              required={required}
              formState={formState}
              validate={type === "phone" ? validatePhone : undefined}
              type={type}
              options={options}
            />
            {/* Display error if present */}
            {formState.errors[name] && (
              <FieldErrorP message={formState.errors[name].message} />
            )}
          </div>
        ))}
        <Button variant="moderado" type="submit">Guardar Cambios</Button>
      </FormContainer>
    </section>
  )
}
