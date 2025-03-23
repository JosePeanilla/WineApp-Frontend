/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { FaWineBottle, FaUsers, FaStar } from "react-icons/fa"
import { AuthContext } from "/src/context/AuthContext"  // Importar contexto de autenticación

export const HomePage = () => {
  const logger = new Logger("HomePage")
  const { user } = useContext(AuthContext)  // Obtener información del usuario desde el contexto

  useEffect(() => {
    logger.info("HomePage cargada correctamente.")
  }, [])

  const wineImages = [ 
    "https://media.architecturaldigest.com/photos/57c9a2aceb60378a7b40892c/master/w_1920%2Cc_limit/champagne-caves-wine-cellars-01.jpg",
    "https://okdiario.com/img/2018/09/30/bodega-en-casa-655x368.jpg",
    "https://elcoto.com/wp-content/uploads/2022/01/maridar_vino_y_queso.jpg",
    "https://img.freepik.com/fotos-premium/cerca-manos-brindando-copas-vino-tinto-vinedo_109442-597.jpg",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="hero bg-wineapp-fuerte bg-100 text-center py-20">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-wineapp-muyligero">Bienvenidos</h1>
          <p className="py-6 text-wineapp-muyligero">
            Explora los mejores vinos, descubre nuevas bodegas y comparte tu experiencia con otros amantes del vino.
          </p>
          {!user && ( 
            <NavLink className="btn bg-wineapp-ligero text-white" to="/register">
              Registrarse
            </NavLink>
          )}
        </div>
      </div>

      {/* SECCIÓN EXPLICATIVA */}
      <div className="bg-gray-50 py-10 px-6 mt-6 rounded-lg shadow-lg text-center mx-auto w-3/4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Cómo funciona nuestra app?</h2>
        <p className="text-gray-700">
          Nuestra plataforma conecta consumidores y bodegas para ofrecer la mejor experiencia en vinos.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-10 mt-6">
          <div className="flex flex-col items-center">
            <FaWineBottle className="text-4xl text-wineapp-muyfuerte" />
            <p className="text-gray-700 mt-2">Descubre vinos</p>
          </div>
          <div className="flex flex-col items-center">
            <FaUsers className="text-4xl text-wineapp-muyfuerte" />
            <p className="text-gray-700 mt-2">Conéctate con bodegas</p>
          </div>
          <div className="flex flex-col items-center">
            <FaStar className="text-4xl text-wineapp-muyfuerte" />
            <p className="text-gray-700 mt-2">Comparte opiniones</p>
          </div>
        </div>
      </div>

      {/* CARRUSEL DE IMÁGENES */}
      <div className="my-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🍷 Descubre el Mundo del Vino</h2>
        <div className="mx-auto w-3/4 rounded-lg shadow-lg overflow-hidden">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="rounded-lg shadow-lg"
          >
            {wineImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-96 object-cover object-center rounded-lg"
                  onError={(e) => e.target.src = "https://via.placeholder.com/800x500?text=Imagen+no+disponible"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* SECCIÓN DE NOTICIAS */}
<div className="container mx-auto my-10 px-4">
  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Últimas Noticias</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
      <h3 className="text-lg font-semibold">🍷 Nueva bodega en Argentina</h3>
      <p className="text-sm text-gray-600">
        Conoce la nueva bodega que está revolucionando el mercado del vino.
      </p>
    </div>
    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
      <h3 className="text-lg font-semibold">🏅 Ranking de vinos 2024</h3>
      <p className="text-sm text-gray-600">
        Descubre cuáles son los vinos más valorados por los usuarios.
      </p>
    </div>
    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
      <h3 className="text-lg font-semibold">📢 Evento exclusivo en España</h3>
      <p className="text-sm text-gray-600">
        Participa en una cata exclusiva con los mejores vinos del año.
      </p>
    </div>
  </div>

  {/* Enlace a la página de noticias */}
        <div className="text-center mt-6">
          <NavLink
          to="/news"
          className="inline-block bg-wineapp-ligero text-white px-4 py-2 rounded-lg shadow hover:bg-wineapp-muyfuerte transition-all"
        >
          Ver todas las noticias
        </NavLink>
      </div>
    </div>
  </div>
  )
}
