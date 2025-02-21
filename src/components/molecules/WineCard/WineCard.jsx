/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useNavigate } from "react-router-dom"
import { WineCardImage } from "./WineCardImage.jsx"
import { WineCardContent } from "./WineCardContent.jsx"
import { WineCardActions } from "./WineCardActions.jsx"

const logger = new Logger("WineCard")

export const WineCard = ({ wine }) => {
  const navigate = useNavigate()

  if (!wine || !wine.id) {
    logger.error("WineCard recibió un objeto inválido o sin ID.")
    return <p className="text-red-500">Error: Información del vino no disponible.</p>
  }

  logger.debug(`Renderizando WineCard para el vino: ${wine.name}`)

  return (
    <div
      className="card bg-base-100 shadow-lg cursor-pointer hover:shadow-2xl transition transform hover:scale-105 w-full max-w-sm mx-auto"
      onClick={() => navigate(`/wines/${wine.id}`)}
    >

      <WineCardImage image={wine.image} name={wine.name} />
      <WineCardContent wine={wine} />
      <WineCardActions wineId={wine.id} />
    </div>
  )
}
