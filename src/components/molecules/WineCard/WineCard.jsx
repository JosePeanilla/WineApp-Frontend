/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useNavigate } from "react-router-dom"
import { WineCardImage } from "./WineCardImage.jsx"
import { WineCardContent } from "./WineCardContent.jsx"
import { WineCardActions } from "./WineCardActions.jsx"

const logger = new Logger("WineCard")

export const WineCard = ({ wine }) => {
  const wineId = wine.id || wine._id
  const navigate = useNavigate()

  if (!wine || !wineId) {
    logger.error("WineCard recibió un objeto inválido o sin ID.")
    return <p className="text-red-500">Error: Información del vino no disponible.</p>
  }

  logger.debug(`Renderizando WineCard para el vino: ${wine.name}`)

  return (
    <div
      className="card card-side bg-base-100 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 w-full max-w-3xl mx-auto rounded-lg flex items-center"
      onClick={() => navigate(`/wines/${wineId}`)}
    >
      <figure className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden">
        <WineCardImage image={wine.image} name={wine.name} />
      </figure>
      <div className="card-body flex flex-col justify-between w-full pl-6">
        <WineCardContent wine={wine} />
        <div className="card-actions self-end">
          <WineCardActions wineId={wineId} />
        </div>
      </div>
    </div>
  )
}
