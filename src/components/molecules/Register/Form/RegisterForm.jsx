import { useForm } from "react-hook-form"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterCredentials } from "/src/components/atoms/Register/Credentials"
import { RegisterField } from "/src/components/atoms/Register/Field"

export const RegisterForm = ({ formFields, formTitle, handleOnSubmit }) => {
  const { formState, handleSubmit, register, watch } = useForm({
    defaultValues: formFields.reduce((accumulator, field) => {
      accumulator[field.name] = field.default?field.default:""
      return accumulator
    }, {})
  })

  return (
    <section id="register_form">
      <h4>{formTitle}</h4>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {formFields.map((field, index) => (
          <div key={index}>
            <RegisterField
              register={register}
              {...field}
            />
            <FieldErrorP error={formState.errors[field.name]} />
          </div>
        ))}
        <RegisterCredentials
          formState={formState}
          register={register}
          watch={watch}
        />
        <button type="submit">Registrarse</button>
      </form>
    </section>
  )
}
