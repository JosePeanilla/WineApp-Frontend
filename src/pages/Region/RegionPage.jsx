import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export const RegionPage = () => {
  const { id } = useParams()
  const [region, setRegion] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/regions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data) {
          return
        }
        const formattedRegion = {
          ...data.data,
          region: typeof data.data.region === "object" ? data.data.region : { name: data.data.region || "" },
        }
        setRegion(formattedRegion)
      })
      .catch((error) => console.error("Error al obtener datos de la región:", error))
  }, [id])

  if (!region) return <p>Loading...</p>

  return (
    <>
    {/* Imagen del pais de la región - Ocupa todo el ancho */}
    <div className="carousel w-full">
  <div className="carousel-item w-full">
    <img
      src={region.countryImage} // Reemplazarlo con la imagen del país
      alt={`Imagen de ${region.country}`}
      className="w-full h-64 object-cover"
    />
  </div>
</div>

{/* Imagen de la región izquierda - Ocupa 1/3 */}
<div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden">
  <figure className="md:w-1/3">
    <img
      src={region.image}
      alt={`Imagen de ${region.name}`}
      className="w-full h-full object-cover"
    />
  </figure>

  {/* Contenido de la región - Ocupa 2/3 */}
  <div className="md:w-2/3 p-6">
    <h2 className="text-2xl font-semibold">{region.name}</h2>
    <p className="text-gray-600">{region.description}</p>
  </div>
</div>
    </>
  )
}