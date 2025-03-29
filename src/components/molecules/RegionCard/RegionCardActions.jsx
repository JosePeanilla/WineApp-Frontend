/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useNavigate } from "react-router-dom"

/************************************************** UI Components ***************************************************/
import { Button } from "/src/components/atoms/Form"

const logger = new Logger("RegionCardActions")

/**************************************************************************************************
 * RegionCardActions:
 * Action section of a RegionCard
 * - Renders a button to navigate to region detail page
 * - Receives regionId to build the navigation URL
 **************************************************************************************************/
export const RegionCardActions = ({ regionId }) => {
  const navigate = useNavigate()

  /*************************************** Validate: regionId is required ***************************************/
  if (!regionId) {
    logger.error("RegionCardActions received an invalid region ID.")
    return null
  }

  logger.debug(`Rendering action button for region with ID: ${regionId}`)

  /*************************************** Render Action Button ***************************************/
  return (
    <div className="mt-auto flex justify-end p-4 cursor-pointer">
      <Button
        variant="moderado"
        onClick={(e) => {
          e.stopPropagation() // Prevent parent click events
          navigate(`/regions/${regionId}`) // Navigate to region detail page
        }}
      >
        Descubrir
      </Button>
    </div>
  )
}
