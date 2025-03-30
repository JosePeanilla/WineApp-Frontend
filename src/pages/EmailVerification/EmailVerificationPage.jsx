/************************************************** External Dependencies ***************************************************/
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

/**************************************************************************************************
 * EmailVerificationPage:
 * This component displays the result of email verification.
 * - It extracts the "msg" parameter from the URL query string.
 * - Shows appropriate success or error message.
 * - Provides a button to navigate to the login page.
 **************************************************************************************************/

export const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()                               // For programmatic navigation
  const [message, setMessage] = useState("Verificando tu cuenta...")  // Message state

  /*************************************** Parse Query Parameters on Mount ***************************************/
  useEffect(() => {
    const msgFromQuery = searchParams.get("msg")

    if (msgFromQuery) {
      setMessage(msgFromQuery)
    } else {
      setMessage("Token inválido o no proporcionado.")
    }
  }, [searchParams])

  /*************************************** Handle Navigation to Login ***************************************/
  const handleGoToLogin = () => {
    navigate("/login")
  }

  /*************************************** Render Verification Result ***************************************/
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">Verificación de Email</h1>
      <p className="text-lg mb-6">{message}</p>

      {/* Login navigation button */}
      <button
        onClick={handleGoToLogin}
        className="bg-[#8B0000] hover:bg-red-800 text-white font-semibold py-2 px-4 rounded transition"
      >
        Ir a Iniciar Sesión
      </button>
    </div>
  )
}
