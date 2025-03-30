/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"

/************************************************** Internal Context and Hooks ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { useWineReview } from "/src/hooks/useWineReview"

/************************************************** Internal Components ***************************************************/
import { WineReview } from "/src/components/molecules/WineReview"
import { ReviewList } from "/src/components/molecules/WineReview"

/**************************************************************************************************
 * WinePage Component:
 * This page displays detailed information about a single wine.
 * - Loads wine details using its ID from route params
 * - Fetches and displays user reviews
 * - Allows users to submit, edit, or delete reviews
 * Logs key actions and errors using a custom logger and shows notifications accordingly.
 **************************************************************************************************/
const logger = new Logger("WinePage")

export const WinePage = () => {
  /****************************** Route Params & Context ******************************/
  const { id } = useParams()
  const { user } = useContext(AuthContext)

  /****************************** Local State ******************************/
  const [wine, setWine] = useState(null)
  const [editingReview, setEditingReview] = useState(null)

  /****************************** Custom Hook: Wine Reviews ******************************/
  const {
    reviews,
    fetchReviews,
    handleReviewSubmit,
    handleReviewUpdate,
    handleReviewDelete
  } = useWineReview(id)

  /****************************** Fetch Wine Data on Mount ******************************/
  useEffect(() => {
    if (!id) {
      logger.error("No se proporcionó un ID de vino válido.")
      return
    }

    logger.info(`Cargando datos del vino ID: ${id}`)

    fetch(`${import.meta.env.VITE_SERVER_URL}/wines/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data) {
          logger.warn(`No se encontró información del vino con ID: ${id}`)
          notify.warning("No se encontró información del vino.")
          return
        }

        const formattedWine = {
          ...data.data,
          region: data.data.region || { name: "Desconocida", image: "" },
        }

        setWine(formattedWine)
        logger.info(`Datos del vino ID: ${id} cargados correctamente.`)
      })
      .catch((error) => {
        logger.error("Error al obtener datos del vino:", error)
      })

    fetchReviews()
  }, [id, fetchReviews])

  /****************************** Loading State ******************************/
  if (!wine) return <p className="text-center text-red-500">Cargando información del vino...</p>

  /****************************** Render Wine Page ******************************/
  return (
    <>
      {/* Wine Details Layout */}
      <div className="flex flex-col sm:flex-row gap-8 p-6 max-w-5xl mx-auto">
        {/* Wine Images and Region Info */}
        <div className="lg:w-1/2 pt-10">
          <img
            src={wine.image || "https://picsum.photos/200"}
            alt={wine.name}
            className="rounded-lg shadow-lg w-full h-auto"
          />
          <h2 className="mt-4 mb-2">Mapa de la región: {wine.region?.name || "Desconocida"}</h2>
          {wine.region?.image ? (
            <img
              src={wine.region.image}
              alt={`Mapa de la región ${wine.region.name}`}
              className="rounded-lg shadow-lg w-48"
            />
          ) : (
            <p className="text-sm italic text-gray-500">Mapa de la región no disponible.</p>
          )}

          {/* Review List */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Valoraciones y comentarios</h2>
            <ReviewList 
              reviews={reviews} 
              user={user} 
              onEdit={(review) => {
                logger.info(`Usuario inició edición de reseña ID: ${review._id}`)
                setEditingReview(review)
              }} 
              onDelete={(reviewId) => {
                logger.warn(`Usuario eliminó la reseña ID: ${reviewId}`)
                notify.warning("Se ha eliminado la reseña.")
                handleReviewDelete(reviewId)
              }} 
            />
          </div>
        </div>

        {/* Wine Metadata */}
        <div className="lg:w-1/2 space-y-4 pt-10">
          <h1 className="text-3xl font-bold">{wine.name}</h1>
          <h3 className="text-lg font-semibold">Tipo de Vino: {wine.type}</h3>
          <h3 className="text-lg font-semibold">Tipo de Uva: {wine.grapeType || "No especificado"}</h3>
          <h3 className="text-lg font-semibold">Año: {wine.year}</h3>
          <h2 className="text-lg font-semibold">Bodega: {wine.winery?.name || "Desconocida"}</h2>
          <h2 className="text-lg font-semibold">Región: {wine.region?.name || "Desconocida"}</h2>
          <h2 className="text-lg font-semibold">País: {wine.country}</h2> 
          <p className="mt-2">{wine.description}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Información adicional</h2>
            <p className="whitespace-pre-line">{wine.additionalDescription || "Información adicional no disponible."}</p>
          </div>

          <p className="text-lg font-semibold">Precio: {wine.price}€</p>
        </div>
      </div>

      {/* Review Form */}
      <WineReview 
        wineId={wine._id} 
        reviews={reviews}
        onReviewSubmitted={() => {
          logger.info("Nueva valoración enviada, recargando reseñas.")
          fetchReviews()
        }} 
        editingReview={editingReview} 
        setEditingReview={setEditingReview} 
      />

      {/* Return Button */}
      <Link to="/wines" className="flex items-center text-lg font-bold ml-5 mt-6">
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
