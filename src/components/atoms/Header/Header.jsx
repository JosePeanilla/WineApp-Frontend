import { NavLink } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "/src/context/AuthContext"
import { LogoutBtn } from "/src/components/atoms/LogoutBtn"

export const Header = () => {
  const { user } = useContext(AuthContext)

  return (
<div className="navbar bg-white text-wineapp-muyfuerte">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 bg-wineapp-muyligero">
        <li><NavLink to="/">Como funciona?</NavLink></li>
        <li><NavLink to="/wines">Vinos</NavLink></li>
        <li><NavLink to="/regions">Regiones</NavLink></li>
        <li><NavLink to="/news">Noticias</NavLink></li>
        {!user && (
          <div>
        <li> <NavLink className="btn bg-wineapp-moderado text-white mr-3 btn-sm w-full" to="/register">Registrarse</NavLink></li>
        <li><NavLink className="btn bg-wineapp-ligero text-white btn-sm" to="/login">Iniciar Sesión</NavLink></li>
          </div>
                   )}
        {user && (
        <LogoutBtn />
        )}
      </ul>
  </div>
    <NavLink className="text-xl text-wineapp-muyfuerte font-bold" to="/">Wine<span className="text-wineapp-ligero">App</span></NavLink>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-2">
      <li className="primary-active-wineapp-ligero"><NavLink to="/">Como funciona?</NavLink></li>
      <li><NavLink to="/wines">Vinos</NavLink></li>
      <li><NavLink to="/regions">Regiones</NavLink></li>
      <li><NavLink to="/news">Noticias</NavLink></li>
    </ul>
  </div>
  {!user && (
  <div id="user_register_login" className="navbar-end max-sm:hidden">
      <NavLink className="btn bg-wineapp-moderado text-white mr-3" to="/register">Registrarse</NavLink>
      <NavLink className="btn bg-wineapp-ligero text-white" to="/login">Iniciar Sesión</NavLink>
    </div>
    )}
    {user && (
    <LogoutBtn />
    )}
</div>
  )
}
