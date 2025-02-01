import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "/src/App.jsx"
import { AuthProvider } from "/src/context/AuthContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
