/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/************************************************** Internal Context, Hooks and Components ***************************************************/
import { AuthContext } from "/src/context/AuthContext"
import { useUpsertWine } from "/src/hooks/useUpsertWine"
import { WineForm } from "/src/components/organisms/Wine/WineForm"
import { WineCard } from "/src/components/molecules/WineCard"
import { Button } from "/src/components/atoms/Form"

/**************************************************************************************************
 * WinesManagementPage Component:
 * Page for winery users to manage their own wines:
 * - Fetches wines owned by the logged-in winery
 * - Allows editing and deleting wines
 * - Provides a form to create or update wine entries
 * Redirects non-winery users to the homepage.
 **************************************************************************************************/
export const WinesManagementPage = () => {
  const logger = new Logger("WinesManagementPage")

  /****************************** Auth & Router ******************************/
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  /****************************** Local State ******************************/
  const [wines, setWines] = useState([])
  const [wineToEdit, setWineToEdit] = useState(null)

  /****************************** Wine API Actions ******************************/
  const { deleteWine } = useUpsertWine()

  /****************************** Fetch Winery Wines on Mount ******************************/
  useEffect(() => {
    if (!user || user.role !== "wineries") {
      logger.warn("Acceso no autorizado a WinesManagementPage.")
      navigate("/")
      return
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}/wines/winery/${user.id}`)
      .then((res) => res.json())
      .then((data) => setWines(data.data || []))
      .catch((error) => logger.error("Error fetching wines:", error))
  }, [user, navigate])

  /****************************** Handle Delete ******************************/
  const handleDelete = async (wineId) => {
    const confirmed = confirm("¿Seguro deseas eliminar este vino?")
    if (confirmed) {
      const result = await deleteWine(wineId)

      if (result.error) {
        notify.error(result.error)
      } else {
        setWines((prev) =>
          prev.filter((wine) => wine.id !== wineId && wine._id !== wineId)
        )
        notify.info("Vino eliminado correctamente.")
      }
    }
  }

  /****************************** Handle Edit ******************************/
  const handleEdit = (wine) => {
    setWineToEdit({ ...wine, id: wine.id || wine._id })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /****************************** Handle Cancel Edit ******************************/
  const handleCancelEdit = () => setWineToEdit(null)

  /****************************** Render Wines Management Page ******************************/
  return (
    <section className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-4">Gestionar Vinos</h1>

      {/* Wine Form: for Create / Update */}
      <WineForm
        wine={wineToEdit}
        onSuccess={() => window.location.reload()} // reload to refetch wines after submit
        onCancel={handleCancelEdit}
      />

      {/* Wines List */}
      <div className="mt-6">
        {wines.length > 0 ? (
          [...wines]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((wine) => (
              <div key={wine.id || wine._id} className="mb-4">
                <WineCard
                  wine={wine}
                  showEditDelete={true}
                  onEdit={() => handleEdit(wine)}
                  onDelete={(wineId) => handleDelete(wineId)}
                />
              </div>
            ))
        ) : (
          <p className="text-center font-bold">No tienes vinos registrados aún.</p>
        )}
      </div>
    </section>
  )
}
