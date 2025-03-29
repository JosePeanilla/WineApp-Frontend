/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** Internal components ***************************************************/
import { FormContainer, Button } from "/src/components/atoms/Form"
import { UserCredentials } from "/src/components/atoms/Register/Credentials"

/************************************************** External Dependencies ***************************************************/
import { useEffect, useCallback, useContext } from "react"
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

  /****************************** Redirect if Already Logged In ******************************/
  /*
   * When the component mounts or when `user` changes,
   * if a user session exists, redirect to the homepage.
   */
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  /****************************** Handle Form Submission ******************************/
  /*
   * handleOnSubmit is triggered on form submission.
   * - Calls the login function from useLogin hook.
   * - If successful, retrieves the token, sets it in context, logs the success, and navigates home.
   * - If failed, logs the error and shows a notification.
   */
  const handleOnSubmit = useCallback(async (formsData) => {
    const { error } = await login(formsData)

    if (!error) {
      setToken(localStorage.getItem("token"))
      logger.debug("User logged in successfully!")
      notify.success("¡El usuario ha iniciado sesión exitosamente!")
      navigate("/")
    } else {
      logger.error("Error en el inicio de sesión:", error)
      notify.error(`${error || "No se pudo iniciar sesión. Verifique sus credenciales e inténtelo de nuevo."}`)
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
    </section>
  )
}
