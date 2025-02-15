import { useNavigate } from "react-router-dom";

const WineCard = ({ wine }) => {
  const navigate = useNavigate(); // Hook para navegar al detalle del vino

  return (
    <div className="card card-side bg-base-100 shadow-xl cursor-pointer hover:shadow-2x1 transition"
      onClick={() => navigate(`/wines/${wine.id}`)} // Redirige a los detalles del vino
    >
      {/* Imagen del vino */}  
      <figure className="w-1/3"> 
        <img src={wine.image} alt={wine.name} className="w-full h-48 object-cover rounded-l-lg" />
      </figure> 

      {/* Contenido de la tarjeta */}
      <div className="card-body w-2/3">
        <h2 className="card-title text-lg font-semibold">{wine.name}</h2>
        <p className="text-sm text-gray-600">{wine.winery} - {wine.region} - {wine.country}</p>
        <p className="text-gray-500">{wine.description}</p>

        {/* Boton para ir a los detalles del vino */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={(e) => {
              e.stopPropagation();
              navigate(`/wines/${wine.id}`);
            }}>Catar</button>
        </div>
      </div>
    </div>
  )
}

export default WineCard
