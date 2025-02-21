/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { createContext, useCallback, useEffect, useState } from "react"

const logger = new Logger("AuthContext")

export const AuthContext = createContext({
  setToken: () => {},
  setUser: () => {},
  user: null
})

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(async () => {
    if (!token) {
      logger.warn("Intento de obtener usuario sin token.")
      return
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` }
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

  useEffect(() => {
    fetchUser() 
  }, [fetchUser])

  return (
    <AuthContext.Provider value={{ setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
