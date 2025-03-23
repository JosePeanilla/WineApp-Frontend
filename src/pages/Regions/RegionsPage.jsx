/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState, useEffect } from "react"
import { RegionCard } from "../../components/molecules/RegionCard"

const logger = new Logger("RegionsPage")

export const RegionsPage = () => {
  
  const [regions, setRegions] = useState([])

  useEffect(() => {
    logger.info("Fetching regions data...")

    fetch(`${import.meta.env.VITE_SERVER_URL}/regions`) 
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

        const regionImages = {
          "Douro": "https://cdn.pixabay.com/photo/2017/11/30/21/58/douro-2989559_1280.jpg",
          "Luján de Cuyo": "https://images.unsplash.com/photo-1520356996640-d3b614727887?q=80&w=2117&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Maldonado": "https://plus.unsplash.com/premium_photo-1663088920520-5e6f067f3bda?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Napa Valley": "https://cdn.pixabay.com/photo/2019/06/17/18/33/napa-valley-4280579_1280.jpg",
          "Penedès": "https://cdn.pixabay.com/photo/2014/08/26/15/15/road-428039_1280.jpg",
          "Piamonte": "https://cdn.pixabay.com/photo/2017/12/03/09/58/torino-2994538_1280.jpg",
          "Valle del Loira": "https://cdn.pixabay.com/photo/2014/07/04/17/57/sancerre-384105_1280.jpg",
          "Valle del Maipo": "https://cdn.pixabay.com/photo/2021/07/09/16/31/vineyard-6399505_1280.jpg"
        }

        const updatedRegions = regionsWithCorrectID.map(region => ({
          ...region,
          image: regionImages[region.name] || "https://via.placeholder.com/300"
        }))

        setRegions(updatedRegions)
        logger.info(`Loaded ${updatedRegions.length} regions successfully`)
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