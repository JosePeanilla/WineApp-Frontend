/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useState, useEffect } from "react"
import { WineCard } from "../../components/molecules/WineCard"

const logger = new Logger("WinesPage")

export const WinesPage = () => {
  
  const [wines, setWines] = useState([])

  useEffect(() => {
    logger.info("Fetching wines data...")

    fetch("http://localhost:3000/wines") 
      .then((response) => response.json()) 
      .then((data) => {
        if (!data || !data.data) {
          logger.warn("No wine data received from API")
          return
        }

        const winesWithCorrectID = data.data.map(wine => ({
          ...wine,
          id: wine.id || wine._id 
        }))

        setWines(winesWithCorrectID)
        logger.info(`Loaded ${winesWithCorrectID.length} wines successfully`)
      })
      .catch((error) => {
        logger.error("Error fetching wines:", error)
      })
  }, [])

  return (
    <section id="wines_page" className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold my-6">Listado completo</h1>
      
      {/* Tarjetas */}
      <div className="flex flex-col items-center gap-6">
        {wines.length > 0 ? (
          wines.map((wine) => (
            <div key={wine.id} className="w-full md:w-1/3">
              <WineCard wine={wine} />
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No hay vinos disponibles.</p>
        )}
      </div>
    </section>
  )
}
