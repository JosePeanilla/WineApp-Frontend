/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useNavigate } from "react-router-dom"

const logger = new Logger("RegionCardActions")

export const RegionCardActions = ({ regionId }) => {
  const navigate = useNavigate()

  if (!regionId) {
    logger.error("RegionCardActions recibió un ID de región inválido.")
    return null
  }

  logger.debug(`Renderizando botón de acción para la región con ID: ${regionId}`)

  return (
    <div className="mt-auto flex justify-end p-4">
      <button
        className="btn btn-primary px-4 py-2 rounded-lg shadow-md"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/regions/${regionId}`)
        }}
      >
        Abre la puerta
      </button>
    </div>
  )
}