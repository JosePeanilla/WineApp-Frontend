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
        ("Datos recibidos de la API:", data)
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
        console.error("Error al obtener los vinos:", error)
        logger.error("Error fetching wines:", error)
      })
  }, [])

  return (
    <section id="wines_page" className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold my-6">Listado completo</h1>
      
      {/* Tarjetas */}
      <div className="grid grid-cols-1 gap-y-10 px-4">
        {wines.length > 0 ? (
          wines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))
        ) : (
          <p className="text-center text-lg col-span-full">No hay vinos disponibles.</p>
        )}
      </div>
    </section>
  )
}
