import React, { useState, useEffect } from "react"
import StarRatings from "react-star-ratings"
import { Button } from "/src/components/atoms/Form"

export const ReviewForm = ({ wineId, onReviewSubmit, editingReview = null, onCancelEdit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating)
      setComment(editingReview.comment)
    } else {
      setRating(0)
      setComment("")
    }
  }, [editingReview])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) {
      alert("Debes agregar una valoración con estrellas.")
      return
    }
    onReviewSubmit({ 
      wine: wineId, 
      rating, 
      comment, 
      _id: editingReview?._id 
    })
    
    if (!editingReview) {
      setRating(0)
      setComment("")
    }
    onCancelEdit?.() 
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
          {editingReview ? "Actualizar Reseña" : "Enviar Valoración"}
        </Button>
        {editingReview && (
          <Button type="button" variant="ligero" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
