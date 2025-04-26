import { Routes, Route } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import MainPage from '@pages/MainPage'
import LoginPage from '@pages/LoginPage'
import RegistrationPage from '@pages/RegistrationPage'
import CertificationsPage from '@pages/CertificationsPage'
import { ThemeProvider } from '@contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
