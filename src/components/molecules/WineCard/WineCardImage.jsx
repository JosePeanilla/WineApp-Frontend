/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState } from "react"

const logger = new Logger("WineCardImage")

export const WineCardImage = ({ image, name }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: "none" })

  if (!image) {
    logger.warn(`El vino "${name || "Desconocido"}" no tiene imagen asignada, usando imagen por defecto.`)
  }

  logger.debug(`Cargando imagen para: ${name || "Desconocido"}`)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomStyle({
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${image || "/default-wine.jpg"})`,
      backgroundSize: "700%", // Mantiene el zoom sin afectar el tamaño original
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      pointerEvents: "none",
      borderRadius: "inherit",
      cursor: "zoom-out",
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" })
  }

  return (
    <figure className="flex justify-center items-center w-auto h-auto rounded-lg overflow-hidden relative">
      <img
        src={image || "/default-wine.jpg"}
        alt={name || "Vino desconocido"}
        className="w-auto max-h-[400px] object-contain rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <div style={zoomStyle} className="zoom-overlay" />
    </figure>
  )
}
