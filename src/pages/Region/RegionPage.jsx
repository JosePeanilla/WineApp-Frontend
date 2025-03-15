import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export const RegionPage = () => {
  const { id } = useParams()
  const [region, setRegion] = useState(null)

  const countryImages = {
    "Portugal": "https://cdn.pixabay.com/photo/2017/08/30/13/15/portugal-2697043_1280.jpg",
    "Argentina": "https://cdn.pixabay.com/photo/2017/08/30/16/12/argentina-2697664_1280.jpg",
    "Uruguay": "https://cdn.pixabay.com/photo/2016/06/16/04/21/uruguay-1460612_1280.jpg",
    "Estados Unidos": "https://cdn.pixabay.com/photo/2022/06/01/16/14/usa-7236126_1280.png",
    "España": "https://cdn.pixabay.com/photo/2017/08/30/12/48/spain-2696959_1280.jpg",
    "Italia": "https://cdn.pixabay.com/photo/2019/11/06/09/17/italy-4605634_1280.jpg",
    "Francia": "https://cdn.pixabay.com/photo/2017/08/29/21/54/french-flag-2695008_1280.jpg",
    "Chile": "https://cdn.pixabay.com/photo/2020/02/24/01/45/chile-4875006_1280.png",
  }

  useEffect(() => {
    fetch(`http://localhost:3000/regions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data) {
          return
        }

        const formattedRegion = {
          ...data.data,
          image: data.data.image || "https://via.placeholder.com/600x400",
          countryImage: countryImages[data.data.country] || "https://via.placeholder.com/150x100"
        }

        setRegion(formattedRegion)
      })
      .catch((error) => console.error("Error al obtener datos de la región:", error))
  }, [id])

  if (!region) return <p>Loading...</p>

  return (
    <>
    {/* Imagen del pais de la región */}
    <div className="w-full flex justify-center py-6">
        <img
          src={region.countryImage}
          alt={`Bandera de ${region.country}`}
          className="h-40 w-auto object-contain border border-gray-300 rounded-lg shadow-md"
        />
      </div>

    {/* Imagen de la región */}
    <div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden mt-6 max-w-5xl mx-auto">
        <figure className="md:w-1/3">
          <img
            src={region.image}
            alt={`Imagen de ${region.name}`}
            className="w-full h-full object-cover"
          />
        </figure>

    {/* Contenido de la región */}
    <div className="md:w-2/3 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-center md:text-left">{region.name}</h2>
          <p className="text-gray-600 text-lg mt-4">{region.description}</p>
        </div>
      </div>
    </>
  )
}