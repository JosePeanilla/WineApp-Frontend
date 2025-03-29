/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import { useState, useEffect } from "react"

/************************************************** Internal Components ***************************************************/
import { WineCard } from "../../components/molecules/WineCard"
import { FilterBar } from "../../components/molecules/WineFilters"

/**************************************************************************************************
 * WinesPage Component:
 * Displays a complete list of wines fetched from the API, with filtering capabilities.
 * - Users can filter by name, type, region, winery, price, year, and rating.
 * - The list updates automatically as filters change.
 * - Uses logger for tracking and notify for warnings/errors.
 **************************************************************************************************/
const logger = new Logger("WinesPage")

export const WinesPage = () => {
  /****************************** Local State ******************************/
  const [wines, setWines] = useState([])
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    region: "",
    winery: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRating: ""
  })

  /****************************** Fetch Wines from API ******************************/
  const fetchWines = () => {
    logger.info("Fetching wines data...")

    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })

    fetch(`${import.meta.env.VITE_SERVER_URL}/wines?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data.data) {
          logger.warn("No wine data received from API")
          notify.warning("No se han recibido datos de ningún vino.")
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
  }

  /****************************** Trigger Fetch on Filters Change ******************************/
  useEffect(() => {
    fetchWines()
  }, [filters])

  /****************************** Render Wines Page ******************************/
  return (
    <section id="wines_page" className="container mx-auto px-4 min-h-screen flex flex-col items-start">
      {/* Title */}
      <h1 className="text-center text-2xl font-bold my-6 w-full">Listado completo</h1>

      {/* Mobile & Tablet View */}
      <div className="sm:flex sm:flex-col sm:gap-6 lg:hidden">
        {/* Filters */}
        <div>
          <FilterBar onFilterChange={setFilters} />
        </div>

        {/* Wine Cards */}
        <div className="flex justify-start">
          <div className="w-full max-w-md flex flex-col gap-y-6 items-start">
            {wines.length > 0 ? (
              wines.map((wine) => <WineCard key={wine.id} wine={wine} />)
            ) : (
              <p className="text-left text-lg col-span-full">
                No hay vinos disponibles.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:justify-start gap-6 w-full">
        {/* Filters */}
        <div>
          <FilterBar onFilterChange={setFilters} />
        </div>

        {/* Wine Cards */}
        <div className="lg:w-3/4 flex flex-col items-start gap-y-6 ml-auto">
          {wines.length > 0 ? (
            wines.map((wine) => (
              <div key={wine.id} className="w-full max-w-md">
                <WineCard wine={wine} />
              </div>
            ))
          ) : (
            <p className="text-center font-bold">No hay vinos disponibles.</p>
          )}
        </div>
      </div>
    </section>
  )
}
