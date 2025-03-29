/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React, { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

/**************************************************************************************************
 * SocketContext:
 * Provides a global WebSocket connection (via Socket.io) across the entire application.
 * - Initializes and manages the socket lifecycle
 * - Shares the socket instance through React Context
 * - Logs connection events and errors
 **************************************************************************************************/
const logger = new Logger("SocketContext")

/****************************************** Context Creation ******************************************/
const SocketContext = createContext()

/**************************************************************************************************
 * SocketProvider:
 * Wraps the app and sets up the socket connection using environment configuration.
 * - Listens to connection and error events
 * - Cleans up socket on unmount
 **************************************************************************************************/
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    logger.info("Initializing Socket.io connection...")

    const newSocket = io(import.meta.env.VITE_SERVER_URL, {
      transports: ["websocket"], // Optional: enforce WebSocket only
    })

    newSocket.on("connect", () => {
      logger.info(`Socket connected successfully: ${newSocket.id}`)
    })

    newSocket.on("connect_error", (error) => {
      logger.error("Socket connection error:", error)
    })

    setSocket(newSocket)

    return () => {
      logger.info("Closing Socket.io connection...")
      newSocket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

/**************************************************************************************************
 * useSocket:
 * Custom hook to access the current socket instance from any component.
 **************************************************************************************************/
export const useSocket = () => {
  return useContext(SocketContext)
}
