/**************************************************************************************************
 * React Application Main Entry Point:
 * This file sets up client-side routing, theming, age verification modal,
 * and toast notifications for the Wine App. It utilizes React, React Router,
 * and various custom components to build the main layout and functionality.
 **************************************************************************************************/

/*********************************** Import Modules and Styles ***********************************/
/* Notification utility to display warning messages */
import { notify } from "/src/utils/notifications"
/* Global CSS for styling the application */
import "./App.css"

/* React Router modules for navigation, routing, and location tracking */
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom"

/* React core hooks for managing state, side effects, and context */
import { useEffect, useContext, useState } from "react"
/* Authentication context to get the current user session information */
import { AuthContext } from "/src/context/AuthContext"

/* Custom modal component for age verification */
import { AgeConfirmationModal } from "/src/components/modals"
/* Reusable UI components for header and footer sections */
import { Header } from "/src/components/atoms/Header"
import { Footer } from "/src/components/atoms/Footer"
/* Component to handle real-time notifications using WebSockets */
import { SocketNotifications } from "./components/molecules/Socket/SocketNotification"

/* Importing page components for each defined route */
import { HomePage } from "/src/pages/Home"
import { LoginPage } from "/src/pages/Login"
import { RegisterPage } from "/src/pages/Register"
import { EmailVerificationPage } from "/src/pages/EmailVerification"
import { WinesPage } from "/src/pages/Wines"
import { WinePage } from "/src/pages/Wine"
import { RegionsPage } from "/src/pages/Regions"
import { RegionPage } from "/src/pages/Region"
import { NewsPage } from "/src/pages/News"
import { ConsumerProfilePage, WineryProfilePage } from "/src/pages/Profile"
import { WinesManagementPage } from "/src/pages/WinesManagement"
import { AboutPage } from "/src/pages/AboutPage"
import { ContactPage } from "/src/pages/Contact"
import { TermsPage } from "/src/pages/TermsPage"
import { AccessDeniedPage } from "/src/pages/AccessDenied"
import { NotFoundPage } from "/src/pages/NotFound"

/* ToastContainer for displaying transient notifications across the app */
import { ToastContainer } from "react-toastify"
/* Import default styles for Toast notifications */
import "react-toastify/dist/ReactToastify.css"

/*********************************** AppContent Component ***********************************/
/* This component defines the overall structure and behavior of the application */
export const AppContent = () => {
  /************************ Retrieve User Context and Routing Hooks ************************/
  // Get the current user from AuthContext to determine login state and role
  const { user } = useContext(AuthContext)
  // Hook to programmatically navigate between routes
  const navigate = useNavigate()
  // Hook to access current URL details for conditional rendering
  const location = useLocation()

  /*************************** Initialize Age Verification State ***************************/
  /* 
   * The application requires age verification:
   * - The state "showAgeModal" is initialized by checking sessionStorage.
   * - If the "isAdult" flag is not set to "true", the modal will be shown.
   */
  const [showAgeModal, setShowAgeModal] = useState(() => {
    return sessionStorage.getItem("isAdult") !== "true"
  })

  /**************************** Define Age Confirmation Handler ****************************/
  /*
   * This function handles the outcome of the age verification modal:
   * - It stores the user's response (adult or not) in sessionStorage.
   * - Hides the modal.
   * - If the user is not an adult, it displays a warning and redirects to an access denied page.
   */
  const handleAgeConfirm = (isAdult) => {
    sessionStorage.setItem("isAdult", isAdult ? "true" : "false")
    setShowAgeModal(false)
    if (!isAdult) {
      notify.warning("Debes ser mayor de 18 años para acceder a la aplicación.")
      navigate("/access-denied")
    }
  }

  /************************ Apply Application Theme on Component Mount ************************/
  /* 
   * Using the useEffect hook to set a custom theme for the application.
   * This is done by setting a "data-theme" attribute on the document's root element.
   */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "WineAppTheme")
  }, [])

  /*********************** Determine if the Current Route is Access Denied ***********************/
  /*
   * This check is used to conditionally render components like the Header and Footer.
   * If the current path is "/access-denied", these components are omitted.
   */
  const isAccessDeniedPage = location.pathname === "/access-denied"

  /*************************************** Render Application Layout ***************************************/
  return (
    <>
      {/*
        * Age Verification Modal:
        * Shown only when there is no logged-in user and the user hasn't confirmed their age.
        */}
      {!user && showAgeModal && (
        <AgeConfirmationModal onConfirm={handleAgeConfirm} />
      )}

      {/*
        * Socket Notifications:
        * If a user is logged in and has the "wineries" role, real-time notifications are enabled.
        */}
      {user && user.role === "wineries" && <SocketNotifications user={user} />}

      {/*
        * Main Layout:
        * Contains the Header, main content area with routes, and Footer.
        * The Header and Footer are not rendered on the access denied page.
        */}
      <div className="flex flex-col min-h-screen">
        {!isAccessDeniedPage && <Header />}
        <main className="flex-grow mb-20">
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />
            {/* User authentication routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/email-verified" element={<EmailVerificationPage />} />
            {/* Wine-related routes */}
            <Route path="/wines" element={<WinesPage />} />
            <Route path="/wines/:id" element={<WinePage />} />
            {/* Region-related routes */}
            <Route path="/regions" element={<RegionsPage />} />
            <Route path="/regions/:id" element={<RegionPage />} />
            {/* News page route */}
            <Route path="/news" element={<NewsPage />} />
            {/* Profile pages for consumers and wineries */}
            <Route path="/profile/consumer" element={<ConsumerProfilePage />} />
            <Route path="/profile/winery" element={<WineryProfilePage />} />
            {/* Route for managing wines (likely for wineries) */}
            <Route path="/wines/manage" element={<WinesManagementPage />} />
            {/* Informational pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* Access Denied page for users failing age verification or lacking permissions */}
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            {/* Fallback route: displays a not-found message for undefined paths */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {!isAccessDeniedPage && <Footer />}
      </div>

      {/* ****************************** Global Toast Notification Container ****************************** */}
      {/*
        * ToastContainer is used to display transient notifications (e.g., warnings, info)
        * across the application. Its settings determine the display position, auto-close delay,
        * and appearance.
        */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

/*********************************** App Component: Router Wrapper ***********************************/
/*
 * The App component wraps AppContent with BrowserRouter to enable routing functionality.
 * This allows the application to use the HTML5 history API for cleaner URLs and navigation.
 */
export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
