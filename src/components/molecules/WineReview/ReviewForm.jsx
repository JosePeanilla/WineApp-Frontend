import React, { useState, useEffect } from "react"
import StarRatings from "react-star-ratings"
import { Button } from "/src/components/atoms/Form"

export const ReviewForm = ({ wineId, onReviewSubmit, editingReview = null }) => {
  const [rating, setRating] = useState(editingReview?.rating || 0)
  const [comment, setComment] = useState(editingReview?.comment || "")

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating)
      setComment(editingReview.comment)
    }
  }, [editingReview])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) {
      alert("Debes agregar una valoración con estrellas.")
      return
    }
    onReviewSubmit({ wine: wineId, rating, comment })
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <StarRatings
        rating={rating}
        starRatedColor="#ffd700"
        changeRating={setRating}
        numberOfStars={5}
        name="rating"
      />
      <textarea
        className="w-full p-2 mt-2 border rounded"
        placeholder="Escribe un comentario opcional..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-2 flex gap-2">
        <Button type="submit" variant="moderado">
          Enviar Valoración
        </Button>
      </div>
    </form>
  )
}
