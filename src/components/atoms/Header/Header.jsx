/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useEffect, useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion" // <-- Import Framer Motion

/************************************************** Context and UI Elements ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { LogoutBtn } from "/src/components/atoms/LogoutBtn"
import { Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * Header:
 * Main navigation bar of the application.
 * - Adapts layout for desktop and mobile
 * - Shows different options depending on authentication and user role
 * - Handles menu toggling, navigation and logout logic
 * - Includes animated hamburger icon with Framer Motion
 **************************************************************************************************/
export const Header = () => {
  const logger = new Logger("Header")
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  /*************************************** Mount Log ***************************************/
  useEffect(() => {
    logger.info("Header component mounted successfully.")
  }, [logger, isOpen])

  /*************************************** Close mobile menu on outside click ***************************************/
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      const menuButton = document.getElementById("mobile-menu-button")
      const menuContent = document.getElementById("mobile-menu-content")

      if (menuButton && !menuButton.contains(e.target) &&
          menuContent && !menuContent.contains(e.target)) {
        setIsOpen(false)
        logger.info("Mobile menu closed via outside click.")
      }
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen, logger])

  /*************************************** Toggle Mobile Dropdown ***************************************/
  const toggleDropdown = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setIsOpen(prev => {
      const newState = !prev
      logger.info(`Mobile menu ${newState ? "opened" : "closed"}.`)
      return newState
    })
  }

  /*************************************** Close Dropdown Manually ***************************************/
  const closeDropdown = () => {
    setIsOpen(false)
    logger.info("Mobile menu closed via menu item.")
  }

  /*************************************** Logout Handler (Mobile) ***************************************/
  const handleLogoutMobile = () => {
    closeDropdown()
    localStorage.removeItem("token")
    logger.info("User logged out from mobile menu.")
    navigate("/")
    window.location.reload()
  }

  /*************************************** Render Header UI ***************************************/
  return (
    <div className="navbar bg-white text-wineapp-muyfuerte px-6 flex justify-between items-center relative">
      
      {/* Mobile Hamburger Menu Button */}
      <div className="lg:hidden">
      <button 
          id="mobile-menu-button"
          onClick={toggleDropdown}
          className="btn btn-ghost lg:hidden p-3 z-20"
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

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu-content"
          className={`absolute top-[60px] left-2.5 w-[200px] bg-white z-50 rounded-lg 
                      shadow-md border border-gray-200 p-2 ${isOpen ? 'block' : 'hidden'}`}
        >
          <ul className="menu menu-sm w-full">
            <li><NavLink to="/" onClick={closeDropdown} className="py-2">¿Cómo funciona?</NavLink></li>
            <li><NavLink to="/wines" onClick={closeDropdown} className="py-2">Vinos</NavLink></li>
            <li><NavLink to="/regions" onClick={closeDropdown} className="py-2">Regiones</NavLink></li>
            <li><NavLink to="/news" onClick={closeDropdown} className="py-2">Noticias</NavLink></li>

            {user?.role === "wineries" && (
              <li className="mt-2">
                <NavLink 
                  className="btn bg-wineapp-fuerte text-white btn-sm w-full"
                  to="/wines/manage"
                  onClick={closeDropdown}
                >
                  Gestionar Vinos
                </NavLink>
              </li>
            )}

            {/* Auth Buttons - Mobile */}
            {user ? (
              <>
                <li className="mt-2">
                  <NavLink 
                    className="btn bg-wineapp-moderado text-white btn-sm w-full"
                    to={user?.role === "consumers" ? "/profile/consumer" : "/profile/winery"}
                    onClick={closeDropdown}
                  >
                    Modificar Perfil
                  </NavLink>
                </li>
                <li className="mt-2">
                  <button 
                    className="btn bg-wineapp-ligero text-white btn-sm w-full"
                    onClick={handleLogoutMobile}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mt-2"><NavLink className="btn bg-wineapp-moderado text-white btn-sm w-full" to="/register" onClick={closeDropdown}>Registrarse</NavLink></li>
                <li className="mt-2"><NavLink className="btn bg-wineapp-ligero text-white btn-sm w-full" to="/login" onClick={closeDropdown}>Iniciar Sesión</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Centered Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
        <NavLink className="text-xl text-wineapp-muyfuerte font-bold" to="/">
          Wine<span className="text-wineapp-ligero">App</span>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-2">
          <li><NavLink to="/">¿Cómo funciona?</NavLink></li>
          <li><NavLink to="/wines">Vinos</NavLink></li>
          <li><NavLink to="/regions">Regiones</NavLink></li>
          <li><NavLink to="/news">Noticias</NavLink></li>
        </ul>
      </div>

      {/* Desktop Auth/Action Buttons */}
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
              to={user?.role === "consumers" ? "/profile/consumer" : "/profile/winery"}
            >
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
