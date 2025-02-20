/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("WineCardContent")

export const WineCardContent = ({ wine }) => {
  if (!wine) {
    logger.error("WineCardContent recibió un objeto inválido.");
    return <p className="text-red-500">Error: Información del vino no disponible.</p>
  }

  logger.debug(`Mostrando contenido para: ${wine.name}`)

  return (
    <div className="card-body text-center p-4">
      <h2 className="card-title text-lg font-semibold">{wine.name || "Nombre no disponible"}</h2>
      <p className="text-sm text-gray-600">
        {wine.winery || "Bodega desconocida"} - {wine.region || "Región desconocida"} - {wine.country || "País no disponible"}
      </p>
      <p className="text-gray-500">{wine.description || "Sin descripción disponible."}</p>
    </div>
  )
}
