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
    <div className="min-h-screen flex items-center justify-center bg-[#f8e5ee] px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 mx-auto text-[#8B0000] mb-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 2v2h10V2H7zm10.97 5H6.03a7 7 0 0011.94 0zM4.19 5A9 9 0 0011 21v1H9v2h6v-2h-2v-1a9 9 0 006.81-16z" />
        </svg>

        <h1 className="text-3xl font-bold text-[#7b0d1e] mb-4">Verificación de Email</h1>
        <p className="text-lg text-[#7b0d1e] mb-6">{message}</p>

        {/* Login navigation button */}
        <button
          onClick={handleGoToLogin}
          className="bg-[#9f2042] hover:bg-[#7b0d1e] text-white font-semibold py-2 px-4 rounded transition"
        >
          Ir a Iniciar Sesión
        </button>
      </div>
    </div>
  )
}
