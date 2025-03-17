import React from "react"

export const AgeConfirmationModal = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#3d1308] text-[#f8e5ee] p-6 rounded-xl shadow-xl max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042] text-center">
          Verificación de Edad
        </h2>
        <p className="mb-6 text-[#f8e5ee] text-center">
          ¿Eres mayor de 18 años?
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => onConfirm(true)}
            className="bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-lg transition-all shadow-lg"
          >
            Sí, soy mayor
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="bg-[#DC2626] hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg"
          >
            No, no soy mayor
          </button>
        </div>
      </div>
    </div>
  )
}
