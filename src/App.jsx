import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Header } from "/src/components/atoms/Header"
import { Footer } from "/src/components/atoms/Footer"
import { HomePage } from "/src/pages/Home"
import { LoginPage } from "/src/pages/Login"
import { RegisterPage } from "/src/pages/Register"
import { VinosPage } from "/src/pages/Vinos"
import { RegionesPage } from "/src/pages/Regiones"
import { NoticiasPage } from "/src/pages/Noticias"

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/wines' element={<VinosPage />} />
          <Route path='/wineries' element={<RegionesPage />} />
          <Route path='/news' element={<NoticiasPage />} />
          <Route path='*' element={<h2>Add here the not-found page</h2>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
