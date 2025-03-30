/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useState, useContext, useCallback } from "react"
import { AuthContext } from "/src/context/AuthContext"

/**************************************************************************************************
 * useWineReview Hook:
 * Encapsula toda la lógica para:
 * - Obtener, crear, actualizar y eliminar reseñas de un vino
 * - Calcular la valoración media
 * - Añadir el flag `isOwner` a cada reseña si pertenece al usuario actual
 **************************************************************************************************/
export const useWineReview = (wineId) => {
  const logger = new Logger("useWineReview")
  const { user } = useContext(AuthContext)

  /****************************** Local State ******************************/
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)

  /****************************** Fetch All Reviews ******************************/
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

      const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0)
      setAverageRating(updatedReviews.length > 0 ? totalRating / updatedReviews.length : 0)

      logger.info(`Cargadas ${updatedReviews.length} reseñas para el vino ID: ${wineId}`)
    } catch (err) {
      logger.error("Error al cargar reseñas:", err)
    }
  }, [wineId, user])

  /****************************** Submit New Review ******************************/
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

      // Actualizamos lista y recargamos desde backend
      setReviews((prevReviews) => [...prevReviews, responseData.data])
      fetchReviews()
    } catch (err) {
      logger.error("Error al enviar la reseña:", err)
    }
  }

  /****************************** Update Existing Review ******************************/
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

      setReviews((prev) =>
        prev.map((rev) => (rev._id === updatedReview._id ? updatedData.data : rev))
      )
    } catch (error) {
      logger.error("Error al actualizar la reseña:", error)
    }
  }

  /****************************** Delete Review ******************************/
  const handleReviewDelete = async (reviewId) => {
    try {
      logger.warn(`Eliminando reseña ID: ${reviewId} para el vino ID: ${wineId}`)

      await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      setReviews((prev) => prev.filter((rev) => rev._id !== reviewId))

      logger.info(`Reseña ID: ${reviewId} eliminada con éxito para el vino ID: ${wineId}`)
    } catch (error) {
      logger.error("Error al eliminar la reseña:", error)
    }
  }

  /****************************** Return API ******************************/
  return {
    reviews,
    averageRating,
    fetchReviews,
    handleReviewSubmit,
    handleReviewUpdate,
    handleReviewDelete,
  }
}
