import React, { useState, useEffect, useContext } from "react"
import StarRatings from "react-star-ratings"
import { AuthContext } from "/src/context/AuthContext"
import { Button } from "/src/components/atoms/Form"

export const WineReview = ({ wineId, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [reviews, setReviews] = useState([])
  const [editingReview, setEditingReview] = useState(null)
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/wine/${wineId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.data) return 
        setReviews(data.data)
        const totalReviews = data.data.length
        const avgRating =
          totalReviews > 0
            ? data.data.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0
        setAverageRating(avgRating)
      })
      .catch((err) => console.error("Error al cargar valoraciones:", err))
  }, [wineId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert("Debes iniciar sesión para valorar un vino.")
      return
    }
    if (rating === 0 || comment.trim() === "") {
      alert("Debes agregar una valoración y un comentario.")
      return
    }

    const newReview = {
      wine: wineId, 
      rating,
      comment,
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newReview),
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.error || "Error al enviar la valoración")
      }

      setReviews([...reviews, responseData.data])
      setAverageRating(responseData.data.averageRating)
      setRating(0)
      setComment("")
      if (onReviewSubmitted && typeof onReviewSubmitted === "function") {
        onReviewSubmitted()
      }
    } catch (err) {
      console.error("Error al enviar la valoración:", err)
    }
  }

  const handleEdit = (review) => {
    setEditingReview(review)
    setRating(review.rating)
    setComment(review.comment)
  }

  const handleUpdate = async () => {
    if (!editingReview) return

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${editingReview._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ rating, comment }),
      })
      const updatedReview = await response.json()

      if (!response.ok) {
        throw new Error(updatedReview.error || "Error al actualizar la reseña")
      }

      setReviews(reviews.map((rev) => (rev._id === editingReview._id ? updatedReview.data : rev)))
      setEditingReview(null)
      setRating(0)
      setComment("")
    } catch (error) {
      console.error("Error al actualizar la reseña:", error)
    }
  }

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar tu comentario?")
    if (!confirmDelete) return

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la reseña")
      }

      setReviews(reviews.filter((rev) => rev._id !== reviewId))
    } catch (error) {
      console.error("Error al eliminar la reseña:", error)
    }
  }

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold">Valoraciones y Comentarios</h2>
      <p className="text-lg">
        Valoración media: {Number(averageRating || 0).toFixed(1)} ⭐
      </p>

      {user && (
        <form onSubmit={editingReview ? handleUpdate : handleSubmit} className="mt-4">
          <StarRatings
            rating={rating}
            starRatedColor="#ffd700"
            changeRating={setRating}
            numberOfStars={5}
            name="rating"
          />
          <textarea
            className="w-full p-2 mt-2 border rounded"
            placeholder="Deja tu comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="moderado" className="mt-2">
            {editingReview ? "Actualizar Valoración" : "Enviar Valoración"}
          </Button>
          {editingReview && (
            <Button type="button" variant="ligero" className="ml-2" onClick={() => setEditingReview(null)}>
              Cancelar
            </Button>
          )}
        </form>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comentarios:</h3>
        {reviews.length === 0 ? (
          <p>Aún no hay comentarios.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="p-2 border-b mt-2">
              <p>
                <strong>{rev.user?.name || "Anónimo"}</strong> - ⭐ {rev.rating}
              </p>
              <p>{rev.comment}</p>
              {user && user.id === rev.user?._id && (
                <div className="flex gap-2 mt-2">
                  <Button variant="ligero" onClick={() => handleEdit(rev)}>
                    Editar
                  </Button>
                  <Button variant="eliminar" onClick={() => handleDelete(rev._id)}>
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
