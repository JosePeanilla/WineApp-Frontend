import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { WineCard } from "../../components/molecules/WineCard"

export const RegionPage = () => {
  const { id } = useParams()
  const [region, setRegion] = useState(null)
  const [wines, setWines] = useState([])

  const countryImages = {
    "Portugal": "https://cdn.pixabay.com/photo/2017/08/30/13/15/portugal-2697043_1280.jpg",
    "Argentina": "https://cdn.pixabay.com/photo/2017/08/30/16/12/argentina-2697664_1280.jpg",
    "Uruguay": "https://cdn.pixabay.com/photo/2016/06/16/04/21/uruguay-1460612_1280.jpg",
    "Estados Unidos": "https://cdn.pixabay.com/photo/2022/06/01/16/14/usa-7236126_1280.png",
    "España": "https://cdn.pixabay.com/photo/2017/08/30/12/48/spain-2696959_1280.jpg",
    "Italia": "https://cdn.pixabay.com/photo/2019/11/06/09/17/italy-4605634_1280.jpg",
    "Francia": "https://cdn.pixabay.com/photo/2017/08/29/21/54/french-flag-2695008_1280.jpg",
    "Chile": "https://cdn.pixabay.com/photo/2020/02/24/01/45/chile-4875006_1280.png",
  };

  useEffect(() => {
    fetch(`http://localhost:3000/regions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data) return;

        const formattedRegion = {
          ...data.data,
          image: data.data.image || "https://via.placeholder.com/600x400",
          countryImage: countryImages[data.data.country] || "https://via.placeholder.com/150x100"
        }

        setRegion(formattedRegion)

        fetch(`http://localhost:3000/regions/${data.data.name}/wines`)
          .then((res) => res.json())
          .then((wineData) => {
            console.log("Datos de vinos recibidos:", wineData)
            if (wineData.data) {
              setWines(wineData.data)
            }
          })
          .catch((error) => console.error("Error al obtener vinos:", error))
      })
      .catch((error) => console.error("Error al obtener datos de la región:", error))
  }, [id])

  if (!region) return <p>Loading...</p>

  return (
    <>
      {/* Bandera del país */}
      <div className="w-full flex justify-center py-6">
        <img
          src={region.countryImage}
          alt={`Bandera de ${region.country}`}
          className="w-2/3 max-w-4xl h-32 object-contain"
        />
      </div>

      {/* Contenedor de la región */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center gap-12">
        {/* Imagen de la región */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={region.image}
            alt={`Imagen de ${region.name}`}
            className="w-full max-w-lg h-auto object-cover rounded-md border border-gray-300 shadow-md"
          />
        </div>

        {/* Título y descripción de la región */}
        <div className="md:w-2/3 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-left">{region.name}</h2>
          <p className="text-gray-600 text-lg mt-4 text-justify">{region.description}</p>
        </div>
      </div>

      {/* Lista de vinos */}
      <div className="grid grid-cols-1 gap-y-10 px-4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Vinos de esta región</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6">
          {wines.length > 0 ? (
            wines.map((wine) => (
              <WineCard key={wine._id} wine={wine} />
            ))
          ) : (
            <p>No hay vinos disponibles para esta región.</p>
          )}
        </div>
      </div>
    </>
  )
}