import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect } from "react"

import { Header } from "/src/components/atoms/Header"
import { Footer } from "/src/components/atoms/Footer"
import { HomePage } from "/src/pages/Home"
import { LoginPage } from "/src/pages/Login"
import { RegisterPage } from "/src/pages/Register"
import { WinesPage } from "/src/pages/Wines"
import { WinePage } from "/src/pages/Wine"
import { RegionsPage } from "/src/pages/Regions"
import { NewsPage } from "/src/pages/News"
import { ConsumerProfilePage, WineryProfilePage } from "/src/pages/Profile"
import { WinesManagementPage } from "/src/pages/WinesManagement"
import { AboutPage } from "/src/pages/AboutPage"
import { ContactPage } from "/src/pages/Contact"
import { TermsPage } from "/src/pages/TermsPage"

export const App = () => {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "WineAppTheme")
  }, [])

return (

    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/wines' element={<WinesPage />} />
          <Route path='/wines/:id' element={<WinePage />} />
          <Route path='/regions' element={<RegionsPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/profile/consumer' element={<ConsumerProfilePage />} />
          <Route path='/profile/winery' element={<WineryProfilePage />} />
          <Route path='/wines/manage' element={<WinesManagementPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path='*' element={<h2>Add here the not-found page</h2>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
