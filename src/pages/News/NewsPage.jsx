/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect, useState } from "react"

/**************************************************************************************************
 * NewsPage Component:
 * Displays the latest news related to the wine world. It separates recent news from older entries,
 * simulates data fetching with fake data, logs user actions, and uses responsive design.
 **************************************************************************************************/
export const NewsPage = ({ user }) => {
  const logger = new Logger("NewsPage")

  /****************************** Local State ******************************/
  const [news, setNews] = useState([])

  /****************************** Scroll to Top on Mount ******************************/
  useEffect(() => {
    window.scrollTo(0, 0)
    logger.info("Desplazamiento al inicio de la página de noticias.")
  }, [])

  /****************************** Fetch and Set News ******************************/
  /*
   * This useEffect simulates fetching news articles when the component mounts.
   * It logs the load and sets local state with predefined fake news data.
   */
  useEffect(() => {
    logger.info("Página de Noticias cargada correctamente.")

    // Simulated news data
    const fakeNews = [
      {
        id: "1",
        title: "Nueva Bodega en Argentina",
        summary: "Una innovadora bodega en Argentina fusiona tradición y tecnología para revolucionar el mercado del vino.",
        imageUrl: "https://infonegocios.info/content/images/2024/08/27/483589/Dise%C3%B1o-sin-t%C3%ADtulo---2024-08-27T214610.890.jpg",
        isRecent: true,
      },
      {
        id: "2",
        title: "Ranking de Vinos 2024",
        summary: "Expertos publican el ranking de los vinos más destacados para el próximo año, marcando tendencias en el sector.",
        imageUrl: "https://hips.hearstapps.com/hmg-prod/images/cabeceravinosesquire3-676e733000705.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
        isRecent: true,
      },
      {
        id: "3",
        title: "Evento Exclusivo en España",
        summary: "Una cata exclusiva reúne a reconocidos sommeliers en España para descubrir vinos de alta gama.",
        imageUrl: "https://www.plateamadrid.com/wp-content/uploads/2024/02/CATA-DE-VINOS-EN-MADRID-PARA-EVENTOS-DE-EMPRESA-UNA-EXPERIENCIA-INOLVIDABLE-2.jpg",
        isRecent: false,
      },
      {
        id: "4",
        title: "Nuevo Maridaje de Quesos",
        summary: "Descubre la combinación perfecta entre quesos artesanales y vinos tintos selectos.",
        imageUrl: "https://elcoto.com/wp-content/uploads/2022/01/maridar_vino_y_queso.jpg",
        isRecent: false,
      },
      {
        id: "5",
        title: "Top 5 Bodegas Europeas",
        summary: "Un recorrido por las bodegas más prestigiosas de Europa, destacadas por su innovación y calidad.",
        imageUrl: "https://phantom-expansion.unidadeditorial.es/c0a05d8c2e37374300c5553fc94f7e71/crop/63x0/828x510/resize/660/f/webp/assets/multimedia/imagenes/2024/11/05/17308277068161.jpg",
        isRecent: false,
      },
    ]

    setNews(fakeNews)
  }, [])

  /****************************** News Filters ******************************/
  const recentNews = news.filter((item) => item.isRecent)
  const otherNews = news.filter((item) => !item.isRecent)

  /****************************** Render News Page ******************************/
  return (
    <section id="news_page" className="flex flex-col">

      {/* HERO SECTION */}
      <div className="hero bg-wineapp-fuerte bg-100 text-center py-20">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-wineapp-muyligero">Últimas Noticias</h1>
          <p className="py-6 text-wineapp-muyligero">
            Mantente informado con las novedades del mundo del vino🍇
          </p>
        </div>
      </div>

      {/* NEWS LIST SECTION */}
      <div className="container mx-auto px-6 py-10">

        {/* Recent News */}
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042]">Noticias Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentNews.length > 0 ? (
            recentNews.map((item) => (
              <article
                key={item.id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                <p className="text-gray-700 mt-2 flex-grow">{item.summary}</p>
              </article>
            ))
          ) : (
            <p className="text-gray-500 md:col-span-2">
              No hay noticias recientes.
            </p>
          )}
        </div>

        {/* Other News */}
        <h2 className="text-2xl font-bold mt-10 mb-4 text-[#9f2042]">Otras Noticias</h2>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          {otherNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                  <p className="text-gray-700 mt-2 flex-grow">{item.summary}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No hay más noticias disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
