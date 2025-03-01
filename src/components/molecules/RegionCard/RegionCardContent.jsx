/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("RegionCardContent")

export const RegionCardContent = ({ region }) => {
  if (!region) {
    logger.error("RegionCardContent recibió un objeto inválido.");
    return <p className="text-red-500">Error: Información de la región no disponible.</p>
  }

  logger.debug(`Mostrando contenido para: ${region.name}`)

  return (
    <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{region.name}</h2>
        <p className="text-gray-600">{region.country}</p>
      </div>
  )
}