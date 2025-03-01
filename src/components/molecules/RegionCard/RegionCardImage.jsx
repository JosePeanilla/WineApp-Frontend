/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("RegionCardImage")

export const RegionCardImage = ({ image, name }) => {
  if (!image) {
    logger.warn(`La región "${name || "Desconocido"}" no tiene imagen asignada, usando imagen por defecto.`)
  }

  logger.debug(`Cargando imagen para: ${name || "Desconocido"}`)

  return (
    <figure>
        <img
            src={image || "/default-region.jpg"}
            alt={name || "Region desconocida"}
            className="w-full h-48 object-cover rounded-t-lg"
        />
    </figure>
  )
}