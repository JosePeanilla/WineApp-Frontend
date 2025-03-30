/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { createContext, useCallback, useEffect, useState } from "react"

/**************************************************************************************************
 * AuthContext:
 * Provides authentication state and utilities to the entire app.
 * - Stores the auth token and user info
 * - Retrieves the logged-in user based on the stored token
 * - Makes user and token management available through context
 **************************************************************************************************/
const logger = new Logger("AuthContext")

/*************************************** Context Creation ***************************************/
export const AuthContext = createContext({
  setToken: () => {},
  setUser: () => {},
  user: null
})

/*************************************** Provider Component ***************************************/
export const AuthProvider = ({ children }) => {
  // Token and user states
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  /*************************************** Fetch Current User ***************************************/
  const fetchUser = useCallback(async () => {
    if (!token) {
      logger.warn("Intento de obtener usuario sin token.")
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const jsonData = await response.json()

      if (jsonData.error) {
        logger.error("Error al obtener usuario:", jsonData.error)
        return
      }

      setUser({ id: jsonData.data._id, ...jsonData.data })
      logger.info("Usuario obtenido y almacenado correctamente.")
    } catch (error) {
      logger.error("Error en fetchUser:", error)
    }
  }, [token])

  /*************************************** Fetch user on mount or token change ***************************************/
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  /*************************************** Provide Context Values ***************************************/
  return (
    <AuthContext.Provider value={{ setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
