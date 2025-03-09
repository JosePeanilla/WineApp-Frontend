/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("WineCardImage")

export const WineCardImage = ({ image, name }) => {
  if (!image) {
    logger.warn(`El vino "${name || "Desconocido"}" no tiene imagen asignada, usando imagen por defecto.`)
  }

  logger.debug(`Cargando imagen para: ${name || "Desconocido"}`)

  return (
    <figure className="flex justify-center items-center w-40 h-auto min-h-60 flex-shrink-0 rounded-lg overflow-visible">
        <img
            src={image || "/default-wine.jpg"}
            alt={name || "Vino desconocido"}
            className="w-auto max-h-80 object-contain rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
    </figure>
  )
}
