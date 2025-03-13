/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { Button } from "/src/components/atoms/Form"

const logger = new Logger("WineCardActions")

export const WineCardActions = ({ wineId, showEditDelete = false, onEdit, onDelete }) => {

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
