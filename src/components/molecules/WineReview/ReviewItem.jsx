/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React from "react"

/************************************************** Internal Components ***************************************************/
import { Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * ReviewItem Component
 *
 * Renders an individual review with its details.
 * - Displays the user's name, rating, and comment.
 * - If the current user is the author of the review, it shows the edit and delete buttons.
 **************************************************************************************************/
const logger = new Logger("ReviewItem")

export const ReviewItem = ({ review, user, onEdit, onDelete }) => {
  /*************************************** Validate review ***************************************/
  if (!review) {
    logger.error("Se intentó renderizar ReviewItem sin una reseña válida.")
    return <p className="text-red-500">Error: Información de la reseña no disponible.</p>
  }

  logger.debug(`Mostrando reseña ID: ${review._id} - Valoración: ${review.rating}`)

  /*************************************** Render review item ***************************************/
  return (
    <div className="p-2 border-b mt-2">
      {/* Display user name and star rating */}
      <p>
        <strong>{`${review.user?.name || "Anónimo"} ${review.user?.surname || ""}`.trim()}</strong> - ⭐ {review.rating}
      </p>

      {/* Display the comment */}
      <p>{review.comment}</p>

      {/* Show edit and delete buttons only if the current user is the author */}
      {user && user.id === review.user?._id && (
        <div className="flex gap-2 mt-2">
          {/* Edit button */}
          <Button
            variant="ligero"
            onClick={() => {
              logger.info(`Usuario ID ${user.id} editando reseña ID ${review._id}`)
              onEdit(review)
            }}
          >
            Editar
          </Button>

          {/* Delete button */}
          <Button
            variant="eliminar"
            onClick={() => {
              logger.warn(`Usuario ID ${user.id} eliminando reseña ID ${review._id}`)
              onDelete(review._id)
            }}
          >
            Eliminar
          </Button>
        </div>
      )}
    </div>
  )
}
