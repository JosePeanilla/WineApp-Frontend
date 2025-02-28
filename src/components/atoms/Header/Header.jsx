/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useEffect, useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { LogoutBtn } from "/src/components/atoms/LogoutBtn"
import { Button } from "/src/components/atoms/Form"

export const Header = () => {
  const logger = new Logger("Header")
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    logger.info("Componente Header cargado correctamente.")
  }, [logger])

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const newState = !prev
      logger.info(`Menú móvil ${newState ? "abierto" : "cerrado"}.`)
      return newState
    })
  }

  const closeDropdown = () => {
    setIsOpen(false)
    logger.info("Menú móvil cerrado desde un enlace.")
  }

  const handleLogoutMobile = () => {
    closeDropdown()
    localStorage.removeItem("token")
    logger.info("Usuario cerró sesión desde menú móvil.")
    navigate("/")
    window.location.reload()
  }

  return (
    <div className="navbar bg-white text-wineapp-muyfuerte px-6 flex justify-between items-center">
      
      {/* Menú hamburguesa en móviles */}
      <div className="lg:hidden">
        <div className="dropdown">
          <button 
            onClick={toggleDropdown} 
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>

          {isOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><NavLink to="/" onClick={closeDropdown}>Como funciona?</NavLink></li>
              <li><NavLink to="/wines" onClick={closeDropdown}>Vinos</NavLink></li>
              <li><NavLink to="/regions" onClick={closeDropdown}>Regiones</NavLink></li>
              <li><NavLink to="/news" onClick={closeDropdown}>Noticias</NavLink></li>

              {user?.role === "wineries" && ( 
                <li>
                  <NavLink 
                    className="btn bg-wineapp-fuerte text-white btn-sm w-full"
                    to="/wines/manage"
                    onClick={closeDropdown}
                  >
                    Gestionar Vinos
                  </NavLink>
                </li>
              )}

              {user ? (
                <>
                  <li>
                    <NavLink 
                      className="btn bg-wineapp-moderado text-white btn-sm w-full text-center"
                      to={user?.role === "consumers" ? "/profile/consumer" : "/profile/winery"}
                      onClick={closeDropdown}>
                      Modificar Perfil
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      className="btn bg-wineapp-ligero text-white btn-sm w-full"
                      onClick={handleLogoutMobile}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><NavLink className="btn bg-wineapp-moderado text-white btn-sm w-full" to="/register" onClick={closeDropdown}>Registrarse</NavLink></li>
                  <li><NavLink className="btn bg-wineapp-ligero text-white btn-sm w-full" to="/login" onClick={closeDropdown}>Iniciar Sesión</NavLink></li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
        <NavLink className="text-xl text-wineapp-muyfuerte font-bold" to="/">
          Wine<span className="text-wineapp-ligero">App</span>
        </NavLink>
      </div>

      {/* Menú principal en pantallas grandes */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-2">
          <li><NavLink to="/">Como funciona?</NavLink></li>
          <li><NavLink to="/wines">Vinos</NavLink></li>
          <li><NavLink to="/regions">Regiones</NavLink></li>
          <li><NavLink to="/news">Noticias</NavLink></li>

          
        </ul>
      </div>

      {/* Botones en la derecha SOLO en escritorio */}
      <div className="hidden lg:flex items-center gap-4">
        {user?.role === "wineries" && (
            <Button 
              variant="fuerte"
              className="btn bg-wineapp-fuerte text-white"
              onClick={() => navigate("/wines/manage")}
            >
              Gestionar Vinos
            </Button>
        )}
        {user ? (
          <>
            <NavLink 
              className="btn bg-wineapp-moderado text-white"
              to={user?.role === "consumers" ? "/profile/consumer" : "/profile/winery"}>
              Modificar Perfil
            </NavLink>
            <LogoutBtn />
          </>
        ) : (
          <>
            <NavLink className="btn bg-wineapp-moderado text-white" to="/register">
              Registrarse
            </NavLink>
            <NavLink className="btn bg-wineapp-ligero text-white" to="/login">
              Iniciar Sesión
            </NavLink>
          </>
        )}
      </div>
    </div>
  )
}
