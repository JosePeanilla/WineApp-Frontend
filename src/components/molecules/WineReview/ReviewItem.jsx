/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React from "react"
import { Button } from "/src/components/atoms/Form"

const logger = new Logger("ReviewItem")

export const ReviewItem = ({ review, user, onEdit, onDelete }) => {
  if (!review) {
    logger.error("Se intentó renderizar ReviewItem sin una reseña válida.")
    return <p className="text-red-500">Error: Información de la reseña no disponible.</p>
  }

  logger.debug(`Mostrando reseña ID: ${review._id} - Valoración: ${review.rating}`)

  return (
    <div className="p-2 border-b mt-2">
      <p>
        <strong>{review.user?.name || "Anónimo"}</strong> - ⭐ {review.rating}
      </p>
      <p>{review.comment}</p>

      {user && user.id === review.user?._id && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="ligero"
            onClick={() => {
              logger.info(`Usuario ID ${user.id} editando reseña ID ${review._id}`)
              onEdit(review)
            }}
          >
            Editar
          </Button>
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
