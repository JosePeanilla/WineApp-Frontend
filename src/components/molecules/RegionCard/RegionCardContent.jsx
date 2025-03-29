/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("RegionCardContent")

/**************************************************************************************************
 * RegionCardContent:
 * Displays the main textual content inside a RegionCard
 * - Shows region name and country
 * - Logs render and validates input
 **************************************************************************************************/
export const RegionCardContent = ({ region }) => {
  // Validate region prop
  if (!region) {
    logger.error("RegionCardContent received an invalid region object.")
    return <p className="text-red-500">Error: Region information is not available.</p>
  }

  logger.debug(`Displaying content for region: ${region.name}`)

  // Render region name and country
  return (
    <div className="card-body">
      <h2 className="card-title text-lg font-semibold">{region.name}</h2>
      <p className="text-gray-600">{region.country}</p>
    </div>
  )
}
