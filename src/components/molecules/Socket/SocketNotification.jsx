/************************************************** Internal logger ***************************************************/
import { Logger } from '/src/utils/Logger.jsx'

/************************************************** External Dependencies ***************************************************/
import { useEffect } from 'react'

/************************************************** Internal Components & Utilities ***************************************************/
import { useSocket } from '/src/context/SocketContext'
import { notify } from "/src/utils/notifications"

/**************************************************************************************************
 * SocketNotifications Component
 * 
 * Responsible for handling real-time notifications using Socket.IO for winery users.
 * - Connects the user to their private "winery room"
 * - Listens for "new-review" events from the backend
 * - Displays toast notification when a new wine review is received
 * 
 * Props:
 * - user: Authenticated user object
 **************************************************************************************************/
const logger = new Logger("SocketNotifications")

export const SocketNotifications = ({ user }) => {
  const socket = useSocket()

  /*************************************** Socket Setup on Mount ***************************************/
  useEffect(() => {
    // Prevent setup if user or socket is not available
    if (!socket || !user || user.role !== "wineries") return

    // Join the specific winery room
    socket.emit("join-winery-room", user.id)
    logger.info(`Winery user with ID ${user.id} joined their room.`)

    // Listen for new review events
    socket.on("new-review", (data) => {
      logger.info("New review received via socket:", data)
      notify.info(`¡Nueva valoración para "${data.wine.name}"!`)
    })

    // Cleanup: Remove the event listener on unmount
    return () => {
      socket.off("new-review")
    }
  }, [socket, user])

  /*************************************** No UI - purely logical component ***************************************/
  return null
}
