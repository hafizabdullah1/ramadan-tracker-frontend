import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import RamadanCalendar from './components/RamadanCalendar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from './components/routes/ProtectedRoutes'
import PublicRoutes from './components/routes/PublicRoutes'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
        </Route>
      </Routes>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
