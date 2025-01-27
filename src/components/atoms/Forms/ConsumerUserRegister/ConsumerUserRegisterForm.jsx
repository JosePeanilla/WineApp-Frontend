import "../Forms.css"

import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"

/* Internal logger */
import { Logger } from "/src/utils/Logger.jsx"

export const ConsumerUserRegisterForm = () => {
  const logger = new Logger(useLocation().pathname)
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (formsData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/consumers`, {
        body: JSON.stringify(formsData),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      })
      const newConsumerUser = await response.json()
      if (!response.ok) throw new Error(newConsumerUser.msg)
        localStorage.setItem("token", newConsumerUser.token)
      logger.debug("Consumer user created successfully, with ID:", newConsumerUser.ID)
      alert("[SUCCESS] Consumer user created successfully!")
      navigate('/')
    } catch (error) {
      logger.error("Consumer user could not be created!\n", error)
      alert(`[ERROR] Consumer user could not be created!\n${error}`)
    }
  }, [])

  const { formState, handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: ""
    }
  })

  const requiredFieldErrorMessage = "Este campo es necesario, por favor rellénalo."
  return (
    <section>
      <h4>Showing NEW Consumer User Form</h4>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Name field */}
        <div>
          <label htmlFor="name">Nombre:</label>
          <input name="name" type="text" {...register("name", {
            required: { message: requiredFieldErrorMessage, value: true }
          })}/>
          {formState.errors.name && <p className="forms_field_error">{formState.errors.name.message}</p>}
        </div>
        {/* Surname field */}
        <div>
          <label htmlFor="surname">Apellidos:</label>
          <input name="surname" type="text" {...register("surname", {
            required: { message: requiredFieldErrorMessage, value: true }
          })}/>
          {formState.errors.surname && <p className="forms_field_error">{formState.errors.surname.message}</p>}
        </div>
        {/* Email field */}
        <div>
          <label htmlFor="email">Correo Electrónico:</label>  
          <input name="email" type="email" {...register("email", {
             required: { message: requiredFieldErrorMessage, value: true },          
          })} />
          {formState.errors.email && <p className="forms_field_error">{formState.errors.email.message}</p>}  
        </div>
        {/* Password field */}
        <div>
          <label htmlFor="password">Contraseña:</label>  
          <input name="password" 
          type="password" 
          {...register("password", {
            required: { message: requiredFieldErrorMessage, value: true },
          })} />
          {formState.errors.password && <p className="forms_field_error">{formState.errors.password.message}</p>}
        </div>
        <button type="submit">Crear usuario</button>
      </form>
    </section>
  )
}
