import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect, useState } from "react"
import { notify } from "/src/utils/notifications"
import logo from '/src/assets/logo.svg'

const logger = new Logger("AgeConfirmationModal")

export const AgeConfirmationModal = ({ onConfirm }) => {
  // Estados para los campos de día, mes y año
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    logger.info("Modal de verificación de edad mostrado")
  }, [])

  const handleAccept = () => {
    // Validar que no queden campos vacíos
    if (!day || !month || !year) {
      notify.error("Por favor, completa todos los campos.")
      return
    }

    // Construir la fecha (recordar: en JavaScript enero es 0)
    const birthDate = new Date(year, month - 1, day)
    const hoy = new Date()

    // Calcular la edad
    let edad = hoy.getFullYear() - birthDate.getFullYear()
    const mes = hoy.getMonth() - birthDate.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < birthDate.getDate())) {
      edad--
    }

    const isAdult = edad >= 18
    logger.info(`Usuario ingresó ${day}/${month}/${year}. Edad calculada: ${edad}`)

    // Guardar el resultado en sessionStorage y llamar a onConfirm
    sessionStorage.setItem("isAdult", isAdult ? "true" : "false")

    if (!isAdult) {
      notify.warning("Debes tener al menos 18 años para continuar.")
    } else {
      notify.success("Edad verificada correctamente.")
    }

    onConfirm(isAdult)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#3d1308] text-[#f8e5ee] p-6 rounded-xl shadow-xl mx-auto">
      <div className="flex justify-center mb-4">
          <img 
            src={logo} 
            alt="Logo WineApp" 
            className="w-[600px] h-auto" 
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042] text-center">
          ¡Bienvenido a WineApp!
        </h2>
        <p className="mb-4 text-center text-sm ">
        Para usar la aplicación debes de ser mayor de 18 años.
      </p>
        <p className="mb-6 text-[#f8e5ee] text-center">
          Inserta tu fecha de nacimiento:
        </p>

        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Día"
              className="w-16 p-2 text-black text-center rounded"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mes"
              className="w-16 p-2 text-black text-center rounded"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="number"
              placeholder="Año"
              className="w-20 p-2 text-black text-center rounded"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <button
            onClick={handleAccept}
            className="bg-[#7b0d1e] hover:bg-[#9f2042] text-white px-6 py-3 rounded-lg transition-all shadow-lg min-w-[140px]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
