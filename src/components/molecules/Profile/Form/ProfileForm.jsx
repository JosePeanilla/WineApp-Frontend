/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { useValidatePhone } from "/src/hooks/useValidatePhone"
import { FormContainer, Button } from "/src/components/atoms/Form"

export const ProfileForm = ({ formFields, formTitle, user, handleOnSubmit }) => {
    const logger = new Logger("ProfileForm")

    const { formState, handleSubmit, register, setValue } = useForm()
    const { validatePhone } = useValidatePhone()

    useEffect(() => {
        logger.info(`Formulario "${formTitle}" cargado correctamente.`)
        if (user) {
            Object.keys(user).forEach(key => {
                if (!formState.dirtyFields[key]) {
                    setValue(key, user[key])
                }
            })
            logger.debug("Valores iniciales del formulario establecidos con datos del usuario:", user)
        }
    }, [user, formTitle, setValue, formState.dirtyFields, logger])

    const onSubmit = (data) => {
        logger.info(`Formulario "${formTitle}" enviado con datos:`, data)
        handleOnSubmit(data)
    }

    const onError = (errors) => {
        logger.error(`Errores en el formulario "${formTitle}":`, errors)
    }

    return (
        <section id="profile_form">
            <h4>{formTitle}</h4>
            <FormContainer onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                {formFields.map(({ name, text, required = true, type = "text" }) => (
                    <div key={name}>
                        <RegisterField
                            name={name}
                            text={text}
                            register={register}
                            required={required}
                            formState={formState}
                            validate={type === "phone" ? validatePhone : undefined} 
                            type={type} 
                        />
                        {formState.errors[name] && <FieldErrorP message={formState.errors[name].message} />}
                    </div>
                ))}
                <Button variant="moderado" type="submit">Guardar Cambios</Button>
            </FormContainer>
        </section>
    )
}
