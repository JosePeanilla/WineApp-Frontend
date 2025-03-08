/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import StarRatings from "react-star-ratings"

const logger = new Logger("WineCardContent")

export const WineCardContent = ({ wine }) => {
  const averageRating = Number(wine.averageRating) || 0
  if (!wine) {
    logger.error("WineCardContent recibió un objeto inválido.");
    return <p className="text-red-500">Error: Información del vino no disponible.</p>
  }

  logger.debug(`Mostrando contenido para: ${wine.name}`)

  return (
    <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{wine.name}</h2>
        <p className="text-sm text-gray-800">{wine.type} - {wine.year}</p>
        <p className="text-sm text-gray-600">
          {wine.winery?.name || "Bodega desconocida"} - {typeof wine.region === "object" ? wine.region?.name : wine.region} - {wine.country || "País desconocido"}
        </p>

        <p className="text-gray-500">{wine.description}</p>
        <p className="text-gray-500">Precio: ${wine.price}</p>
      <div className="flex items-center">
        <StarRatings
          rating={averageRating}
          starRatedColor="#ffd700"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
        />
        <span className="ml-2 text-gray-700">
          ({averageRating > 0 ? averageRating.toFixed(1) : "Sin valoraciones"})
        </span>
      </div>
    </div>
  )
}
