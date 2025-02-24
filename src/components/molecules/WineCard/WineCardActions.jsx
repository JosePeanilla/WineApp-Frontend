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
    <div className="w-full flex justify-center">
      <button
        className="btn bg-wineapp-moderado text-white px-4 py-2 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
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
