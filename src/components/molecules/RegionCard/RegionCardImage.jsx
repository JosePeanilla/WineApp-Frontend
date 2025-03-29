/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

const logger = new Logger("RegionCardImage")

/**************************************************************************************************
 * RegionCardImage:
 * Displays the region's image within a RegionCard.
 * - Falls back to a placeholder image if none is provided
 * - Logs loading actions and missing image cases
 **************************************************************************************************/
export const RegionCardImage = ({ image, name }) => {
  const defaultImage = "https://via.placeholder.com/300"

  // Warn if the image is missing
  if (!image) {
    logger.warn(`Region "${name || "Unknown"}" has no image. Using default placeholder.`)
  }

  logger.debug(`Loading image for: ${name || "Unknown"}`)

  return (
    <figure className="w-full">
      <img
        src={image || defaultImage}
        alt={`Image of ${name}`}
        className="w-full h-52 object-cover rounded-t-lg"
      />
    </figure>
  )
}
