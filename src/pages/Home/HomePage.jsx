/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

export const HomePage = () => {
  const logger = new Logger("HomePage")

  useEffect(() => {
    logger.info("HomePage cargada correctamente.")
  }, [logger])

  return (
    <div className="hero bg-white min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-wineapp-muyfuerte">Bienvenidos</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <NavLink className="btn bg-wineapp-ligero text-white" to="/register">Registrarse</NavLink>
        </div>
      </div>
    </div>
  )
}
