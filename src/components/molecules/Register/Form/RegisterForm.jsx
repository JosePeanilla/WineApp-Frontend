/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useEffect } from "react"

import { useForm } from "react-hook-form"
import { FormContainer, Button } from "/src/components/atoms/Form"
import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { UserCredentials } from "/src/components/atoms/Register/Credentials"

export const RegisterForm = ({ formFields, formTitle, handleOnSubmit }) => {
  const logger = new Logger("RegisterForm")

  const { formState, handleSubmit, register, watch } = useForm({
    defaultValues: formFields.reduce((accumulator, field) => {
      accumulator[field.name] = field.default ? field.default : ""
      return accumulator
    }, {})
  })

  useEffect(() => {
    logger.info(`Formulario "${formTitle}" cargado correctamente.`)
  }, [logger, formTitle])

  const onSubmit = (data) => {
    logger.info(`Formulario "${formTitle}" enviado con datos:`, data)
    handleOnSubmit(data)
  }

  const onError = (errors) => {
    logger.error(`Errores en el formulario "${formTitle}":`, errors)
  }

  return (
    <section id="register_form">
      <h4>{formTitle}</h4>
      <FormContainer onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        {formFields.map((field, index) => (
          <div key={index}>
            <RegisterField
              register={register}
              required={field.required}
              {...field}
            />
            <FieldErrorP error={formState.errors[field.name]} />
          </div>
        ))}
        <UserCredentials
          formState={formState}
          is_register={true}
          register={register}
          section_id={"register_credentials"}
          watch={watch}
        />
        <Button variant="moderado" type="submit">
          Registrarse
        </Button>
        </FormContainer>
    </section>
  )
}
