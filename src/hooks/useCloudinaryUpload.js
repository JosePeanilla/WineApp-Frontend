/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useCloudinaryUpload Hook:
 * Handles image upload to Cloudinary.
 * - Validates presence of file and environment configuration
 * - Sends POST request to Cloudinary's upload endpoint
 * - Returns result or error message
 * - Logs every step of the process using custom logger
 **************************************************************************************************/
export const useCloudinaryUpload = () => {
  const logger = new Logger("useCloudinaryUpload")

  /****************************** Upload Function ******************************/
  const uploadImage = async (file) => {
    // Validate file input
    if (!file) {
      logger.error("No se proporcionó ningún archivo para subir.")
      return { error: "Error: No se proporcionó archivo para subir." }
    }

    // Validate Cloudinary .env config
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      logger.error("Cloudinary no está configurado correctamente en el .env")
      return { error: "Cloudinary no está configurado correctamente." }
    }

    try {
      // Build FormData payload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", UPLOAD_PRESET)

      // Send POST request to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      )

      const jsonData = await response.json()

      // Handle non-OK responses
      if (!response.ok) throw jsonData

      logger.info("Imagen subida correctamente a Cloudinary.")
      return { data: jsonData }
    } catch (error) {
      logger.error("Error en la solicitud de subida de imagen:", error)
      return { error: error.message || "Error desconocido al subir la imagen" }
    }
  }

  /****************************** Return Upload Handler ******************************/
  return { uploadImage }
}
