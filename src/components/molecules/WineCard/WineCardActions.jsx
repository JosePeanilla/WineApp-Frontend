/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** Internal Components ***************************************************/
import { Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * WineCardActions Component
 *
 * Renders action buttons (Edit, Delete) for a wine card.
 * - Only shown when `showEditDelete` is true (e.g. for wineries managing their wines)
 *
 * Props:
 * - wineId: string | ID of the wine (required)
 * - showEditDelete: boolean | Whether to show edit/delete buttons (default: false)
 * - onEdit: function | Handler function to execute on edit click
 * - onDelete: function | Handler function to execute on delete click
 **************************************************************************************************/
const logger = new Logger("WineCardActions")

export const WineCardActions = ({ wineId, showEditDelete = false, onEdit, onDelete }) => {
  // Validation: wineId is required
  if (!wineId) {
    logger.error("WineCardActions recibió un ID de vino inválido.")
    return null
  }

  logger.debug(`Renderizando botón de acción para el vino con ID: ${wineId}`)

  return (
    <div className="w-full flex justify-center gap-4">
      {showEditDelete && (
        <>
          <Button variant="ligero" onClick={() => onEdit(wineId)}>
            Editar
          </Button>
          <Button variant="eliminar" onClick={() => onDelete(wineId)}>
            Eliminar
          </Button>
        </>
      )}
    </div>
  )
}
