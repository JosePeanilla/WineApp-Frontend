import React, { useState, useEffect, useContext, useMemo } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ReviewForm } from "./ReviewForm"
import { ReviewList } from "./ReviewList"
import { useWineReview } from "/src/hooks/useWineReview"

export const WineReview = ({ wineId }) => {
  const { user } = useContext(AuthContext)
  const { reviews, fetchReviews, handleReviewSubmit, handleReviewUpdate, handleReviewDelete } = useWineReview(wineId)

  const [editingReview, setEditingReview] = useState(null)

  useEffect(() => {
    fetchReviews()
  }, [wineId])

  const handleEditReview = (review) => {
    setEditingReview(review)
  }

  const handleCancelEdit = () => {
    setEditingReview(null)
  }

  const handleUpdateReview = (updatedReview) => {
    handleReviewUpdate(updatedReview)
    setEditingReview(null)
  }

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0
    const total = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (total / reviews.length).toFixed(1)
  }, [reviews]) 

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold">Valoraciones y Comentarios</h2>
      <p className="text-lg">Valoración media: {averageRating} ⭐</p>

      {user && (
        <ReviewForm 
          wineId={wineId} 
          onReviewSubmit={handleReviewSubmit} 
          onReviewUpdate={handleUpdateReview}  
          editingReview={editingReview} 
          onCancelEdit={handleCancelEdit} 
        />
      )}

      <ReviewList 
        reviews={reviews} 
        user={user} 
        onEdit={handleEditReview}  
        onDelete={handleReviewDelete} 
      />
    </section>
  )
}
