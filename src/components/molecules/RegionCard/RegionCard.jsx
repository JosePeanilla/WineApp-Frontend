/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useNavigate } from "react-router-dom"

/************************************************** Internal Components ***************************************************/
import { RegionCardImage } from "./RegionCardImage.jsx"
import { RegionCardContent } from "./RegionCardContent.jsx"
import { RegionCardActions } from "./RegionCardActions.jsx"

const logger = new Logger("RegionCard")

/**************************************************************************************************
 * RegionCard:
 * UI card component to display regional information
 * - Shows an image, name, and short description
 * - Links to region details page
 * - Includes modular subcomponents for image, content, and actions
 **************************************************************************************************/
export const RegionCard = ({ region }) => {
  const navigate = useNavigate()

  /*************************************** Validation: Region must have ID ***************************************/
  if (!region || !region.id) {
    logger.error("RegionCard received an invalid object or missing ID.")
    return <p className="text-red-500">Error: Información de la región no disponible.</p>
  }

  logger.debug(`Rendering RegionCard for region: ${region.name}`)

  /*************************************** Render Card ***************************************/
  return (
    <div
      className="card card-compact bg-base-100 w-96 shadow-xl hover:shadow-2xl transition"
    >
      {/* Region Image */}
      <figure className="w-full h-48 object-cover">
        <RegionCardImage image={region.image} name={region.name} />
      </figure>

      {/* Region Info and Action */}
      <div className="flex flex-col items-center text-center flex-grow">
        <RegionCardContent region={region} />

        <div className="w-full flex justify-center mt-2">
          <RegionCardActions regionId={region.id} />
        </div>
      </div>
    </div>
  )
}
