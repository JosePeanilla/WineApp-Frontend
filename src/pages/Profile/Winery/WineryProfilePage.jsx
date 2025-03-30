/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

/************************************************** Internal context and components ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { WineryProfileForm } from "/src/components/organisms/Profile/Winery"
import { EmailChangeForm } from "/src/components/molecules/Profile/Form/EmailChangeForm"
import { PasswordChangeForm } from "/src/components/molecules/Profile/Form/PasswordChangeForm"
import { DeleteAccountBtn } from "/src/components/atoms/DeleteAccountBtn"

/**************************************************************************************************
 * WineryProfilePage Component:
 * This page allows authenticated users with the "wineries" role to:
 * - Edit their winery profile data
 * - Change their email or password
 * - Delete their account
 * It includes toggleable forms for updating sensitive account information,
 * and prevents access if the user is not a winery.
 **************************************************************************************************/
export const WineryProfilePage = () => {
  const logger = new Logger("WineryProfilePage")

  /****************************** Context and Routing ******************************/
  const { user, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  /****************************** Local UI State ******************************/
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  /****************************** Authorization Check ******************************/
  /*
   * Prevent access to the profile if the user is not authenticated or doesn't have the "wineries" role.
   */
  if (!user || user.role !== "wineries") return <h2>Cargando perfil...</h2>

  /****************************** Toggle Handlers ******************************/
  const toggleEmailForm = () => setShowEmailForm((prev) => !prev)
  const togglePasswordForm = () => setShowPasswordForm((prev) => !prev)

  /****************************** Render Winery Profile Page ******************************/
  return (
    <section id="profile_page" className="flex flex-col items-center">
      {/* Page Title */}
      <h2 className="my-4">Editar perfil de bodega</h2>

      {/* Winery Profile Form */}
      <WineryProfileForm
        user={user}
        setToken={setToken}
        navigate={navigate}
        logger={logger}
      />

      {/* Email Change Toggle Button */}
      <button
        onClick={toggleEmailForm}
        className={`mt-4 ${
          showEmailForm
            ? "btn bg-wineapp-ligero text-white"
            : "text-black hover:text-gray-700"
        }`}
      >
        {showEmailForm ? "Cancelar" : "Modificar Email"}
      </button>

      {/* Email Change Form */}
      {showEmailForm && (
        <EmailChangeForm
          user={user}
          setUser={setUser}
          setShowEmailForm={setShowEmailForm}
        />
      )}

      {/* Password Change Toggle Button */}
      <button
        onClick={togglePasswordForm}
        className={`mt-4 ${
          showPasswordForm
            ? "btn bg-wineapp-ligero text-white"
            : "text-black hover:text-gray-700"
        }`}
      >
        {showPasswordForm ? "Cancelar" : "Modificar Contraseña"}
      </button>

      {/* Password Change Form */}
      {showPasswordForm && (
        <PasswordChangeForm
          user={user}
          setUser={setUser}
          setShowPasswordForm={setShowPasswordForm}
        />
      )}

      {/* Delete Account Button */}
      <DeleteAccountBtn />
    </section>
  )
}
