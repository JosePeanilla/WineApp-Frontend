/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useUpsertWine = () => {
  const logger = new Logger("useUpsertWine")

  const upsertWine = async (wineData, wineId = null) => {
    try {
      const method = wineId ? "PUT" : "POST"
      const url = wineId 
        ? `${import.meta.env.VITE_SERVER_URL}/wines/${wineId}` 
        : `${import.meta.env.VITE_SERVER_URL}/wines`

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(wineData)
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

  const deleteWine = async (wineId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/wines/${wineId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      const jsonData = await response.json()
      if (!response.ok) throw jsonData

      logger.info(`Vino eliminado correctamente (ID: ${wineId})`)
      return { data: jsonData }
    } catch (error) {
      logger.error("Error al eliminar el vino:", error)
      return { error: error.message || "Error desconocido" }
    }
  }

  return { upsertWine, deleteWine }
}
