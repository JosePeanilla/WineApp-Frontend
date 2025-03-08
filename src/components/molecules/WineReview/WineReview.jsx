/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ReviewForm } from "./ReviewForm"
import { useWineReview } from "/src/hooks/useWineReview"

const logger = new Logger("WineReview")

export const WineReview = ({ wineId, onReviewSubmitted, editingReview, setEditingReview }) => {
  const { user } = useContext(AuthContext)
  const { handleReviewSubmit, handleReviewUpdate } = useWineReview(wineId)

  if (!wineId) {
    logger.error("No se recibió un ID de vino válido en WineReview.")
    return <p className="text-red-500">Error: No se puede cargar la sección de reseñas.</p>
  }

  logger.info(`Renderizando WineReview para el vino ID: ${wineId}`)

  const submitReview = async (review) => {
    try {
      if (editingReview) {
        logger.info(`Actualizando reseña ID: ${editingReview._id} para el vino ID: ${wineId}`)
        await handleReviewUpdate({ ...editingReview, rating: review.rating, comment: review.comment })
      } else {
        logger.info(`Enviando nueva reseña para el vino ID: ${wineId}`)
        await handleReviewSubmit(review)
      }

      setEditingReview(null)
      onReviewSubmitted()
      logger.info("Reseña enviada con éxito.")
    } catch (error) {
      logger.error("Error al enviar la reseña:", error)
      alert("Hubo un problema al enviar la reseña. Inténtalo de nuevo.")
    }
  }

  return (
    <section className="mt-6">
      <ReviewForm
        wineId={wineId}
        onReviewSubmit={submitReview}
        editingReview={editingReview}
        onCancelEdit={() => {
          logger.info("El usuario canceló la edición de la reseña.")
          setEditingReview(null)
        }}
      />
    </section>
  )
}
