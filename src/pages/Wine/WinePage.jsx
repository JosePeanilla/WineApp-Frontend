import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export const WinePage = () => {
  const { id } = useParams()
  const [wine, setWine] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/wines/${id}`) 
      .then((res) => {
        ("Raw response:", res)
        return res.json()
      })
      .then((data) => {
        ("Datos recibidos del backend:", data)
      setWine(data.data)
      ("Fetched wine data:", data)
      })
  }, [id])

  if (!wine) return <p>Loading...</p>

  return (
    <>
    <div className="flex flex-col sm:flex-row gap-8 p-6 max-w-5xl mx-auto">
      {/* Left Column - Image */}
      <div className="lg:w-1/2 pt-10">
        <img
          src="https://picsum.photos/200" // Foto de botella
          alt={wine.name}
          className="rounded-lg shadow-lg w-full h-auto"
        />
        <h2 className="mt-4 mb-2"> Mapa de la region: {wine.region}</h2>
        <img
          src="https://picsum.photos/150" 
          alt={wine.region}
          className="rounded-lg shadow-lg h-auto"
        />
      </div>

      {/* Right Column - Content */}
      <div className="lg:w-1/2 space-y-4 pt-10">
        <h1 className="text-3xl font-bold">{wine.name}</h1>
        <h3 className="text-lg font-semibold"> Typo de Vino: {wine.type}</h3>
        <h3 className="text-lg font-semibold">Año: {wine.year}</h3>
        <h2 className="text-lg font-semibold">Bodega: {wine.winery}</h2>
        <h2 className="text-lg font-semibold">Región: {typeof wine.region === "object" ? wine.region?.name : wine.region}</h2>
        <p className="mt-2">{wine.description}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis odio vitae dolor gravida, in blandit nisi aliquam. Curabitur tincidunt porttitor enim sit amet tristique. Fusce dolor diam, dapibus a congue in, rhoncus sollicitudin augue. Aliquam eros dui, ornare a facilisis vel, condimentum vitae metus. Aliquam ut ligula massa. In eu tempus purus. Cras vel dolor eget risus convallis efficitur. Curabitur in tempus tellus. Duis venenatis feugiat sem, nec faucibus libero efficitur sed. Proin semper, sem mollis posuere auctor, libero nisi laoreet neque, ac imperdiet lectus tellus et nunc. Nulla finibus vel nisi ut iaculis.  
        In eu diam felis. Sed semper nisl nulla, at maximus lectus consectetur in. Ut dignissim mi in dolor sodales rhoncus. Cras non turpis bibendum, placerat nibh vel, euismod orci. Sed interdum tortor tempor mi aliquet, non dignissim sem gravida. Vivamus euismod purus eu metus lacinia, eget euismod nisl blandit. Nunc urna massa, hendrerit eget pulvinar eu, mattis quis quam. Pellentesque semper, enim id efficitur imperdiet, quam mi varius augue, eu vestibulum nunc neque sed nisi. Curabitur et egestas lacus. Duis varius dui metus, non aliquam orci sodales ut. Proin dictum luctus nisl, nec tempus magna bibendum vel. In dapibus lectus eget tellus venenatis posuere.</p>
        <p className="text-lg font-semibold">Price: {wine.price}€ </p>
      </div>
    </div>
    <Link to="/wines" className="flex items-center text-lg font-bold ml-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Regresar
    </Link>
    </>
  )
}