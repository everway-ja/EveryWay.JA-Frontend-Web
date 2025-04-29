/**
 * App.jsx
 * 
 * The root component of the EveryWay.JA Frontend Web application.
 * 
 * This component sets up the application routing structure using React Router,
 * and wraps the entire application with the ThemeProvider to enable dark/light
 * mode functionality across all pages.
 * 
 * The routing structure follows a nested pattern with:
 * - MainLayout as the parent layout component that provides the common structure
 * - Individual page components rendered within the MainLayout
 * 
 * @module App
 */
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import MainPage from '@pages/MainPage'
import LoginPage from '@pages/LoginPage'
import RegistrationPage from '@pages/RegistrationPage'
import CertificationsPage from '@pages/CertificationsPage'
import PartnersPage from '@pages/PartnersPage'
import FeedbackPage from '@pages/FeedbackPage'
import AboutUsPage from '@pages/AboutUsPage'
import { ThemeProvider } from '@contexts/ThemeContext'

/**
 * Main application component that defines the routing structure
 * and provides theme context to all child components.
 * 
 * @returns {JSX.Element} The rendered application
 */
function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/certifications" element={<CertificationsPage />} />
                    <Route path="/partners" element={<PartnersPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    {/* Add more routes here as needed */}
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
