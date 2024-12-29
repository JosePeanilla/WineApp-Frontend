import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Header } from "./components/atoms/Header"

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<h2>Add here the home page</h2>} />
          <Route path='*' element={<h2>Add here the not-found page</h2>} />
        </Routes>
      </main>
      <h1>Add here the application footer</h1>
    </BrowserRouter>
  )
}
