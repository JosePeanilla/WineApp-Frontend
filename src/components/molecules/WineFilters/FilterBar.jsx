/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState } from "react"
import { grapeVarieties } from "/src/utils/grapeVarieties"

const logger = new Logger("FilterBar")

export const FilterBar = ({ onFilterChange }) => {
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

  const [localFilters, setLocalFilters] = useState(initialFilters)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = () => {
    const normalizedFilters = Object.fromEntries(
      Object.entries(localFilters).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value
      ])
    )
    logger.info("Aplicando filtros:", normalizedFilters)
    onFilterChange(normalizedFilters)
  }  

  const handleClearFilters = () => {
    logger.info("Restableciendo filtros")
    setLocalFilters(initialFilters)
    onFilterChange(initialFilters)
  }

  return (
    <>
      <div className="bg-[#3d1308] p-4 rounded-lg shadow-md text-white w-full lg:hidden">
        <div className="w-full max-w-none grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 px-4">
          <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <input type="text" name="region" placeholder="Región" value={localFilters.region} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <input type="text" name="winery" placeholder="Bodega" value={localFilters.winery} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <select name="grapeType" value={localFilters.grapeType} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full">
            <option value="">Todas las variedades</option>
            {grapeVarieties.map((grape) => (
              <option key={grape} value={grape}>{grape}</option>
            ))}
          </select>
          <input type="number" name="minPrice" placeholder="Precio mín." value={localFilters.minPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <input type="number" name="maxPrice" placeholder="Precio máx." value={localFilters.maxPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <input type="number" name="minYear" placeholder="Año mín." value={localFilters.minYear} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <input type="number" name="maxYear" placeholder="Año máx." value={localFilters.maxYear} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <input type="number" name="minRating" placeholder="Valoración mín. (1-5)" value={localFilters.minRating} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full" />
          <select name="type" value={localFilters.type} onChange={handleChange} className="p-2 border rounded bg-white text-black w-full">
            <option value="">Todos los tipos</option>
            <option value="Tinto">Tinto</option>
            <option value="Rosado">Rosado</option>
            <option value="Blanco">Blanco</option>
            <option value="Espumoso">Espumoso</option>
          </select>
          <button onClick={handleApplyFilters} className="p-2 rounded bg-[#9f2042] hover:bg-[#7b0d1e] text-white transition-all w-full">
            Aplicar
          </button>
          <button onClick={handleClearFilters} className="p-2 rounded bg-[#DC2626] hover:bg-red-700 text-white transition-all w-full">
            Eliminar
          </button>
        </div>
      </div>
      
      <div className="hidden lg:flex lg:flex-col gap-4 p-4 border rounded-lg bg-[#3d1308] text-white shadow-lg fixed top-[120px] left-[20px] w-[250px]">
        <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="text" name="region" placeholder="Región" value={localFilters.region} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="text" name="winery" placeholder="Bodega" value={localFilters.winery} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <select name="grapeType" value={localFilters.grapeType} onChange={handleChange} className="p-2 border rounded bg-white text-black">
          <option value="">Todas las variedades</option>
          {grapeVarieties.map((grape) => (
            <option key={grape} value={grape}>
              {grape}
            </option>
          ))}
        </select>
        <input type="number" name="minPrice" placeholder="Precio mínimo" value={localFilters.minPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="number" name="maxPrice" placeholder="Precio máximo" value={localFilters.maxPrice} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="number" name="minYear" placeholder="Año mínimo" value={localFilters.minYear} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="number" name="maxYear" placeholder="Año máximo" value={localFilters.maxYear} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <input type="number" name="minRating" placeholder="Valoración mínima (1-5)" value={localFilters.minRating} onChange={handleChange} className="p-2 border rounded bg-white text-black" />
        <select name="type" value={localFilters.type} onChange={handleChange} className="p-2 border rounded bg-white text-black">
          <option value="">Todos los tipos</option>
          <option value="Tinto">Tinto</option>
          <option value="Rosado">Rosado</option>
          <option value="Blanco">Blanco</option>
          <option value="Espumoso">Espumoso</option>
        </select>
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
