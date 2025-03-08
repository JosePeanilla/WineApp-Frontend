import React, { useState, useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ReviewForm } from "./ReviewForm"
import { useWineReview } from "/src/hooks/useWineReview"

export const WineReview = ({ wineId, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext)
  const { handleReviewSubmit } = useWineReview(wineId)

  const [editingReview, setEditingReview] = useState(null)

  const submitReview = async (review) => {
    await handleReviewSubmit(review)
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