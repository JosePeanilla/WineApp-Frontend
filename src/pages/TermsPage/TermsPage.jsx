/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React from "react"

const logger = new Logger("TermsPage")

export const TermsPage = () => {
  logger.info("Página 'Términos y Condiciones' cargada correctamente.")

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-[#9f2042]">Términos y Condiciones</h1>

      <p className="mt-4 text-gray-700 text-lg">
        Bienvenido a <span className="font-semibold">WineApp</span>. Antes de utilizar nuestros servicios, por favor
        revisa nuestros términos y condiciones cuidadosamente.
      </p>

      <div className="mt-6 text-left max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#7b0d1e]">1. Aceptación de Términos</h2>
        <p className="text-gray-600 mt-2">
          Al acceder y utilizar nuestra plataforma, aceptas cumplir con estos términos. Si no estás de acuerdo, por
          favor no utilices nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold text-[#7b0d1e] mt-4">2. Uso de la Plataforma</h2>
        <p className="text-gray-600 mt-2">
          Nuestra plataforma está diseñada para conectar amantes del vino con bodegas y experiencias únicas.
        </p>

        <h2 className="text-2xl font-semibold text-[#7b0d1e] mt-4">3. Privacidad y Seguridad</h2>
        <p className="text-gray-600 mt-2">
          Protegemos tu privacidad y datos personales según nuestra{" "}
          <a href="/privacy" className="text-[#9f2042] hover:underline">
            Política de Privacidad
          </a>.
        </p>

        <h2 className="text-2xl font-semibold text-[#7b0d1e] mt-4">4. Modificaciones</h2>
        <p className="text-gray-600 mt-2">
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones serán
          publicadas en esta página.
        </p>

        <h2 className="text-2xl font-semibold text-[#7b0d1e] mt-4">5. Contacto</h2>
        <p className="text-gray-600 mt-2">
          Si tienes dudas sobre estos términos, contáctanos en{" "}
          <a href="mailto:contacto@wineapp.com" className="text-[#9f2042] hover:underline">
            contacto@wineapp.com
          </a>.
        </p>
      </div>
    </div>
  )
}
