/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

/************************************************** Internal components ***************************************************/
import { FormContainer, Button } from "/src/components/atoms/Form"

// Create a Logger instance with "ContactPage" as the identifier for logging events from this page.
const logger = new Logger("ContactPage")

/**************************************************************************************************
 * ContactPage Component:
 * This component renders the Contact page for the WineApp application.
 * It logs the page load event and provides a contact form that uses react-hook-form for validation.
 * On form submission, it logs and displays notifications based on the outcome.
 **************************************************************************************************/
export const ContactPage = () => {
  /****************************** Log Page Load ******************************/
  /*
   * useEffect is used here to log an informational message when the component is mounted.
   * Since the dependency array is empty, this effect runs only once.
   */
  useEffect(() => {
    logger.info("Página de contacto cargada correctamente.")
  }, [])

  /****************************** Initialize Form ******************************/
  /*
   * The useForm hook from react-hook-form manages form state and validation.
   * It provides:
   *   - register: to register input fields.
   *   - handleSubmit: to handle form submission.
   *   - errors: to track validation errors.
   *   - setError: to manually set errors on inputs if needed.
   */
  const { register, handleSubmit, formState: { errors }, setError } = useForm()

  /****************************** Form Submission Handler ******************************/
  /*
   * onSubmit is called when the form is submitted.
   * It checks for validation errors:
   *   - If errors exist, it logs a warning and shows a warning notification.
   *   - If no errors, it logs the submitted data and shows a success notification.
   */
  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) {
      logger.warn("Intento de envío con errores:", errors)
      notify.warning("Intento de envío con errores:", errors)
      return
    }
    logger.info("Formulario de contacto enviado con:", data)
    notify.success("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.")
  }

  /****************************** Render Contact Page Content ******************************/
  /*
   * The return statement renders the JSX for the ContactPage.
   * It includes:
   *   - A title and description.
   *   - A contact form with fields for name, email, and message.
   *   - Display of validation errors for each field.
   *   - A section with additional contact information and social media links.
   */
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center text-[#9f2042]">Contáctanos</h2>
      {/* Page Description */}
      <p className="text-center text-gray-700 mt-2">
        ¿Tienes alguna duda o sugerencia? Envíanos un mensaje y te responderemos lo antes posible.
      </p>

      {/* Contact Form */}
      <FormContainer onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Name Field */}
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            {...register("name", { required: "Este campo es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Tu nombre"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-medium">Correo Electrónico</label>
          <input
            type="email"
            {...register("email", { required: "Correo requerido", pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" } })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label className="block font-medium">Mensaje</label>
          <textarea
            {...register("message", { required: "Por favor escribe tu mensaje" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Escribe tu mensaje aquí..."
            rows="4"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="moderado" className="w-full">Enviar Mensaje</Button>
      </FormContainer>

      {/* Additional Contact Information */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-[#9f2042]">Información de Contacto</h3>
        <p className="text-gray-600 mt-2">📍 Dirección: Calle del Vino, 123, Barcelona, España</p>
        <p className="text-gray-600">
          📧 Email: <a href="mailto:contacto@wineapp.com" className="text-[#9f2042] hover:underline">contacto@wineapp.com</a>
        </p>
        <p className="text-gray-600">📞 Teléfono: +34 600 123 456</p>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://www.instagram.com/thekeyofwineok" target="_blank" rel="noopener noreferrer" className="hover:underline">📷 Instagram</a>
          <a href="https://twitter.com/wineapp" target="_blank" rel="noopener noreferrer" className="hover:underline">🐦 Twitter</a>
        </div>
      </div>
    </section>
  )
}
