import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Header } from "/src/components/atoms/Header"
import { HomePage } from "/src/pages/Home"
import { RegisterPage } from "/src/pages/Register"
import { LoginPage } from "/src/pages/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='*' element={<h2>Add here the not-found page</h2>} />
        </Routes>
      </main>
      <h1>Add here the application footer</h1>
    </BrowserRouter>
  )
}
