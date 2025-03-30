/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** Internal components ***************************************************/
import { FormContainer, Button } from "/src/components/atoms/Form"
import { UserCredentials } from "/src/components/atoms/Register/Credentials"
import { ResendVerificationButton } from "/src/components/atoms/ResendVerificationButton" // ⬅️ Nuevo

/************************************************** External Dependencies ***************************************************/
import { useEffect, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

/************************************************** Internal context and hooks ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { useLogin } from "/src/hooks/useLogin"

/**************************************************************************************************
 * LoginPage Component:
 * This component renders the login form for users.
 * - Redirects to home if already authenticated.
 * - Uses react-hook-form for form handling.
 * - On successful login, stores token, logs the event, and redirects to the homepage.
 * - On error, shows notifications and logs the issue.
 **************************************************************************************************/
export const LoginPage = () => {
  const logger = new Logger("LoginPage")

  /****************************** Get Auth and Router Context ******************************/
  const { user, setToken } = useContext(AuthContext)
  const { formState, handleSubmit, register } = useForm()
  const { login } = useLogin()
  const navigate = useNavigate()

  /****************************** State for Resend Verification ******************************/
  const [submittedEmail, setSubmittedEmail] = useState(null)
  const [showResend, setShowResend] = useState(false)

  /****************************** Redirect if Already Logged In ******************************/
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  /****************************** Handle Form Submission ******************************/
  const handleOnSubmit = useCallback(async (formsData) => {
    setSubmittedEmail(formsData.email) // Guardamos el email
    const { error } = await login(formsData)

    if (!error) {
      setToken(localStorage.getItem("token"))
      logger.debug("User logged in successfully!")
      notify.success("¡El usuario ha iniciado sesión exitosamente!")
      navigate("/")
    } else {
      logger.error("Error en el inicio de sesión:", error)
      notify.error(`${error || "No se pudo iniciar sesión. Verifique sus credenciales e inténtelo de nuevo."}`)

      if (error.includes("no está verificada")) {
        setShowResend(true)
      }
    }
  }, [])

  /****************************** Render Login Page ******************************/
  return (
    <section id="login_page">
      {/* Page Title */}
      <h2 className="text-center text-xl font-bold mb-4">Iniciar Sesión</h2>

      {/* Login Form */}
      <FormContainer onSubmit={handleSubmit(handleOnSubmit)}>
        <UserCredentials
          formState={formState}
          register={register}
          section_id={"login_credentials"}
        />
        <Button variant="ligero" type="submit">
          Iniciar Sesión
        </Button>
      </FormContainer>

      {/* Resend Verification Button */}
      {showResend && submittedEmail && (
        <div className="mt-4 text-center">
          <p className="mb-2 text-sm text-gray-600">
            ¿No recibiste el correo de verificación?
          </p>
          <ResendVerificationButton email={submittedEmail} />
        </div>
      )}
    </section>
  )
}
