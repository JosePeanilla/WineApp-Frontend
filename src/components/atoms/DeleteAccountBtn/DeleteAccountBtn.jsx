/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import { useDeleteAccount } from "/src/hooks/useDeleteAccount"
import { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * DeleteAccountBtn:
 * Renders a button to allow the authenticated user to permanently delete their account.
 * - Prompts for confirmation before proceeding
 * - Calls deleteAccount hook and clears session on success
 * - Displays toast notifications and logs all actions
 **************************************************************************************************/
export const DeleteAccountBtn = () => {
  const logger = new Logger("DeleteAccountBtn")

  const { user, setToken, setUser } = useContext(AuthContext)
  const { deleteAccount } = useDeleteAccount()
  const navigate = useNavigate()

  /*************************************** Delete Handler ***************************************/
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")
    
    if (!confirmDelete) {
      logger.info("User canceled account deletion.")
      notify.info("Has cancelado la eliminación de cuenta.")
      return
    }

    logger.info("User confirmed account deletion.")
    notify.info("Cuenta en proceso de eliminación...")

    const result = await deleteAccount(user.id, user.role)

    if (result.success) {
      logger.info(`Account successfully deleted for user ID: ${user.id}`)
      notify.info("Cuenta eliminada exitosamente.")
      
      localStorage.removeItem("token")
      setToken(null)
      setUser(null)
      navigate("/")
      window.location.reload()
    } else {
      logger.error(`Failed to delete account for user ID: ${user.id}`, result.error)
      notify.error(`Error al eliminar la cuenta: ${result.error}`)
    }
  }

  /*************************************** Render Button ***************************************/
  return (
    <Button 
      onClick={handleDeleteAccount} 
      variant="eliminar"
      style={{ marginTop: "2rem" }}
    >
      Eliminar Cuenta
    </Button>
  )
}
