/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/**************************************************************************************************
 * useUpsertWine Hook:
 * Handles wine creation, update, and deletion for winery users.
 * - upsertWine(): Creates a new wine or updates an existing one
 * - deleteWine(): Deletes a wine by ID
 * - Uses logger for detailed action tracking
 * - Requires user token for authenticated actions
 **************************************************************************************************/
export const useUpsertWine = () => {
  const logger = new Logger("useUpsertWine")

  /****************************** Create or Update Wine ******************************/
  const upsertWine = async (wineData, wineId = null) => {
    try {
      // Append ID to payload if updating
      if (wineId) {
        wineData = { ...wineData, id: wineId }
      }

      const method = wineId ? "PUT" : "POST"
      const url = wineId
        ? `${import.meta.env.VITE_SERVER_URL}/wines/${wineId}`
        : `${import.meta.env.VITE_SERVER_URL}/wines`

      logger.info(`Enviando ${method} a ${url} con datos:`, wineData)

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wineData),
      })

      const jsonData = await response.json()

      if (!response.ok) throw jsonData

      logger.info(`Vino ${wineId ? "actualizado" : "creado"} correctamente`)
      return { data: jsonData }

    } catch (error) {
      logger.error("Error en la solicitud de upsert del vino:", error)
      return { error: error.message || "Error desconocido" }
    }
  }

  /****************************** Delete Wine ******************************/
  const deleteWine = async (wineId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/wines/${wineId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const jsonData = await response.json()

      if (!response.ok) throw jsonData

      logger.info(`Vino eliminado correctamente (ID: ${wineId})`)
      return { data: jsonData }

    } catch (error) {
      logger.error("Error al eliminar el vino:", error)
      return { error: error.message || "Error desconocido" }
    }
  }

  /****************************** Return Handlers ******************************/
  return { upsertWine, deleteWine }
}
