/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useState, useRef } from "react"

const logger = new Logger("WineCardImage")

export const WineCardImage = ({ image, name }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: "none" })
  const [isZooming, setIsZooming] = useState(false)
  const zoomContainerRef = useRef(null)

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

  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsZooming(true)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()  // Prevenir el comportamiento por defecto en movimiento táctil
    const touch = e.touches[0]
    if (!touch || !zoomContainerRef.current) return

    const { left, top, width, height } = zoomContainerRef.current.getBoundingClientRect()
    const x = ((touch.clientX - left) / width) * 100
    const y = ((touch.clientY - top) / height) * 100

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
    })
  }

  const handleTouchEnd = () => {
    setZoomStyle({ display: "none" })
    setIsZooming(false)
  }

  return (
    <figure
      ref={zoomContainerRef}
      className="flex justify-center items-center w-auto h-auto rounded-lg overflow-hidden relative group touch-none" // Agregamos touch-none
    >
      <img
        src={image || "/default-wine.jpg"}
        alt={name || "Vino desconocido"}
        className={`w-full md:w-auto h-auto max-h-[400px] object-contain rounded-lg transition-opacity duration-300 ease-in-out ${
          isZooming ? "opacity-0" : "opacity-100"
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: "zoom-in" }}
      />
      <div style={zoomStyle} className="zoom-overlay" />
    </figure>
  )
}
