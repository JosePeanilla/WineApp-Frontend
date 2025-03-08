import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AuthContext } from "/src/context/AuthContext"
import { useWineReview } from "/src/hooks/useWineReview"
import { WineReview } from "/src/components/molecules/WineReview"
import { ReviewList } from "/src/components/molecules/WineReview"

export const WinePage = () => {
  const { id } = useParams()
  const [wine, setWine] = useState(null)
  const { user } = useContext(AuthContext)
  const { reviews, fetchReviews, handleReviewSubmit, handleReviewUpdate, handleReviewDelete } = useWineReview(id)

  useEffect(() => {
    fetch(`http://localhost:3000/wines/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data) {
          return
        }
        const formattedWine = {
          ...data.data,
          region: typeof data.data.region === "object" ? data.data.region : { name: data.data.region || "" },
        }
        setWine(formattedWine)
      })
      .catch((error) => console.error("Error al obtener datos del vino:", error))
      fetchReviews() 
  }, [id])

  if (!wine) return <p>Loading...</p>

  return (
    <>
    <div className="flex flex-col sm:flex-row gap-8 p-6 max-w-5xl mx-auto">
      {/* Left Column - Image */}
      <div className="lg:w-1/2 pt-10">
        <img
          src={wine.image || "https://picsum.photos/200"} 
          alt={wine.name}
          className="rounded-lg shadow-lg w-full h-auto"
        />
        <h2 className="mt-4 mb-2">Mapa de la región: {wine.region?.name || "Desconocida"}</h2>
        <img
          src="https://picsum.photos/150"
          alt={wine.region?.name || "Región desconocida"}
          className="rounded-lg shadow-lg h-auto"
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Valoraciones y comentarios</h2>
          <ReviewList reviews={reviews} user={user} onEdit={handleReviewUpdate} onDelete={handleReviewDelete} />
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="lg:w-1/2 space-y-4 pt-10">
        <h1 className="text-3xl font-bold">{wine.name}</h1>
        <h3 className="text-lg font-semibold"> Tipo de Vino: {wine.type}</h3>
        <h3 className="text-lg font-semibold">Año: {wine.year}</h3>
        <h2 className="text-lg font-semibold">Bodega: {wine.winery?.name || "Desconocida"}</h2>
        <h2 className="text-lg font-semibold">Región: {wine.region?.name || "Desconocida"}</h2>
        <p className="mt-2">{wine.description}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Información adicional</h2>
          <p>
            {wine.additionalDescription || "Información adicional no disponible."}
          </p>
        </div>
        <p className="text-lg font-semibold">Precio: {wine.price}€ </p>
      </div>
    </div>
    <WineReview wineId={wine._id} onReviewSubmitted={() => console.log("Reseña enviada!")} />
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