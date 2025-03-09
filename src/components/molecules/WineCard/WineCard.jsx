/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { WineCardImage } from "./WineCardImage.jsx"
import { WineCardContent } from "./WineCardContent.jsx"
import { WineCardActions } from "./WineCardActions.jsx"

const logger = new Logger("WineCard")

export const WineCard = ({ wine, showEditDelete = false, onEdit, onDelete }) => {
  const wineId = wine.id || wine._id

  if (!wine || !wineId) {
    logger.error("WineCard recibió un objeto inválido o sin ID.")
    return <p className="text-red-500">Error: Información del vino no disponible.</p>
  }

  logger.debug(`Renderizando WineCard para el vino: ${wine.name}`)

  return (
    <div className="card card-side bg-base-100 shadow-xl p-6 w-full max-w-3xl mx-auto rounded-lg flex items-center">
      <figure className="w-40 min-h-90 flex-shrink-0 rounded-lg overflow-visible flex justify-center items-center">
        <WineCardImage image={wine.image} name={wine.name} />
      </figure>
      <div className="card-body flex flex-col justify-between w-full pl-6">
        <WineCardContent wine={wine} />
        <div className="card-actions self-end">
          <WineCardActions
            wineId={wineId}
            showEditDelete={showEditDelete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  )
}
