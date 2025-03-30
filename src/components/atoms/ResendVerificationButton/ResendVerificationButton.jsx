/************************************************** External Dependencies ***************************************************/
import { useState } from "react"
import { notify } from "/src/utils/notifications"

/**************************************************************************************************
 * ResendVerificationButton:
 * Renders a button that allows the user to request a new verification email.
 * - Sends a POST request to the backend with the user's email
 * - Displays success/error notifications based on the server response
 * - Disables the button after sending the email to prevent spam
 * - Works seamlessly in both local and production environments
 **************************************************************************************************/

// Determine the backend URL depending on environment (local or deployed)
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

export const ResendVerificationButton = ({ email }) => {
  const [loading, setLoading] = useState(false)  // Track loading state for the request
  const [sent, setSent] = useState(false)        // Prevent multiple sends once successful

  /*************************************** Resend Email Handler ***************************************/
  const handleResend = async () => {
    if (!email) {
      return notify.error("No se proporcionó un email.")
    }

    setLoading(true)

    try {
      const response = await fetch(`${backendUrl}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error.")
      }

      notify.success(data.message)
      notify.info("Revisa tu correo electrónico y haz clic en el enlace para verificar tu cuenta.")
      setSent(true)
    } catch (error) {
      notify.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  /****************************************** Render Button or Success Message ******************************************/
  if (sent) {
    return (
      <p className="mt-2 text-sm text-green-700">
        ✉️ El correo de verificación fue reenviado correctamente.
      </p>
    )
  }

  return (
    <button
      onClick={handleResend}
      className="mt-2 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Enviando..." : "Reenviar verificación"}
    </button>
  )
}
