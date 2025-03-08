import React, { useState, useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ReviewForm } from "./ReviewForm"
import { useWineReview } from "/src/hooks/useWineReview"

export const WineReview = ({ wineId, onReviewSubmitted, editingReview, setEditingReview }) => {
  const { user } = useContext(AuthContext)
  const { handleReviewSubmit, handleReviewUpdate } = useWineReview(wineId)

  const submitReview = async (review) => {
    if (editingReview) {
      await handleReviewUpdate({ ...editingReview, rating: review.rating, comment: review.comment })
    } else {
      await handleReviewSubmit(review)
    }
    setEditingReview(null) 
    onReviewSubmitted()
  }

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold">Tu valoración</h2>
      {user && (
        <ReviewForm
          wineId={wineId}
          onReviewSubmit={submitReview}
          editingReview={editingReview}
          onCancelEdit={() => setEditingReview(null)}
        />
      )}
    </section>
  )
}