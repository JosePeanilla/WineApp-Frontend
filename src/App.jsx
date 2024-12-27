import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"

export const App = () => {
  return (
    <BrowserRouter>
      <h1>Add here the application header</h1>
      <main>
        <Routes>
          <Route path="/" element={<h2>Add here the home page</h2>} />
          <Route path="*" element={<h2>Add here the not-found page</h2>} />
        </Routes>
      </main>
      <h1>Add here the application footer</h1>
    </BrowserRouter>
  )
}
