/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { useLogout } from "/src/hooks/useLogout"

export const LogoutBtn = () => {
  const { setToken } = useContext(AuthContext)
  const { logout } = useLogout()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    setToken(null)
    alert("[SUCCESS] ¡El usuario cerró la sesión con éxito!")
    if (window.location !== "/") navigate('/')
    window.location.reload()
  }, [])

  return (
    <button
      className="btn bg-wineapp-ligero text-white"
      onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  )
}
