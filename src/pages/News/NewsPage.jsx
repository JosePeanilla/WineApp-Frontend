/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const logger = new Logger("NewsPage")

export const NewsPage = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    logger.info("Página de Noticias cargada correctamente.")
    
    // Datos de ejemplo
    const fakeNews = [
      {
        id: "1",
        title: "Nueva Bodega en Argentina",
        summary: "Conoce la nueva bodega que está revolucionando el mercado del vino en Argentina.",
        imageUrl: "https://via.placeholder.com/400x250?text=Noticia+1",
        isRecent: true,
      },
      {
        id: "2",
        title: "Ranking de Vinos 2024",
        summary: "Descubre cuáles son los vinos más valorados por los usuarios en el ranking 2024.",
        imageUrl: "https://via.placeholder.com/400x250?text=Noticia+2",
        isRecent: true,
      },
      {
        id: "3",
        title: "Evento Exclusivo en España",
        summary: "Participa en una cata exclusiva con los mejores vinos del año en España.",
        imageUrl: "https://via.placeholder.com/400x250?text=Noticia+3",
        isRecent: false,
      },
      {
        id: "4",
        title: "Nuevo Maridaje de Quesos",
        summary: "Te presentamos una selección de quesos perfectos para maridar con vinos tintos.",
        imageUrl: "https://via.placeholder.com/400x250?text=Noticia+4",
        isRecent: false,
      },
      {
        id: "5",
        title: "Top 5 Bodegas Europeas",
        summary: "Un recorrido por las bodegas más destacadas de Europa este año.",
        imageUrl: "https://via.placeholder.com/400x250?text=Noticia+5",
        isRecent: false,
      },
    ]

    setNews(fakeNews)
  }, [])

  const recentNews = news.filter((item) => item.isRecent)
  const otherNews = news.filter((item) => !item.isRecent)

  return (
    <section id="news_page" className="flex flex-col">
      {/* Sección Hero */}
      <div className="relative bg-[url('https://via.placeholder.com/1200x400?text=Noticias+Hero')] bg-cover bg-center h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-white text-4xl font-bold">Noticias</h1>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Recent News */}
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042]">Noticias Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentNews.length > 0 ? (
            recentNews.map((item) => (
              <article
                key={item.id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                <p className="text-gray-700 mt-2 flex-grow">{item.summary}</p>
                <Link
                  to={`/news/${item.id}`}
                  className="mt-4 text-[#9f2042] hover:underline font-medium"
                >
                  Leer más
                </Link>
              </article>
            ))
          ) : (
            <p className="text-gray-500 md:col-span-2">
              No hay noticias recientes.
            </p>
          )}
        </div>

        {/* Separador */}
        <hr className="my-10 border-t-2 border-gray-200" />

        {/* Otras noticias */}
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042]">Otras Noticias</h2>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          {otherNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-white shadow-md rounded-xl p-6 flex flex-col hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                  <p className="text-gray-700 mt-2 flex-grow">{item.summary}</p>
                  <Link
                    to={`/news/${item.id}`}
                    className="mt-4 text-[#9f2042] hover:underline font-medium"
                  >
                    Leer más
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No hay más noticias disponibles.</p>
          )}
        </div>
      </div>
    </section>
  )
}
