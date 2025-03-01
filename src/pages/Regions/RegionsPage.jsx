/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState, useEffect } from "react"
import { RegionCard } from "../../components/molecules/RegionCard"

const logger = new Logger("RegionsPage")

export const RegionsPage = () => {
  
  const [regions, setRegions] = useState([])

  useEffect(() => {
    logger.info("Fetching regions data...")

    fetch("http://localhost:3000/regions") 
      .then((response) => response.json()) 
      .then((data) => {
        if (!data || !data.data) {
          logger.warn("No region data received from API")
          return
        }

        const regionsWithCorrectID = data.data.map(region => ({
          ...region,
          id: region.id || region._id 
        }))

        setRegions(regionsWithCorrectID)
        logger.info(`Loaded ${regionsWithCorrectID.length} regions successfully`)
      })
      .catch((error) => {
        logger.error("Error fetching regions:", error)
      })
  }, [])

  return (
    <section id="regions_page" className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold my-6">Descubre las regiones y sus características</h1>
      
      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {regions.length > 0 ? (
          regions.map((region, index) => (
            <div key={region.id}
            className={index === 9 ? "col-span-3 flex justify-center" : ""}>
            <RegionCard region={region} />
            </div>
          ))
        ) : (
          <p className="text-center text-lg col-span-full">No hay regiones disponibles.</p>
        )}
      </div>
    </section>
  )
}
