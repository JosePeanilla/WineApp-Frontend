import "./Header.css"

import { NavLink } from "react-router-dom"
import { useAuth } from "/src/context/AuthContext"

export const Header = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header>
      <div id="logo">
        <img
          alt="Wine App logo"
          src="https://media.istockphoto.com/id/1142870345/es/vector/botella-de-vino-de-dibujos-animados-y-vidrio-emoji-icono-aislado.jpg?s=612x612&w=0&k=20&c=EyClkmXsVX5FjkXhuxi1YEwUZxA5qa6T-p_wAphhDpc="
        />
        <h1>Wine App</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </nav>
      <div id="user_register_login">
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button className="logout_button" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
