/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useNavigate } from "react-router-dom"
import { RegionCardImage } from "./RegionCardImage.jsx"
import { RegionCardContent } from "./RegionCardContent.jsx"
import { RegionCardActions } from "./RegionCardActions.jsx"

const logger = new Logger("RegionCard")

export const RegionCard = ({ region }) => {
  const navigate = useNavigate()

  if (!region || !region.id) {
    logger.error("RegionCard recibió un objeto inválido o sin ID.")
    return <p className="text-red-500">Error: Información de la región no disponible.</p>
  }

  logger.debug(`Renderizando RegionCard para la región: ${region.name}`)

  return (
    <div
      className="card card-compact bg-base-100 w-96 shadow-xl hover:shadow-2xl transition"
    >
      <figure className="w-full h-48 object-cover">
        <RegionCardImage image={region.image} name={region.name} />
      </figure>
      <div className="card-body flex flex-col justify-between w-full pl-6">
        <RegionCardContent region={region} />
        <div className="card-actions self-end">
          <RegionCardActions regionId={region.id} />
        </div>
      </div>
    </div>
  )
}