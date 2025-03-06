import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ReviewForm } from "./ReviewForm"
import { useWineReview } from "/src/hooks/useWineReview"

export const WineReview = ({ wineId }) => {
  const { user } = useContext(AuthContext)
  const { handleReviewSubmit, handleReviewUpdate } = useWineReview(wineId)

  const [editingReview, setEditingReview] = useState(null)

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold">Tu valoración</h2>

      {user && (
        <ReviewForm 
          wineId={wineId} 
          onReviewSubmit={handleReviewSubmit} 
          onReviewUpdate={handleReviewUpdate}  
          editingReview={editingReview} 
          onCancelEdit={() => setEditingReview(null)} 
        />
      )}
    </section>
  )
}
