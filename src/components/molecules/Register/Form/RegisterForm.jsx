/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useEffect } from "react"
import { useForm } from "react-hook-form"

/************************************************** Internal Components ***************************************************/
import { FormContainer, Button } from "/src/components/atoms/Form"
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { UserCredentials } from "/src/components/atoms/Register/Credentials"

/**************************************************************************************************
 * RegisterForm Component
 * 
 * Dynamic and reusable registration form component.
 * - Receives custom fields as props (formFields)
 * - Includes reusable email/password credential block
 * - Uses react-hook-form for validation and error handling
 * - Logs key lifecycle events and actions
 * 
 * Props:
 * - formFields: Array of field configurations (name, type, label, etc.)
 * - formTitle: Form title string
 * - handleOnSubmit: Callback to handle successful form submission
 **************************************************************************************************/
export const RegisterForm = ({ formFields, formTitle, handleOnSubmit }) => {
  const logger = new Logger("RegisterForm")

  /*************************************** React Hook Form Setup ***************************************/
  const {
    formState,
    handleSubmit,
    register,
    watch
  } = useForm({
    defaultValues: formFields.reduce((acc, field) => {
      acc[field.name] = field.default || ""
      return acc
    }, {})
  })

  /*************************************** Log Component Mount ***************************************/
  useEffect(() => {
    logger.info(`Form "${formTitle}" loaded successfully.`)
  }, [logger, formTitle])

  /*************************************** Handle Successful Form Submission ***************************************/
  const onSubmit = (data) => {
    logger.info(`Form "${formTitle}" submitted with data:`, data)
    handleOnSubmit(data)
  }

  /*************************************** Handle Validation Errors ***************************************/
  const onError = (errors) => {
    logger.error(`Validation errors in form "${formTitle}":`, errors)
  }

  /*************************************** Render Component ***************************************/
  return (
    <section id="register_form">
      {/* Form Title */}
      <h4>{formTitle}</h4>

      {/* Form Container with internal submit logic */}
      <FormContainer onSubmit={handleSubmit(onSubmit, onError)} noValidate>

        {/* Loop through provided fields and render each */}
        {formFields.map((field, index) => (
          <div key={index}>
            <RegisterField
              register={register}
              required={field.required}
              type={field.type}
              options={field.options || []}
              {...field}
            />
            {/* Field-level error message */}
            <FieldErrorP error={formState.errors[field.name]} />
          </div>
        ))}

        {/* Reusable credentials block for email + password + confirm */}
        <UserCredentials
          formState={formState}
          is_register={true}              // Enables password confirmation
          register={register}
          section_id={"register_credentials"}
          watch={watch}                  // Used to validate confirm password
        />

        {/* Submit Button */}
        <Button variant="moderado" type="submit">
          Registrarse
        </Button>
      </FormContainer>
    </section>
  )
}
