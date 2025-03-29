/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External dependencies ***************************************************/
import React, { useContext, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { notify } from "/src/utils/notifications"

/************************************************** Internal components ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { ReviewForm } from "./ReviewForm"
import { useWineReview } from "/src/hooks/useWineReview"

const logger = new Logger("WineReview")

export const WineReview = ({ wineId, reviews, onReviewSubmitted, editingReview, setEditingReview }) => {
  const { user } = useContext(AuthContext)
  const { handleReviewSubmit, handleReviewUpdate } = useWineReview(wineId)
  const formRef = useRef(null)

  /*************************************** Scroll to review form when editing ***************************************/
  useEffect(() => {
    if (editingReview && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      logger.info("Desplazando vista al formulario de edición.")
    }
  }, [editingReview])

  /*************************************** Validate wine ID ***************************************/
  if (!wineId) {
    logger.error("No se recibió un ID de vino válido en WineReview.")
    return <p className="text-red-500">Error: No se puede cargar la sección de reseñas.</p>
  }

  logger.info(`Renderizando WineReview para el vino ID: ${wineId}`)

  /*************************************** Submit review logic ***************************************/
  const submitReview = async (review) => {
    try {
      if (editingReview) {
        logger.info(`Actualizando reseña ID: ${editingReview._id} para el vino ID: ${wineId}`)
        await handleReviewUpdate({ ...editingReview, rating: review.rating, comment: review.comment })
      } else {
        logger.info(`Enviando nueva reseña para el vino ID: ${wineId}`)
        await handleReviewSubmit(review)
      }

      setEditingReview(null)
      onReviewSubmitted()
      logger.info("Reseña enviada con éxito.")
      notify.info("Reseña enviada con éxito.")
    } catch (error) {
      logger.error("Error al enviar la reseña:", error)
      notify.error("Hubo un problema al enviar la reseña. Inténtalo de nuevo.")
    }
  }

  /*************************************** Check user authentication ***************************************/
  if (!user) {
    logger.info("Usuario no logueado intentando ver la sección de reseñas")
    return (
      <section className="mt-6">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-4">¿Quieres dejar tu valoración?</h2>
          <p className="mb-4">Para comentar este vino necesitas iniciar sesión.</p>
          <Link to="/login" className="inline-block bg-[#7b0d1e] hover:bg-[#f8e5ee] text-white font-bold py-2 px-4 rounded transition duration-300">
            Iniciar Sesión
          </Link>
        </div>
      </section>
    )
  }

  /*************************************** Check user role ***************************************/
  if (user.role !== "consumers") {
    logger.info("Usuario con rol distinto de 'consumer' intentando comentar")
    return (
      <section className="mt-6">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-4">Acceso Restringido</h2>
          <p className="mb-4">
            Lo sentimos, pero esta acción está disponible solo para usuarios con perfil <strong>consumidor</strong>.
            Si crees que deberías tener acceso, por favor, contacta con soporte.
          </p>
        </div>
      </section>
    )
  }

  /*************************************** Check if user already reviewed ***************************************/
  const userHasReviewed = reviews?.length > 0 && reviews.some((review) => review.user?._id === user.id)

  if (userHasReviewed && !editingReview) {
    logger.info(`El usuario ID ${user.id} ya ha valorado este vino.`)
    return (
      <section className="mt-6">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-4">Ya has valorado este vino</h2>
          <p className="mb-4">
            Si has cambiado de idea, por favor, edita o elimina tu reseña. ¡Gracias!
          </p>
        </div>
      </section>
    )
  }

  /*************************************** Render Review Form ***************************************/
  return (
    <section className="mt-6">
      <div ref={formRef} />  
      <ReviewForm
        wineId={wineId}
        onReviewSubmit={submitReview}
        editingReview={editingReview}
        onCancelEdit={() => {
          logger.info("El usuario canceló la edición de la reseña.")
          setEditingReview(null)
        }}
      />
    </section>
  )
}
