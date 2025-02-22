/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("WineCardImage")

export const WineCardImage = ({ image, name }) => {
  if (!image) {
    logger.warn(`El vino "${name || "Desconocido"}" no tiene imagen asignada, usando imagen por defecto.`)
  }

  logger.debug(`Cargando imagen para: ${name || "Desconocido"}`)

  return (
    <figure>
        <img
            src={image || "/default-wine.jpg"}
            alt={name || "Vino desconocido"}
            className="w-full object-cover rounded-l-lg"
        />
    </figure>
  )
}
