/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

/************************************************** Internal context and components ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { ConsumerProfileForm } from "/src/components/organisms/Profile/Consumer"
import { EmailChangeForm } from "/src/components/molecules/Profile/Form/EmailChangeForm"
import { PasswordChangeForm } from "/src/components/molecules/Profile/Form/PasswordChangeForm"
import { DeleteAccountBtn } from "/src/components/atoms/DeleteAccountBtn"

/**************************************************************************************************
 * ConsumerProfilePage Component:
 * Page for authenticated users with "consumers" role to:
 * - Edit their personal profile data
 * - Change their email or password
 * - Delete their account
 * It includes toggle logic to show/hide sensitive forms (email/password changes)
 * and redirects unauthorized users.
 **************************************************************************************************/
export const ConsumerProfilePage = () => {
  const logger = new Logger("ConsumerProfilePage")

  /****************************** Context and Router Hooks ******************************/
  const { user, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  /****************************** Local UI State ******************************/
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  /****************************** Authorization Check ******************************/
  /*
   * If there's no user or the user is not a "consumer", we assume the profile
   * should not be shown and display a loading message.
   */
  if (!user || user.role !== "consumers") return <h2>Cargando perfil...</h2>

  /****************************** Toggle Form Handlers ******************************/
  const toggleEmailForm = () => setShowEmailForm(prev => !prev)
  const togglePasswordForm = () => setShowPasswordForm(prev => !prev)

  /****************************** Render Consumer Profile Page ******************************/
  return (
    <section id="profile_page" className="flex flex-col items-center">
      {/* Page Title */}
      <h2 className="my-4">Editar perfil de consumidor</h2>

      {/* Consumer Profile Main Form */}
      <ConsumerProfileForm
        user={user}
        setToken={setToken}
        navigate={navigate}
        logger={logger}
      />

      {/* Toggle Email Change Form */}
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

      {showEmailForm && (
        <EmailChangeForm
          user={user}
          setUser={setUser}
          setShowEmailForm={setShowEmailForm}
        />
      )}

      {/* Toggle Password Change Form */}
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

      {showPasswordForm && (
        <PasswordChangeForm
          user={user}
          setUser={setUser}
          setShowPasswordForm={setShowPasswordForm}
        />
      )}

      {/* Delete Account Section */}
      <DeleteAccountBtn />
    </section>
  )
}
