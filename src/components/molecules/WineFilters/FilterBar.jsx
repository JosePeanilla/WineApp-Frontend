/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useState } from "react"
import { grapeVarieties } from "/src/utils/grapeVarieties"

/**************************************************************************************************
 * FilterBar Component
 *
 * Responsive sidebar/mobile filter UI for the wine list page.
 * Supports filtering by various fields: name, type, grape, region, price, year, rating.
 * Returns cleaned filters to the parent component via onFilterChange.
 **************************************************************************************************/
const logger = new Logger("FilterBar")

export const FilterBar = ({ onFilterChange }) => {
  // Default filter values
  const initialFilters = {
    name: "",
    type: "",
    grapeType: "",
    region: "",
    winery: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRating: ""
  }

  // Local state for user-selected filters
  const [localFilters, setLocalFilters] = useState(initialFilters)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  /*************************************** Handle input changes ***************************************/
  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  /*************************************** Apply filters and send to parent ***************************************/
  const handleApplyFilters = () => {
    const normalizedFilters = Object.fromEntries(
      Object.entries(localFilters).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value
      ])
    )
    logger.info("Applying filters:", normalizedFilters)
    onFilterChange(normalizedFilters)

    if (window.innerWidth < 1024) {
      setIsFilterVisible(false)
    }
  }

  /*************************************** Reset filters to initial state ***************************************/
  const handleClearFilters = () => {
    logger.info("Resetting filters")
    setLocalFilters(initialFilters)
    onFilterChange(initialFilters)
  }

  /*************************************** Toggle filter visibility on mobile ***************************************/
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  /*************************************** Render UI (mobile and desktop) ***************************************/
  return (
    <>
      {/* Toggle filter button for mobile */}
      <div className="lg:hidden w-full mb-2">
        <button 
          onClick={toggleFilters} 
          className="bg-[#3d1308] text-white p-3 rounded-md w-full flex justify-between items-center"
        >
          <span className="font-medium">Filtros</span>
          <span>{isFilterVisible ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Mobile filter panel */}
      <div className={`bg-[#3d1308] p-3 sm:p-4 rounded-lg shadow-md text-white w-full lg:hidden ${isFilterVisible ? 'block' : 'hidden'}`}>
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* Text & select fields */}
          <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
          <input type="text" name="region" placeholder="Región" value={localFilters.region} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
          <input type="text" name="winery" placeholder="Bodega" value={localFilters.winery} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
          
          {/* Grape type */}
          <select name="grapeType" value={localFilters.grapeType} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm">
            <option value="">Seleccione el tipo de uva</option>
            {grapeVarieties.map((grape) => (
              <option key={grape} value={grape}>{grape}</option>
            ))}
          </select>

          {/* Price range */}
          <div className="grid grid-cols-2 gap-2">
            <input type="number" name="minPrice" placeholder="Precio mín." value={localFilters.minPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
            <input type="number" name="maxPrice" placeholder="Precio máx." value={localFilters.maxPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
          </div>

          {/* Year range */}
          <div className="grid grid-cols-2 gap-2">
            <input type="number" name="minYear" placeholder="Año mín." value={localFilters.minYear} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
            <input type="number" name="maxYear" placeholder="Año máx." value={localFilters.maxYear} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />
          </div>

          {/* Rating */}
          <input type="number" name="minRating" placeholder="Valoración mín." value={localFilters.minRating} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm" />

          {/* Wine type */}
          <select name="type" value={localFilters.type} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full text-sm">
            <option value="">Seleccione el tipo de vino</option>
            <option value="Tinto">Tinto</option>
            <option value="Rosado">Rosado</option>
            <option value="Blanco">Blanco</option>
            <option value="Espumoso">Espumoso</option>
          </select>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 col-span-full">
            <button onClick={handleApplyFilters} className="p-2 rounded bg-[#9f2042] hover:bg-[#7b0d1e] text-white transition-all w-full text-sm">
              Aplicar
            </button>
            <button onClick={handleClearFilters} className="p-2 rounded bg-[#DC2626] hover:bg-red-700 text-white transition-all w-full text-sm">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar version */}
      <div className="hidden lg:flex lg:flex-col gap-4 p-4 border rounded-lg bg-[#3d1308] text-white shadow-lg sticky top-[120px] w-[250px] xl:w-[280px]">
        <h3 className="font-bold text-lg border-b border-white/20 pb-2 mb-2">Filtros</h3>
        
        {/* Text inputs */}
        <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="text" name="region" placeholder="Región" value={localFilters.region} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="text" name="winery" placeholder="Bodega" value={localFilters.winery} onChange={handleChange} className="p-2 border rounded bg-white text-black" />

        {/* Grape type */}
        <select name="grapeType" value={localFilters.grapeType} onChange={handleChange} className="p-2 border rounded bg-white text-black">
          <option value="">Seleccione el tipo de uva</option>
          {grapeVarieties.map((grape) => (
            <option key={grape} value={grape}>{grape}</option>
          ))}
        </select>

        {/* Price filter */}
        <div className="space-y-2">
          <label className="text-sm">Precio</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" name="minPrice" placeholder="Mínimo" value={localFilters.minPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
            <input type="number" name="maxPrice" placeholder="Máximo" value={localFilters.maxPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
          </div>
        </div>

        {/* Year filter */}
        <div className="space-y-2">
          <label className="text-sm">Año</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" name="minYear" placeholder="Mínimo" value={localFilters.minYear} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
            <input type="number" name="maxYear" placeholder="Máximo" value={localFilters.maxYear} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
          </div>
        </div>

        {/* Rating and type */}
        <input type="number" name="minRating" placeholder="Valoración mínima (1-5)" value={localFilters.minRating} onChange={handleChange} className="p-2 border rounded bg-white text-black" />

        <select name="type" value={localFilters.type} onChange={handleChange} className="p-2 border rounded bg-white text-black">
          <option value="">Seleccione el tipo de vino</option>
          <option value="Tinto">Tinto</option>
          <option value="Rosado">Rosado</option>
          <option value="Blanco">Blanco</option>
          <option value="Espumoso">Espumoso</option>
        </select>

        {/* Desktop action buttons */}
        <button onClick={handleApplyFilters} className="p-2 rounded bg-[#9f2042] hover:bg-[#7b0d1e] text-white transition-all">
          Aplicar Filtros
        </button>
        <button onClick={handleClearFilters} className="p-2 rounded bg-[#DC2626] hover:bg-red-700 text-white transition-all">
          Eliminar Filtros
        </button>
      </div>
    </>
  )
}
