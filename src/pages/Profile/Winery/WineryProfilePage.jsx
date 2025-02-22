/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { WineryProfileForm } from "/src/components/organisms/Profile/Winery"
import { EmailChangeForm } from "/src/components/molecules/Profile/Form/EmailChangeForm"
import { PasswordChangeForm } from "/src/components/molecules/Profile/Form/PasswordChangeForm"

import { DeleteAccountBtn } from "/src/components/atoms/DeleteAccountBtn"

export const WineryProfilePage = () => {
  const logger = new Logger("WineryProfilePage")
  const { user, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  if (!user || user.role !== "wineries") return <h2>Cargando perfil...</h2>

  const toggleEmailForm = () => {
    setShowEmailForm((prev) => !prev)
  }

  const togglePasswordForm = () => {
    setShowPasswordForm((prev) => !prev)
  }

  return (
    <section id="profile_page" className="flex flex-col items-center">
      <h2 className="my-4">Editar perfil de bodega</h2>

      <WineryProfileForm
        user={user}
        setToken={setToken}
        navigate={navigate}
        logger={logger}
      />

      <button
        onClick={toggleEmailForm}
        className={`mt-4 ${showEmailForm ? "btn bg-wineapp-ligero text-white" : "text-black hover:text-gray-700"}`}
      >
        {showEmailForm ? "Cancelar" : "Modificar Email"}
      </button>

      {showEmailForm && (
          <EmailChangeForm user={user} setUser={setUser} setShowEmailForm={setShowEmailForm} />
      )}

      <button
        onClick={togglePasswordForm}
        className={`mt-4 ${showPasswordForm ? "btn bg-wineapp-ligero text-white" : "text-black hover:text-gray-700"}`}
      >
        {showPasswordForm ? "Cancelar" : "Modificar Contraseña"}
      </button>

      {showPasswordForm && (
          <PasswordChangeForm user={user} setUser={setUser} setShowPasswordForm={setShowPasswordForm} />
      )}

      <DeleteAccountBtn />
    </section>
  )
}
