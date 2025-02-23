/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "/src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { WineForm } from "/src/components/organisms/Wine/WineForm";
import { useUpsertWine } from "/src/hooks/useUpsertWine";
import { WineCard } from "/src/components/molecules/WineCard";
import { Button } from "/src/components/atoms/Form";

export const WinesManagementPage = () => {
  const logger = new Logger("WinesManagementPage");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wines, setWines] = useState([]);
  const [wineToEdit, setWineToEdit] = useState(null);
  const { deleteWine } = useUpsertWine();

  useEffect(() => {
    if (!user || user.role !== "wineries") {
      logger.warn("Acceso no autorizado a WinesManagementPage.")
      navigate("/");
    } else {
      fetch(`${import.meta.env.VITE_SERVER_URL}/wines/winery/${user.id}`)
        .then((res) => res.json())
        .then((data) => setWines(data.data || []))
        .catch((error) => logger.error("Error fetching wines:", error))
    }
  }, [user, navigate]);

  const handleDelete = async (wineId) => {
    const confirmed = confirm("¿Seguro deseas eliminar este vino?")
    if (confirmed) {
      const result = await deleteWine(wineId)
      if (result.error) {
        alert(result.error)
      } else {
        setWines((prevWines) => prevWines.filter((wine) => wine.id !== wineId && wine._id !== wineId))
        alert("Vino eliminado correctamente.")
      }
    }
  }

  const handleEdit = (wine) => {
    setWineToEdit({ ...wine, id: wine.id || wine._id })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Gestionar Vinos</h1>
      <WineForm wine={wineToEdit} onSuccess={() => window.location.reload()} />

      <div className="mt-6">
        {wines.length > 0 ? (
          wines.map((wine) => (
            <div key={wine.id || wine._id} className="mb-4">
              <WineCard wine={wine} />
              <div className="flex gap-2 mt-2">
                <Button variant="moderado" onClick={() => handleEdit(wine)}>Editar</Button>
                <Button variant="eliminar" onClick={() => handleDelete(wine.id || wine._id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes vinos registrados aún.</p>
        )}
      </div>
    </section>
  )
}
