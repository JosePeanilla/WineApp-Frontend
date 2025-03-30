/************************************************** External Dependencies **************************************************/
import { Link } from "react-router-dom"

/**************************************************************************************************
 * NotFoundPage Component:
 * Custom 404 error page shown when the user navigates to a route that doesn't exist.
 * It includes:
 * - A wine glass SVG icon for visual context
 * - A bold "404" title
 * - A friendly, thematic error message in Spanish
 * - A button that redirects the user back to the homepage
 **************************************************************************************************/
export const NotFoundPage = () => {
  /****************************** Render NotFoundPage ******************************/
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200 px-4 text-center">
      {/* Wine glass SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 text-[#8B0000] mb-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7 2v2h10V2H7zm10.97 5H6.03a7 7 0 0011.94 0zM4.19 5A9 9 0 0011 21v1H9v2h6v-2h-2v-1a9 9 0 006.81-16z" />
      </svg>

      {/* 404 Error Code */}
      <h1 className="text-6xl font-extrabold text-[#8B0000] mb-2">404</h1>

      {/* Error Description in Spanish */}
      <p className="text-xl text-gray-800 mb-6">
        Vaya... esta copa está vacía. No encontramos lo que buscás.
      </p>

      {/* Navigation Button to Homepage */}
      <Link
        to="/"
        className="bg-[#8B0000] text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-[#a11e1e] transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
