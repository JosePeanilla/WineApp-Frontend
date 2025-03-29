/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import React, { useEffect, useState } from "react"
import { notify } from "/src/utils/notifications"
import logo from '/src/assets/logo.svg'

/**************************************************************************************************
 * AgeConfirmationModal:
 * Modal component that prompts the user to enter their birth date.
 * - Calculates age from day/month/year inputs
 * - Stores result in sessionStorage
 * - Prevents access if under 18
 * - Logs and notifies user actions
 **************************************************************************************************/
export const AgeConfirmationModal = ({ onConfirm }) => {
  const logger = new Logger("AgeConfirmationModal")

  // Day, month, and year state variables
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  /*************************************** Log modal mount ***************************************/
  useEffect(() => {
    logger.info("Age confirmation modal displayed")
  }, [])

  /*************************************** Accept Handler ***************************************/
  const handleAccept = () => {
    // Ensure all fields are filled
    if (!day || !month || !year) {
      notify.error("Por favor, completa todos los campos.")
      return
    }

    // Parse date from input
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    const isAdult = age >= 18
    logger.info(`User entered ${day}/${month}/${year}. Calculated age: ${age}`)

    // Store result in sessionStorage
    sessionStorage.setItem("isAdult", isAdult ? "true" : "false")

    // Show appropriate message
    if (!isAdult) {
      notify.warning("Debes tener al menos 18 años para continuar.")
    } else {
      notify.success("Edad verificada correctamente.")
    }

    // Trigger parent confirmation logic
    onConfirm(isAdult)
  }

  /*************************************** Modal UI ***************************************/
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#3d1308] text-[#f8e5ee] p-6 rounded-xl shadow-xl mx-auto">
        {/* App Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={logo} 
            alt="Logo WineApp" 
            className="w-[600px] h-auto" 
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042] text-center">
          ¡Bienvenido a WineApp!
        </h2>
        <p className="mb-4 text-center text-sm">
          Para usar la aplicación debes de ser mayor de 18 años.
        </p>
        <p className="mb-6 text-center">
          Inserta tu fecha de nacimiento:
        </p>

        {/* Date Inputs */}
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

          {/* Submit Button */}
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
