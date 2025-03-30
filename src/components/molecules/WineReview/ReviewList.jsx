/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External dependencies ***************************************************/
import React from "react"

/************************************************** Internal components ***************************************************/
import { ReviewItem } from "./ReviewItem"

const logger = new Logger("ReviewList")

export const ReviewList = ({ reviews, user, onEdit, onDelete }) => {
  /*************************************** Validate reviews ***************************************/
  if (!reviews) {
    logger.error("Se intentó renderizar ReviewList sin una lista de reseñas válida.")
    return <p className="text-red-500">Error: No se pueden cargar las reseñas.</p>
  }

  logger.info(`Renderizando ReviewList con ${reviews.length} reseñas.`)

  /*************************************** Render review list ***************************************/
  return (
    <div className="mt-6">
      {reviews.length === 0 ? (
        <>
          {logger.warn("No hay reseñas disponibles.")}
          <p>Aún no hay comentarios.</p>
        </>
      ) : (
        reviews.map((review) => (
          <ReviewItem
            key={review._id}
            review={review}
            user={user}
            onEdit={(review) => {
              logger.info(`El usuario ID ${user?.id} está editando la reseña ID ${review._id}`)
              onEdit(review)
            }}
            onDelete={(reviewId) => {
              logger.warn(`El usuario ID ${user?.id} está eliminando la reseña ID ${reviewId}`)
              onDelete(reviewId)
            }}
          />
        ))
      )}
    </div>
  )
}
