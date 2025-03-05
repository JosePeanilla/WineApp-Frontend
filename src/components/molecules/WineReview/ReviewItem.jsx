import React from "react"
import { Button } from "/src/components/atoms/Form"

export const ReviewItem = ({ review, user, onEdit, onDelete }) => {
  return (
    <div className="p-2 border-b mt-2">
      <p>
        <strong>{review.user?.name || "Anónimo"}</strong> - ⭐ {review.rating}
      </p>
      <p>{review.comment}</p>
      {user && user.id === review.user?._id && (
        <div className="flex gap-2 mt-2">
          <Button variant="ligero" onClick={() => onEdit(review)}>Editar</Button>
          <Button variant="eliminar" onClick={() => onDelete(review._id)}>Eliminar</Button>
        </div>
      )}
    </div>
  )
}
