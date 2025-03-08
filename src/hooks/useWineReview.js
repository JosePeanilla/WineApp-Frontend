/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState, useContext, useCallback } from "react"
import { AuthContext } from "/src/context/AuthContext"

export const useWineReview = (wineId) => {
  const { user } = useContext(AuthContext) 
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  
  const logger = new Logger("useWineReview")

  const fetchReviews = useCallback(async () => {
    try {
      if (!wineId) {
        logger.error("No se proporcionó un ID de vino válido en fetchReviews.")
        return
      }

      logger.info(`Obteniendo reseñas para el vino ID: ${wineId}`)

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/wine/${wineId}`)
      const data = await res.json()

      if (!data.data) {
        logger.warn(`No se encontraron reseñas para el vino ID: ${wineId}`)
        return
      }

      const updatedReviews = data.data.map((review) => ({
        ...review,
        isOwner: user && review.user?._id === user._id, 
      }))

      setReviews(updatedReviews)
      setAverageRating(
        updatedReviews.length > 0 ? updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length : 0
      )

      logger.info(`Cargadas ${updatedReviews.length} reseñas para el vino ID: ${wineId}`)
    } catch (err) {
      logger.error("Error al cargar reseñas:", err)
    }
  }, [wineId, user])

  const handleReviewSubmit = async (newReview) => {
    try {
      logger.info(`Enviando nueva reseña para el vino ID: ${wineId}`)

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newReview),
      })

      const responseData = await response.json()
      if (!response.ok) throw new Error(responseData.error || "Error al enviar la valoración")

      logger.info(`Reseña enviada correctamente para el vino ID: ${wineId}`)
      
      setReviews((prevReviews) => [...prevReviews, responseData.data])
      fetchReviews()
    } catch (err) {
      logger.error("Error al enviar la reseña:", err)
    }
  }

  const handleReviewUpdate = async (updatedReview) => {
    try {
      logger.info(`Actualizando reseña ID: ${updatedReview._id} para el vino ID: ${wineId}`)

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${updatedReview._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedReview),
      })

      const updatedData = await response.json()
      if (!response.ok) throw new Error(updatedData.error || "Error al actualizar la reseña")

      logger.info(`Reseña ID: ${updatedReview._id} actualizada con éxito para el vino ID: ${wineId}`)

      setReviews(reviews.map((rev) => (rev._id === updatedReview._id ? updatedData.data : rev)))
    } catch (error) {
      logger.error("Error al actualizar la reseña:", error)
    }
  }

  const handleReviewDelete = async (reviewId) => {
    try {
      logger.warn(`Eliminando reseña ID: ${reviewId} para el vino ID: ${wineId}`)

      await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      setReviews(reviews.filter((rev) => rev._id !== reviewId))
      logger.info(`Reseña ID: ${reviewId} eliminada con éxito para el vino ID: ${wineId}`)
    } catch (error) {
      logger.error("Error al eliminar la reseña:", error)
    }
  }

  return { reviews, averageRating, fetchReviews, handleReviewSubmit, handleReviewUpdate, handleReviewDelete }
}
