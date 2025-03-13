/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState, useEffect } from "react"

const logger = new Logger("FilterBar")

export const FilterBar = ({ onFilterChange }) => {
  const initialFilters = {
    name: "",
    type: "",
    region: "",
    winery: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRating: ""
  }

  const [localFilters, setLocalFilters] = useState(initialFilters)
  const [scrollPosition, setScrollPosition] = useState(120)

  useEffect(() => {
    const handleScroll = () => {
      const minTop = 120
      const targetPosition = Math.max(window.scrollY + 20, minTop)

      setScrollPosition((prev) => prev + (targetPosition - prev) * 0.1) 
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = () => {
    logger.info("Aplicando filtros:", localFilters)
    onFilterChange(localFilters)
  }

  const handleClearFilters = () => {
    logger.info("Restableciendo filtros")
    setLocalFilters(initialFilters)
    onFilterChange(initialFilters) 
  }

  return (
    <div
      style={{ top: `${scrollPosition}px` }}
      className="fixed left-5 p-4 border rounded-lg bg-[#3d1308] text-white w-64 shadow-lg transition-all ease-out duration-200"
    >
      <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="text" name="region" placeholder="Región" value={localFilters.region} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="text" name="winery" placeholder="Bodega" value={localFilters.winery} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="number" name="minPrice" placeholder="Precio mínimo" value={localFilters.minPrice} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="number" name="maxPrice" placeholder="Precio máximo" value={localFilters.maxPrice} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="number" name="minYear" placeholder="Año mínimo" value={localFilters.minYear} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="number" name="maxYear" placeholder="Año máximo" value={localFilters.maxYear} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />
      <input type="number" name="minRating" placeholder="Valoración mínima (1-5)" value={localFilters.minRating} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black" />

      <select name="type" value={localFilters.type} onChange={handleChange} className="p-2 border rounded w-full bg-white text-black">
        <option value="">Todos los tipos</option>
        <option value="Tinto">Tinto</option>
        <option value="Blanco">Blanco</option>
        <option value="Rosado">Rosado</option>
        <option value="Espumoso">Espumoso</option>
      </select>

      <button
        onClick={handleApplyFilters}
        className="w-full p-2 rounded font-semibold bg-[#9f2042] hover:bg-[#7b0d1e] text-white transition-all mt-2"
      >
        Aplicar Filtros
      </button>

      <button
        onClick={handleClearFilters}
        className="w-full p-2 rounded font-semibold bg-[#DC2626] hover:bg-red-700 text-white transition-all mt-2"
      >
        Quitar Filtros
      </button>
    </div>
  )
}
