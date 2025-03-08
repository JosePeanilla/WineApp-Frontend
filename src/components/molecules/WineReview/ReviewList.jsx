import React from "react"
import { ReviewItem } from "./ReviewItem"

export const ReviewList = ({ reviews, user, onEdit, onDelete }) => {
  
  return (
    <div className="mt-6">
      {reviews.length === 0 ? (
        <p>Aún no hay comentarios.</p>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review._id} review={review} user={user} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  )
}
