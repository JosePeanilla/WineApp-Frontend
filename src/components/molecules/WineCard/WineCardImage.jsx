/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState } from "react"

const logger = new Logger("WineCardImage")

export const WineCardImage = ({ image, name }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: "none" })
  const [isZooming, setIsZooming] = useState(false)

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
      backgroundSize: "700%", 
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      pointerEvents: "none",
      borderRadius: "inherit",
      cursor: "zoom-out",
    })

    setIsZooming(true) 
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" })
    setIsZooming(false) 
  }

  return (
    <figure className="flex justify-center items-center w-auto h-auto rounded-lg overflow-hidden relative group">
      <img
        src={image || "/default-wine.jpg"}
        alt={name || "Vino desconocido"}
        className={`w-auto max-h-[400px] object-contain rounded-lg transition-opacity duration-300 ease-in-out ${
          isZooming ? "opacity-0" : "opacity-100"
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "zoom-in" }}
      />
      <div style={zoomStyle} className="zoom-overlay" />
    </figure>
  )
}
