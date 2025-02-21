/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useNavigate } from "react-router-dom"

const logger = new Logger("WineCardActions")

export const WineCardActions = ({ wineId }) => {
  const navigate = useNavigate()

  if (!wineId) {
    logger.error("WineCardActions recibió un ID de vino inválido.")
    return null
  }

  logger.debug(`Renderizando botón de acción para el vino con ID: ${wineId}`)

  return (
    <div className="mt-auto flex justify-end p-4">
      <button
        className="btn btn-primary px-4 py-2 rounded-lg shadow-md"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/wines/${wineId}`)
        }}
      >
        Catar
      </button>
    </div>
  )
}
