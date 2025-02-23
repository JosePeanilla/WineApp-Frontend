/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useCloudinaryUpload = () => {
  const logger = new Logger("useCloudinaryUpload")

  const uploadImage = async (file) => {
    if (!file) {
      logger.error("No se proporcionó ningún archivo para subir.")
      return { error: "Error: No se proporcionó archivo para subir." }
    }

    if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || !import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
      logger.error("Cloudinary no está configurado correctamente en el .env")
      return { error: "Cloudinary no está configurado correctamente." }
    }

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      )

      const jsonData = await response.json()

      if (!response.ok) throw jsonData

      logger.info("Imagen subida correctamente a Cloudinary.")
      return { data: jsonData }
    } catch (error) {
      logger.error("Error en la solicitud de subida de imagen:", error)
      return { error: error.message || "Error desconocido al subir la imagen" }
    }
  }

  return { uploadImage }
}
