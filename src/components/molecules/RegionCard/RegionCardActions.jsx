/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useNavigate } from "react-router-dom"
import { Button } from "/src/components/atoms/Form"

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
      <Button
        variant="moderado"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/regions/${regionId}`)
        }}
      >
        Descubrir
      </Button>
    </div>
  )
}